import { Shift } from '@/route/shift'
import shiftJSON from '@/app/api/shift/data.json'
import { db } from '@/db'
import { shift } from '@/db/schema'
import { NextResponse } from 'next/server'

export async function GET() {
    const shiftData: Shift[] = JSON.parse(JSON.stringify(shiftJSON))

    await db.delete(shift)

    const findData = db.query.shift.findFirst()

    if (!findData) {
        try {
            for (const item of shiftData) {
                await db.insert(shift).values({
                    ...item,
                    startedAt: new Date(item.startedAt),
                    endedAt: new Date(item.endedAt),
                })
            }
        } catch (e) {
            console.error(e)
        }
    }

    return NextResponse.json({
        data: 'success',
    })
}
