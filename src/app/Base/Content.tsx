import Button from '@/app/Base/Button'

const Content = () => {
    return (
        <div className="text-xs">
            <div className="bg-gray-100 p-1">some date</div>

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
                    <div className="p-1">some time</div>
                    <div className="p-1">some name</div>
                    <div className="p-1">something else</div>
                    <Button buttonType="decline" />
                    <Button buttonType="confirm" />
                </div>
            </div>
        </div>
    )
}

export default Content
