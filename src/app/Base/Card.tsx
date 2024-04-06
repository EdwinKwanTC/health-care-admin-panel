type Props = {
    title?: string
    children?: React.ReactNode
}

const Card = ({ title, children }: Props) => {
    return (
        <div className="m-2 w-80 border-gray-300 rounded-lg border">
            <div className="bg-gray-200 h-10 p-2 flex items-center rounded-t-lg">
                {title}
            </div>
            {children}
        </div>
    )
}

export default Card
