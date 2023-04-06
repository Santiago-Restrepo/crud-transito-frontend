import type {IconType} from 'react-icons'
import React from 'react'
export interface Table {
    name: string,
    path: string,
    icon: React.ReactNode,
    selected: boolean,
    inputs: Input[]
}

export interface Input {
    name: string,
    value: string | number | Date,
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