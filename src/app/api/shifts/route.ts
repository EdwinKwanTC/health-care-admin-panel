import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { shift } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function PUT(request: NextRequest) {
    const data: number[] = await request.json()

    for (const item of data) {
        await db
            .update(shift)
            .set({ status: 'CONFIRMED' })
            .where(eq(shift.id, item))
    }

    return NextResponse.json({
        status: 200,
        message: 'update success',
    })
}
