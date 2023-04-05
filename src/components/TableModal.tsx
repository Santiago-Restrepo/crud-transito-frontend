import React, {useState, useEffect} from 'react'
import {AiFillCloseSquare} from 'react-icons/ai'
//Types
import {ModalInput} from '@/types/modalTypes'

interface TableModalProps {
    data?: any,
    tables: any,
    setTables: (tables: any) => void,
    show: boolean,
    onClose: () => void,
}


export const TableModal = ({
    data,
    tables,
    setTables,
    show,
    onClose,
}: TableModalProps) => {
    const selectedTable = tables.find((table: any) => table.selected);
    const {
        inputs,
    } = selectedTable;
    const [modalData, setModalData] = useState(
        data ? data : inputs.reduce((acc: any, input: any) => {
            acc[input.name] = ''
            return acc 
        }, {} as any)
    );
    const fetchData = async (url: string) => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }
    useEffect(() => {
        const dataInputs = inputs.filter((input: ModalInput) => input.data && input.data.path);
        if(dataInputs.length > 0) {
            const dataPromises = dataInputs.map((input: ModalInput) => {
                return fetchData(`https://crud-transito-backend.vercel.app${input.data?.path}`)
            })
            Promise.all(dataPromises).then((data) => {
                if(data.length > 0) {
                    const newDataInputs = dataInputs.map((input: ModalInput, index: number) => {
                        return {
                            ...input,
                            options: data[index].map((item: any) => {
                                const value = item[input.data?.value || 'id'];
                                const label = item[input.data?.label || 'id'];
                                return {
                                    value,
                                    label
                                }
                            })
                        }
                    })
                    const newInputs = inputs.map((input: ModalInput) => {
                        const newDataInput = newDataInputs.find((newDataInput: ModalInput) => newDataInput.name === input.name)
                        if(newDataInput) {
                            return newDataInput
                        }
                        return input
                    })
                    const newTables = tables.map((table: any) => {
                        if(table.selected) {
                            return {
                                ...table,
                                inputs: newInputs
                            }
                        }
                        return table
                    })
                    console.log(newTables)
                    setTables(newTables)
                }
            })
        }
    }, [inputs])
    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${show ? 'flex' : 'hidden'} justify-center items-center bg-gray-900 bg-opacity-80`}>
            <div className="relative flex flex-col items-center justify-center w-11/12 max-h-screen p-4 text-center bg-slate-800 rounded-xl">
                {
                    selectedTable.inputs.map((input: ModalInput, index: number) => {
                        return (
                            <div key={index} className="flex flex-col items-start justify-center w-full">
                                <label 
                                    className="mb-2 text-left text-md font-semibold text-gray-300 "
                                    htmlFor={input.name}
                                >
                                    {input.name}
                                </label>
                                {
                                    input.type === 'select' ? (
                                        <select
                                        className="w-full p-2 rounded-md bg-slate-200"
                                        name={input.name}
                                        value={modalData[input.name]}
                                        onChange={(e) => setModalData({...modalData, [input.name]: e.target.value})}
                                        >
                                            {
                                                input.options?.map((option, index) => {
                                                    return (
                                                        <option key={index} value={option.value}>{option.label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    ) : 
                                    (
                                        <input
                                            className="w-full p-2 rounded-md bg-slate-200"
                                            type={input.type}
                                            name={input.name}
                                            value={modalData[input.name]}
                                            onChange={(e) => setModalData({...modalData, [input.name]: e.target.value})}
                                        />
                                    )
                                }
                            </div>
                        )
                    })
                }
                <button
                    className='absolute top-0 right-0 bg-slate-900 text-white p-2 rounded-md'
                    onClick={onClose}
                >
                    <AiFillCloseSquare size={20} fillOpacity={1} fill='#ffffff'/>
                </button>
            </div>
        </div>
    )
}
