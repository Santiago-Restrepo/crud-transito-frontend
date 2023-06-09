import React, {useState, useEffect, useMemo} from 'react'
import {AiFillCloseSquare, AiOutlineLoading3Quarters} from 'react-icons/ai'
//Types
import { schemas } from '@/schemas'
//UseForm and Yup
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
//Toast

//Types
import { Table, Input } from '@/types/tableTypes'
interface TableModalProps {
    data?: any,
    selectedTable: Table,
    setTables: (tables: any) => void,
    refetchTableData: () => void,
    show: boolean,
    toast: any,
    onClose: () => void,
}

export const TableModal = ({
    data,
    selectedTable,
    refetchTableData,
    show,
    toast,
    onClose,
}: TableModalProps) => {
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schemas[selectedTable.name]),
    });
    const [inputs, setInputs] = useState([...selectedTable.inputs.map((input) => {
        return {
            ...input,
            value: data ? data[input.name] : ''
        }
    })]);
    const [loading, setLoading] = useState(false);
    const dataId = useMemo(() => {
        if(data && data.id){
            return data.id
        }
        return null
    }, [data])
    const fetchData = async (url: string) => {
        const res = await fetch(url)
        const data = await res.json()
        return data
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, index: number) => {
        const newInputs = inputs.map((input, i: number) => {
            if(i === index) {
                register(input.name, { value: e.target.value })
                return {
                    ...input,
                    value: e.target.value
                }
            }
            return input
        })
        setInputs(newInputs)
    }
    const fetchDataInputs = async (completeInputs: Input[], dataInputs: Input[]) => {
        if(dataInputs.length > 0) {
            dataInputs.forEach((input) => {
                // console.log(input.options)
                // if(input.options && input.options.length > 1){
                //     return null;
                // }
            })
            const dataPromises = dataInputs.map((input) => {
                return fetchData(`https://crud-transito-backend.vercel.app${input.data?.path}`)
            })
            Promise.all(dataPromises).then((data) => {
                if(data.length > 0) {
                    const newDataInputs = dataInputs.map((input, index: number) => {
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
                    const newInputs = completeInputs.map((input) => {
                        const newDataInput = newDataInputs.find((newDataInput) => newDataInput.name === input.name)
                        if(newDataInput) {
                            return newDataInput
                        }
                        return input
                    })
                    setInputs(newInputs)
                }
            })
        }else{
            setInputs(completeInputs)
        }
    }
    
    const onsubmit = async (submitData: any) => {
        setLoading(true)
        try {
            if(data){
                //Update
                const response = await fetch(`https://crud-transito-backend.vercel.app${selectedTable.path}/${dataId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(submitData)
                })
                const data = await response.json();
                if(data.error) {
                    toast.error(data.message)
                }else{
                    toast.success('Registro actualizado con éxito')
                    refetchTableData()
                    onClose()
                }
                
            }else{
                //Create
                const response = await fetch(`https://crud-transito-backend.vercel.app${selectedTable.path}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(submitData)
                })
                const data = await response.json()

                if(data.error) {
                    toast.error(data.message)
                }else{
                    toast.success('Registro creado con éxito')
                    refetchTableData()
                    onClose()
                }
            }
        } catch (error) {
            console.log(error)
            toast.error('Ha ocurrido un error')
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        const selectedTableInputs = selectedTable.inputs;
        const dataInputs = selectedTableInputs.filter((input) => input.data && input.data.path);
        fetchDataInputs(selectedTableInputs, dataInputs)
        return () => {
            reset();
        }
    }, [selectedTable])
    useEffect(() => {
        if(data) {
            reset();
            const selectedTableInputs = selectedTable.inputs.map((input) => {
                let value = data ? data[input.name] : ''
                if(input.type === 'date' && value) {
                    value = new Date(value).toISOString().split('T')[0]
                }
                register(input.name, { value })
                return {
                    ...input,
                    value
                }
            });
            const dataInputs = selectedTableInputs.filter((input) => input.data && input.data.path);
            fetchDataInputs(selectedTableInputs, dataInputs)
            // setInputs(selectedTableInputs)
        }else{
            reset();
            const selectedTableInputs = selectedTable.inputs.map((input) => {
                let value = data ? data[input.name] : ''
                if(input.type === 'date' && value) {
                    value = new Date(value).toISOString().split('T')[0]
                }
                return {
                    ...input,
                    value
                }
            });
            const dataInputs = selectedTableInputs.filter((input) => input.data && input.data.path);
            fetchDataInputs(selectedTableInputs, dataInputs)
        }
        return () => {
            reset();
        }
    }, [data])
    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${show ? 'flex' : 'hidden'} justify-center items-center bg-gray-900 bg-opacity-80`}>
        <div className="relative flex flex-col items-center justify-center w-11/12 max-h-screen p-4 text-center bg-slate-800 rounded-xl">
            <h1 className="text-2xl font-bold text-white">{selectedTable.name}</h1>
            <form onSubmit={handleSubmit(onsubmit)} className="w-full" id="form">
                {
                    inputs.map((input, index: number) => {
                        return (
                            <div key={index} className="flex flex-col items-start justify-center w-full">
                                <label 
                                    className="mb-2 text-left text-md font-semibold text-gray-300 "
                                    htmlFor={input.name}
                                >
                                    {input.label}
                                </label>
                                {
                                    input.type === 'select' ? (
                                        <select
                                        className="w-full p-2 rounded-md bg-slate-200"
                                        value={input.value}
                                        {...register(input.name)}
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
                                            value={input.value}
                                            {...register(input.name)}
                                            onChange={(e) =>  handleInputChange(e, index)}
                                        />
                                    )
                                }
                                {
                                    errors[input.name] && (
                                        <span className="text-red-500 text-sm">{errors[input.name]?.message as String}</span>
                                    )
                                }
                            </div>
                        )
                    })
                }
                <button
                    className='absolute top-3 right-3 bg-slate-900 text-white p-2 rounded-md'
                    onClick={onClose}
                    type='button'
                >
                    <AiFillCloseSquare size={20} fillOpacity={1} fill='#ffffff'/>
                </button>

                <button
                    className='mt-4 bg-slate-600 font-bold text-white p-2 rounded-md' 
                    type='submit'
                >
                    {
                        loading ? (
                            <AiOutlineLoading3Quarters className="animate-spin" size={20} fillOpacity={1} fill='#ffffff'/>
                        ) : data ? 'Actualizar' : 'Crear'
                    }
                </button>
            </form>
        </div>
    </div>
    )
}
