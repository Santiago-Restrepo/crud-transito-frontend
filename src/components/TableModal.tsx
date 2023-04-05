import React from 'react'
import {AiFillCloseSquare} from 'react-icons/ai'
interface TableModalProps {
    data?: any,
    columns: any,
    show: boolean,
    onClose: () => void,
}


export const TableModal = ({
    data,
    columns,
    show,
    onClose,
}: TableModalProps) => {
    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${show ? 'block' : 'hidden'} bg-gray-900 bg-opacity-80`}>
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
                Table data
                <button
                    className='bg-red-500 text-white p-2 rounded-md'
                    onClick={onClose}
                >
                    <AiFillCloseSquare size={20}/>
                </button>
            </div>
        </div>
    )
}
