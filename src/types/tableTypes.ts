import type {IconType} from 'react-icons'
import React from 'react'
export interface Table {
    name: TableNames,
    path: string,
    icon: React.ReactNode,
    selected: boolean,
    inputs: Input[]
}

export enum TableNames {
    'infracciones' = 'infracciones',
    'vehiculos' = 'vehiculos',
    'matriculas' = 'matriculas',
    'propietarios' = 'propietarios'
}

export interface Input {
    name: string,
    value: string | number | Date,
    label: string,
    type: string,
    required: boolean,
    data?: {
        path: string,
        label: string,
        value: string
    },
    options?: {
        label: string,
        value: string
    }[]
}