const confirmStyle =
    'rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

const declineStyle =
    'rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'

type Props = {
    buttonType?: 'confirm' | 'decline'
}

const Button = ({ buttonType = 'confirm' }: Props) => {
    return (
        <button
            type="button"
            className={`${buttonType === 'confirm' ? confirmStyle : declineStyle}`}
        >
            Button text
        </button>
    )
}
