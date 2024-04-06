const confirmStyle =
    'rounded bg-emerald-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600'

const declineStyle =
    'rounded bg-white px-3 text-sm font-semibold text-rose-600 shadow-sm ring-2 ring-inset ring-rose-600 hover:bg-rose-50'

type Props = {
    buttonType?: 'confirm' | 'decline'
    onClick?: () => void
}

import { Button } from '@/components/ui/button'

const BaseButton = ({ buttonType = 'confirm', onClick }: Props) => {
    return (
        <Button
            onClick={onClick}
            className={`m-2 h-8 ${buttonType === 'confirm' ? confirmStyle : declineStyle}`}
        >
            {buttonType === 'confirm' ? 'confirm' : 'decline'}
        </Button>
    )
}

export default BaseButton
