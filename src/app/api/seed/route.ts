import { Shift } from '@/router/shift'
import shiftJSON from '@/app/api/shift/data.json'
import { db } from '@/db'
import { shift } from '@/db/schema'
import { NextResponse } from 'next/server'

export async function GET() {
    const shiftData: Shift[] = JSON.parse(JSON.stringify(shiftJSON))

    await db.delete(shift).then(async () => {
        console.log('seeding data')
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
            throw new Error('Could not insert data')
        }

        return NextResponse.json({
            status: 200,
            data: 'seed success',
        })
    })

    return NextResponse.json({
        status: 200,
        data: 'no seed information',
    })
}
