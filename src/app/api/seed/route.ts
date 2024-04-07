import { Shift } from '@/router/shift'
import shiftJSON from '@/app/api/shift/data.json'
import { db } from '@/db'
import { shift } from '@/db/schema'
import { NextResponse } from 'next/server'

export async function GET() {
    const shiftData: Shift[] = JSON.parse(JSON.stringify(shiftJSON))

    const seed = async () => {
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

        return 'seed completed'
    }

    const seedData = await db.delete(shift).then(async () => await seed())

    if (seedData) {
        return NextResponse.json({
            status: 200,
            data: 'seeding completed',
        })
    }

    return NextResponse.json({
        status: 200,
        data: 'seeding failed',
    })
}
