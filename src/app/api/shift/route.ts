import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { shift } from '@/db/schema'
import { eq, like, or, sql } from 'drizzle-orm'

export async function GET(request: NextRequest) {
    const search = request.nextUrl.searchParams.get('search')
    console.log('search', search)
    if (search) {
        const shiftData = await db.query.shift.findMany({
            where: or(
                like(shift.firstName, search),
                like(shift.lastName, search),
                like(shift.chiName, search)
            ),
        })

        return NextResponse.json(shiftData)
    }
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
