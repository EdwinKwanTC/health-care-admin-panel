'use client'

import Input from '@/app/Base/input'
import Card from '@/app/Base/Card'
import Content from '@/app/Base/Content'
import { useQuery } from '@tanstack/react-query'
import { getShift } from '@/route/shift'
import { useMemo } from 'react'
import { sortShiftByMonth } from '@/lib/sortShiftByMonth'

export default function Home() {
    const shiftData = useQuery({
        queryKey: ['shiftData'],
        queryFn: getShift,
    })

    const shiftsByMonths = useMemo(() => {
        if (shiftData.data) {
            return sortShiftByMonth(shiftData.data)
        }
        return null
    }, [shiftData.data])

    const sortingMonth = (someArray: string[]) => {
        return someArray.sort((a, b) => +new Date(b) - +new Date(a))
    }

    const sortedMonth = useMemo(() => {
        if (!shiftsByMonths) return []
        return sortingMonth(Object.keys(shiftsByMonths))
    }, [shiftsByMonths])

    return (
        <div>
            <Input label="Caregiver Name" />
            <div className="flex flex-wrap sm:flex-nowrap">
                {shiftsByMonths &&
                    sortedMonth.map((key, index) => (
                        <Card key={index} title={key}>
                            {shiftsByMonths[key].map((shift, monthKey) => (
                                <Content shift={shift} key={monthKey} />
                            ))}
                        </Card>
                    ))}
            </div>
        </div>
    )
}
