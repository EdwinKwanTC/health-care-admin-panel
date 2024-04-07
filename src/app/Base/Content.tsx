import Button from '@/app/Base/Button'
import { Shift } from '@/router/shift'
import dayjs from 'dayjs'
import Checkbox from '@/app/Base/checkbox'

type Props = {
    shift: Shift
    selectCheckBox?: () => void
    confirmShift?: () => void
    declineShift?: () => void
}

const Content = ({
    shift,
    selectCheckBox,
    confirmShift,
    declineShift,
}: Props) => {
    return (
        <div className="text-xs">
            <div className="bg-gray-100 p-1">
                {dayjs(shift.startedAt).format('DD MMMM')}
            </div>

            <div className="flex items-center">
                <div className="p-2">
                    <Checkbox
                        disabled={shift.status !== 'PENDING'}
                        onClick={selectCheckBox}
                        className="data-[state=checked]:bg-green-600"
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
                            <Button
                                buttonType="decline"
                                onClick={declineShift}
                            />
                            <Button
                                buttonType="confirm"
                                onClick={confirmShift}
                            />
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
