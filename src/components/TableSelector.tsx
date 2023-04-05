import React from 'react'
interface TableSelectorProps {
    title: string
    onClick: () => void
    icon: React.ReactNode,
    selected?: boolean,
}

export const TableSelector = ({
    title,
    onClick,
    icon,
    selected = false,
}: TableSelectorProps) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center w-40 m-4 p-4 ${
                selected ? 'bg-gray-900' : 'bg-gray-800'
            } rounded-lg shadow-md cursor-pointer hover:shadow-lg`}
        >
            <h3 className={`mr-2 text-lg font-semibold ${
                selected ? 'text-gray-200' : 'text-gray-200'
            }`}>{title}</h3>
            {icon}
        </button>
    )
}
