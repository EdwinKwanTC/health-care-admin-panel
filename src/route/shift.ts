import axios from 'axios'

export type Shift = {
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
