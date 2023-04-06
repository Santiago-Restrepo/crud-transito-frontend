import React, {useState, useEffect,useMemo} from 'react'
import {AiFillCloseSquare} from 'react-icons/ai'
//Types
import {ModalInput} from '@/types/modalTypes'

interface TableModalProps {
    data?: any,
    selectedTable: any,
    setTables: (tables: any) => void,
    show: boolean,
    onClose: () => void,
}


export const TableModal = ({
    data,
    selectedTable,
    show,
    onClose,
}: TableModalProps) => {
    const [inputs, setInputs] = useState([...selectedTable.inputs.map((input: ModalInput) => {
        return {
            ...input,
            value: data ? data[input.name] : ''
        }
    })]);

    const fetchData = async (url: string) => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const newInputs = inputs.map((input: ModalInput, i: number) => {
            if(i === index) {
                return {
                    ...input,
                    value: e.target.value
                }
            }
            return input
        })
        setInputs(newInputs)
    }
    const fetchDataInputs = async (dataInputs: ModalInput[]) => {
        if(dataInputs.length > 0) {
                const dataPromises = dataInputs.map((input: ModalInput) => {
                    return fetchData(`https://crud-transito-backend.vercel.app${input.data?.path}`)
                })
                Promise.all(dataPromises).then((data) => {
                    if(data.length > 0) {
                        const newDataInputs = dataInputs.map((input: ModalInput, index: number) => {
                            return {
                                ...input,
                                options: [
                                    {
                                        value: '',
                                        label: 'Seleccione una opción'
                                    },
                                    ...data[index].map((item: any) => {
                                        const value = item[input.data?.value || 'id'];
                                        const label = item[input.data?.label || 'id'];
                                        return {
                                            value,
                                            label
                                        }
                                    })
                                ]
                            }
                        })
                        const newInputs = selectedTable.inputs.map((input: ModalInput) => {
                            const newDataInput = newDataInputs.find((newDataInput: ModalInput) => newDataInput.name === input.name)
                            if(newDataInput) {
                                return newDataInput
                            }
                            return input
                        })
                        setInputs(newInputs)
                    }
                })
            }
    }
    useEffect(() => {
        const selectedTableInputs = selectedTable.inputs;
        const dataInputs = selectedTableInputs.filter((input: ModalInput) => input.data && input.data.path);
        fetchDataInputs(dataInputs)
        setInputs(selectedTableInputs)
    }, [selectedTable])
    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${show ? 'flex' : 'hidden'} justify-center items-center bg-gray-900 bg-opacity-80`}>
            <div className="relative flex flex-col items-center justify-center w-11/12 max-h-screen p-4 text-center bg-slate-800 rounded-xl">
                {
                    inputs.map((input: ModalInput, index: number) => {
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
                                        value={input.value}
                                        onChange={(e) => handleInputChange(e, index)}
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
                                            value={input.value}
                                            onChange={(e) =>  handleInputChange(e, index)}
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
