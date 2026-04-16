import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.join(__dirname, '..', '.env.local')

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return

  const content = fs.readFileSync(filePath, 'utf8')
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#') || !line.includes('=')) continue

    const idx = line.indexOf('=')
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (!process.env[key]) process.env[key] = value
  }
}

loadEnvFile(envPath)

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const email = process.env.ADMIN_EMAIL || 'justjuits@gmail.com'
const password = process.env.ADMIN_PASSWORD || 'Harvey187'
const tenantSlug = process.env.ADMIN_TENANT_SLUG
const role = process.env.ADMIN_ROLE || 'super_admin'
const fullName = process.env.ADMIN_FULL_NAME || 'Admin User'

if (!url || !serviceRoleKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.')
  console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD if you want to override the defaults.')
  process.exit(1)
}

const supabase = createClient(url, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function main() {
  const { data: usersData, error: listError } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  })

  if (listError) throw listError

  const existingUser = usersData.users.find(
    (user) => user.email?.toLowerCase() === email.toLowerCase()
  )

  let userId = existingUser?.id

  if (existingUser) {
    const { data, error } = await supabase.auth.admin.updateUserById(existingUser.id, {
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role,
      },
    })

    if (error) throw error
    userId = data.user.id
    console.log(`Updated existing auth user: ${email}`)
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        role,
      },
    })

    if (error) throw error
    userId = data.user.id
    console.log(`Created auth user: ${email}`)
  }

  const tenantQuery = supabase.from('tenants').select('id, slug').order('created_at', { ascending: true }).limit(1)
  const { data: tenantRows, error: tenantError } = tenantSlug
    ? await supabase.from('tenants').select('id, slug').eq('slug', tenantSlug).limit(1)
    : await tenantQuery

  if (tenantError) throw tenantError
  if (!tenantRows || tenantRows.length === 0) {
    throw new Error(
      tenantSlug
        ? `No tenant found for slug: ${tenantSlug}`
        : 'No tenants found. Create a tenant first, then rerun this script.'
    )
  }

  const tenant = tenantRows[0]

  const { error: profileError } = await supabase.from('user_profiles').upsert(
    {
      id: userId,
      tenant_id: tenant.id,
      email,
      full_name: fullName,
      role,
      is_active: true,
    },
    { onConflict: 'tenant_id,email' }
  )

  if (profileError) throw profileError

  console.log('User profile upserted successfully:')
  console.log(JSON.stringify({ email, userId, role, tenant: tenant.slug }, null, 2))
}

main().catch((error) => {
  console.error('Failed to bootstrap admin user:')
  console.error(error?.message || error)
  process.exit(1)
})
