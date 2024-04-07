'use client'

import Input from '@/app/Base/input'
import Card from '@/app/Base/Card'
import Content from '@/app/Base/Content'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getShift, resetShifts, updateShift } from '@/router/shift'
import { useEffect, useMemo, useState } from 'react'
import { sortShiftByMonth } from '@/lib/sortShiftByMonth'
import Button from '@/app/Base/Button'
import useDebounce from '@/hooks/useDebounce'

export default function Home() {
    const [searchCareGiver, setSearchCareGiver] = useState('')
    const debounceSearch = useDebounce(searchCareGiver, 500)
    const [multiConfirm, setMultiConfirm] = useState<number[]>([])

    useEffect(() => {
        console.log(multiConfirm)
    }, [multiConfirm])

    const handleUpdateMultiConfirm = (value: number) => {
        const tempArray = [...multiConfirm]
        if (tempArray.includes(value)) {
            tempArray.splice(tempArray.indexOf(value), 1)
        } else {
            tempArray.push(value)
        }
        setMultiConfirm(tempArray)
    }

    const shiftData = useQuery({
        queryKey: ['shiftData', debounceSearch],
        queryFn: async () =>
            await getShift({
                search: debounceSearch,
            }),
    })

    const updateShiftMutation = useMutation({
        mutationFn: updateShift,
        onSuccess: () => shiftData.refetch(),
    })

    const resetShiftMutation = useMutation({
        mutationFn: resetShifts,
        onSuccess: () => shiftData.refetch(),
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
            <div className="flex justify-between sticky top-0 bg-white">
                <Input
                    value={searchCareGiver}
                    onChange={(value) => setSearchCareGiver(value)}
                    label="Caregiver Name"
                />
                <Button
                    label="reset"
                    onClick={() => resetShiftMutation.mutate()}
                />
            </div>
            <div className="flex flex-wrap sm:flex-nowrap">
                {shiftsByMonths &&
                    sortedMonth.map((key, index) => (
                        <Card key={index} title={key}>
                            {shiftsByMonths[key].map((shift, monthKey) => (
                                <Content
                                    shift={shift}
                                    key={monthKey}
                                    selectCheckBox={() =>
                                        handleUpdateMultiConfirm(shift.id)
                                    }
                                    confirmShift={() =>
                                        updateShiftMutation.mutate({
                                            id: shift.id,
                                            status: 'CONFIRMED',
                                        })
                                    }
                                    declineShift={() =>
                                        updateShiftMutation.mutate({
                                            id: shift.id,
                                            status: 'DECLINED',
                                        })
                                    }
                                />
                            ))}
                        </Card>
                    ))}
            </div>
        </div>
    )
}
