import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { shift } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET() {
    const shiftData = await db.query.shift.findMany()
    return NextResponse.json(shiftData)
}

export async function PUT(request: NextRequest) {
    const data = await request.json()

    const updateShift = await db
        .update(shift)
        .set({ status: data.status })
        .where(eq(shift.id, data.id))

    return NextResponse.json(updateShift)
}
