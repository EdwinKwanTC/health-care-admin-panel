import React from 'react'

type Props = {
    type?: 'text'
    value?: string
    onChange?: (value: string) => void
    label?: string
    placeholder?: string
    name?: string
}

export default function Input({
    name,
    label,
    placeholder,
    value,
    type = 'text',
    onChange,
}: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e.target.value)
    }
    return (
        <div className="flex items-center m-2">
            <div className="block p-2 text-sm font-medium leading-6 text-gray-900">
                {label}
            </div>
            <div className="">
                <input
                    type={type}
                    name={name}
                    id={`${name}-input`}
                    className="block w-40 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </div>
    )
}
