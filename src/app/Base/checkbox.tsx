import { Checkbox } from '@/components/ui/checkbox'
import { CSSProperties } from 'react'

type Props = {
    checked?: boolean
    onClick?: () => void
    className?: string
}

const BaseCheckbox = ({ checked, onClick, className }: Props) => {
    return (
        <Checkbox
            checked={checked}
            onClick={onClick}
            className={className ? className : ''}
        />
    )
}

export default BaseCheckbox
