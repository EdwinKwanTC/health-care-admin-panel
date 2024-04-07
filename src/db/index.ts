import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import dotenv from 'dotenv'
import { shift } from '@/db/schema'

dotenv.config({
    path: '.env.local',
})

const connectionString = process.env.DB_HOST as string
const sql = postgres(connectionString, { max: 1 })
export const db = drizzle(sql, { schema: { shift } })
