import { serial, text, timestamp, pgTable } from 'drizzle-orm/pg-core'
export const user = pgTable('user', {
    id: serial('id'),
    userId: serial('userId'),
    chiName: text('chiName'),
    lastName: text('lastName'),
    firstName: text('firstName'),
    startedAt: timestamp('startedAt'),
    endedAt: timestamp('endedAt'),
    status: text('status').$type<'CONFIRMED' | 'PENDING' | 'DECLINED'>(),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
})
