const confirmStyle =
    'rounded bg-emerald-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600'

const confirmDisabledStyle =
    'rounded bg-emerald-100 px-3 text-sm font-semibold text-white shadow-sm text-green-500 disabled:opacity-100'

const declineStyle =
    'rounded bg-white px-3 text-sm font-semibold text-rose-600 shadow-sm ring-2 ring-inset ring-rose-600 hover:bg-rose-50'

const declineDisabledStyle =
    'rounded bg-rose-200 px-3 text-sm font-semibold text-white shadow-sm text-red-600 disabled:opacity-100'

type Props = {
    buttonType?: 'confirm' | 'decline'
    disabled?: boolean
    onClick?: () => void
}

const buttonStyle = (type: 'confirm' | 'decline', disabled: boolean) => {
    if (type === 'confirm') {
        if (disabled) {
            return confirmDisabledStyle
        }
        return confirmStyle
    }

    if (type === 'decline') {
        if (disabled) {
            return declineDisabledStyle
        }
        return declineStyle
    }
}

import { Button } from '@/components/ui/button'

const BaseButton = ({
    buttonType = 'confirm',
    disabled = false,
    onClick,
}: Props) => {
    return (
        <Button
            disabled={disabled}
            onClick={onClick}
            className={`m-2 h-8 ${buttonStyle(buttonType, disabled)}`}
        >
            {buttonType === 'confirm' ? 'confirm' : 'decline'}
        </Button>
    )
}

export default BaseButton
