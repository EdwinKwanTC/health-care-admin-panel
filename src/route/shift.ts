import axios from 'axios'

export type Shift = {
    id: number
    startedAt: string
    endedAt: string
    status: 'CONFIRMED' | 'DECLINED' | 'PENDING'
    userId: number
    chiName: string
    lastName: string
    firstName: string
    role: string
}

export const getShift = async (): Promise<Shift[]> => {
    const result = await axios.get('/api/shift')
    return result.data
}

type UpdateShiftParams = {
    id: number
    status: 'CONFIRMED' | 'DECLINED'
}

export const updateShift = async ({
    id,
    status,
}: UpdateShiftParams): Promise<string> => {
    const result = await axios.put('/api/shift', {
        id,
        status,
    })

    return 'success'
}

export const resetShifts = async (): Promise<void> => {
    await axios.get('/api/seed')
}
