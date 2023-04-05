export interface ModalInput {
    name: string,
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