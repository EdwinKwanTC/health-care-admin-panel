import { Shift } from '@/route/shift'
import dayjs from 'dayjs'

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

type ShiftsByMonth = {
    [key: string]: Shift[]
}

export const sortShiftByMonth = (shift: Shift[]): ShiftsByMonth => {
    const result: ShiftsByMonth = {}
    for (const item of shift) {
        const date = dayjs(item.startedAt)
        const month = months[date.month()]
        const year = date.year()
        if (
            result[`${month} ${year}`] &&
            Array.isArray(result[`${month} ${year}`])
        ) {
            result[`${month} ${year}`].push(item)
        } else {
            result[`${month} ${year}`] = [item]
        }
    }

    for (const item in result) {
        result[item] = result[item].sort((a, b) =>
            dayjs(a.startedAt).isAfter(dayjs(b.startedAt)) ? -1 : 1
        )
    }

    return result
}
