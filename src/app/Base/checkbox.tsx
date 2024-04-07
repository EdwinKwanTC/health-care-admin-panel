import { Checkbox } from '@/components/ui/checkbox'
import { CSSProperties } from 'react'

type Props = {
    checked?: boolean
    onClick?: () => void
    className?: string
    disabled?: boolean
}

const BaseCheckbox = ({ checked, onClick, className, disabled }: Props) => {
    return (
        <Checkbox
            disabled={disabled}
            checked={checked}
            onClick={onClick}
            className={className ? className : ''}
        />
    )
}

export default BaseCheckbox
