//Icons
import {IoNewspaperSharp} from 'react-icons/io5'
import {AiFillCar, AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {MdBadge} from 'react-icons/md'
import {FaUser} from 'react-icons/fa'
//Types
import {ModalInput} from '@/types/modalTypes'
const tables  = [{
    name: 'infracciones',
    path: '/api/infraccion',
    icon: <IoNewspaperSharp color='#ffffff' size={20}/>,
    selected: true,
    inputs: [
      {
        name: 'fecha_infraccion',
        type: 'date',
        required: true
      },
      {
        name: 'accionada_por',
        type: 'string',
        required: true
      },
      {
        name: 'descripcion',
        type: 'string',
        required: true
      },
      {
        name: 'valor',
        type: 'number',
        required: true
      },
      {
        name: 'vehiculo_id ',
        type: 'select',
        required: true,
        data: {
          path: '/api/vehiculo',
          label: 'id',
          value: 'id'
        },
        options: []
      }
    ]
  },
  {
    name: 'vehiculos',
    path: '/api/vehiculo',
    icon: <AiFillCar color='#ffffff' size={20}/>,
    selected: false,
    inputs: [
      {
        name: 'tipo',
        type: 'select',
        required: true,
        options: [
          {
            label: 'automovil',
            value: 'automovil'
          },
          {
            label: 'moto',
            value: 'moto'
          },
          {
            label: 'carro pesado',
            value: 'carro pesado'
          }
        ]
      },
      {
        name: 'matricula_id',
        type: 'select',
        required: true,
        data: {
          path: '/api/matricula',
          label: 'id',
          value: 'numero'
        },
        options: []
      }
    ]
  },
  {
    name: 'matriculas',
    path: '/api/matricula',
    icon: <MdBadge color='#ffffff' size={20}/>,
    selected: false,
    inputs: [
      {
        name: "placa",
        type: "string",
        required: true
      },
      {
        name: "marca",
        type: "string",
        required: true
      },
      {
        name: "fecha_matricula",
        type: "date",
        required: true
      },
      {
        name: "propietario_id",
        type: "select",
        required: true,
        data: {
          path: '/api/propietario',
          label: 'id',
          value: 'id'
        },
        options: []
      }
    ]

  },
  {
    name: 'propietarios',
    path: '/api/propietario',
    icon: <FaUser color='#ffffff' size={20}/>,
    selected: false,
    inputs: [
      {
        name: "nombre",
        type: "string",
        required: true
      },
      {
        name: "direccion",
        type: "string",
        required: true
      },
      {
        name: "tipo",
        type: "select",
        required: true,
        options: [
          {
            label: 'persona',
            value: 'persona'
          },
          {
            label: 'empresa',
            value: 'empresa'
          }
        
        ]
      }
    ]
  }
]

export default tables