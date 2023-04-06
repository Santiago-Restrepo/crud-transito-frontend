//Icons
import {IoNewspaperSharp} from 'react-icons/io5'
import {AiFillCar, AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {MdBadge} from 'react-icons/md'
import {FaUser} from 'react-icons/fa'
//Types
import {Table} from '@/types/tableTypes'
const tables: Table[] = [{
    name: 'infracciones',
    path: '/api/infraccion',
    icon: <IoNewspaperSharp color='#ffffff' size={20}/>,
    selected: true,
    inputs: [
      {
        name: 'fecha_infraccion',
        value: new Date().toISOString().split('T')[0],
        type: 'date',
        required: true
      },
      {
        name: 'accionada_por',
        type: 'select',
        value: 'agente de tránsito',
        options: [
          {
            label: 'agente de tránsito',
            value: 'agente de tránsito'
          },
          {
            label: 'cámara de detecciones',
            value: 'cámara de detecciones'
          }
        ],
        required: true
      },
      {
        name: 'descripcion',
        value: '',
        type: 'string',
        required: true
      },
      {
        name: 'valor',
        value: 0,
        type: 'number',
        required: true
      },
      {
        name: 'vehiculo_id ',
        value: '',
        type: 'select',
        required: true,
        data: {
          path: '/api/vehiculo',
          label: 'id',
          value: 'id'
        },
        options: [{
          label: 'Seleccione una opción',
          value: ''
        }]
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
        value: 'automovil',
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
        value: '',
        type: 'select',
        required: true,
        data: {
          path: '/api/matricula',
          label: 'id',
          value: 'placa'
        },
        options: [
          {
            label: 'Seleccione una opción',
            value: ''
          }
        ]
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
        value: '',
        type: "string",
        required: true
      },
      {
        name: "marca",
        value: '',
        type: "string",
        required: true
      },
      {
        name: "fecha_matricula",
        value: new Date().toISOString().split('T')[0],
        type: "date",
        required: true
      },
      {
        name: "propietario_id",
        value: '',
        type: "select",
        required: true,
        data: {
          path: '/api/propietario',
          label: 'id',
          value: 'id'
        },
        options: [{
          label: 'Seleccione una opción',
          value: ''
        }]
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
        value: '',
        type: "string",
        required: true
      },
      {
        name: "direccion",
        value: '',
        type: "string",
        required: true
      },
      {
        name: "tipo",
        value: 'persona',
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