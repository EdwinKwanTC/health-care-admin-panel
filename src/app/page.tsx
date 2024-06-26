'use client'

import Input from '@/app/Base/input'
import Card from '@/app/Base/Card'
import Content from '@/app/Base/Content'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
    getShift,
    resetShifts,
    updateShift,
    updateShifts,
} from '@/router/shift'
import { useMemo, useState } from 'react'
import { sortShiftByMonth } from '@/lib/sortShiftByMonth'
import Button from '@/app/Base/Button'
import useDebounce from '@/hooks/useDebounce'

export default function Home() {
    const [searchCareGiver, setSearchCareGiver] = useState('')
    const debounceSearch = useDebounce(searchCareGiver, 500)
    const [multiConfirm, setMultiConfirm] = useState<number[]>([])

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

    const multiShiftUpdateMutation = useMutation({
        mutationFn: updateShifts,
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

    if (resetShiftMutation.isPending) {
        return (
            <div className="flex justify-center items-center">
                Resetting Data... Please wait
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between sticky top-0 bg-white">
                <Input
                    value={searchCareGiver}
                    onChange={(value) => setSearchCareGiver(value)}
                    label="Caregiver Name"
                />
                <div>
                    <Button
                        label="multi confirm"
                        onClick={() =>
                            multiShiftUpdateMutation.mutate({
                                ids: multiConfirm,
                            })
                        }
                    />
                    <Button
                        label="reset"
                        buttonType="decline"
                        onClick={() => resetShiftMutation.mutate()}
                    />
                </div>
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
