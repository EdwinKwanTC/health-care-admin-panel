import Button from '@/app/Base/Button'
import { Shift } from '@/route/shift'
import dayjs from 'dayjs'

type Props = {
    shift: Shift
}

const Content = ({ shift }: Props) => {
    return (
        <div className="text-xs">
            <div className="bg-gray-100 p-1">
                {dayjs(shift.startedAt).format('DD MMMM')}
            </div>

            <div className="flex items-center">
                <div className="p-2">
                    <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-green-600"
                    />
                </div>
                <div>
                    <div className="p-1">
                        {dayjs(shift.startedAt).format('hh:mma')}-
                        {dayjs(shift.endedAt).format('hh:mma')}
                    </div>
                    <div className="p-1">
                        {shift.userId} - {shift.lastName} {shift.firstName}{' '}
                        {shift.chiName}
                    </div>
                    <div className="p-1">{shift.role}</div>
                    {shift.status === 'PENDING' && (
                        <>
                            <Button buttonType="decline" />
                            <Button buttonType="confirm" />
                        </>
                    )}
                    {shift.status === 'CONFIRMED' && (
                        <Button buttonType="confirm" disabled />
                    )}

                    {shift.status === 'DECLINED' && (
                        <Button buttonType="decline" disabled />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Content
