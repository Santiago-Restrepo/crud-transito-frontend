//Icons
import {IoNewspaperSharp} from 'react-icons/io5'
import {AiFillCar, AiFillDelete, AiFillEdit} from 'react-icons/ai'
import {MdBadge} from 'react-icons/md'
import {FaUser} from 'react-icons/fa'
//Types
import {Table, TableNames} from '@/types/tableTypes'

const tables: Table[] = [{
    name: TableNames.infracciones,
    path: '/api/infraccion',
    icon: <IoNewspaperSharp color='#ffffff' size={20}/>,
    selected: true,
    inputs: [
      {
        name: 'fecha_infraccion',
        label: 'Fecha de infracción',
        value: new Date().toISOString().split('T')[0],
        type: 'date',
        required: true
      },
      {
        name: 'accionada_por',
        label: 'Accionada por',
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
        label: 'Descripción',
        value: '',
        type: 'string',
        required: true
      },
      {
        name: 'valor',
        label: 'Valor',
        value: 0,
        type: 'number',
        required: true
      },
      {
        name: 'vehiculo_id',
        label: 'Vehículo',
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
    name: TableNames.vehiculos,
    path: '/api/vehiculo',
    icon: <AiFillCar color='#ffffff' size={20}/>,
    selected: false,
    inputs: [
      {
        name: 'tipo',
        label: 'Tipo',
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
        label: 'Matrícula',
        value: '',
        type: 'select',
        required: true,
        data: {
          path: '/api/matricula',
          label: 'placa',
          value: 'id'
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
    name: TableNames.matriculas,
    path: '/api/matricula',
    icon: <MdBadge color='#ffffff' size={20}/>,
    selected: false,
    inputs: [
      {
        name: "placa",
        label: "Placa",
        value: '',
        type: "string",
        required: true
      },
      {
        name: "marca",
        label: "Marca",
        value: '',
        type: "string",
        required: true
      },
      {
        name: "fecha_matricula",
        label: "Fecha de matrícula",
        value: new Date().toISOString().split('T')[0],
        type: "date",
        required: true
      },
      {
        name: "propietario_id",
        label: "Propietario",
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
    name: TableNames.propietarios,
    path: '/api/propietario',
    icon: <FaUser color='#ffffff' size={20}/>,
    selected: false,
    inputs: [
      {
        name: "nombre",
        label: "Nombre",
        value: '',
        type: "string",
        required: true
      },
      {
        name: "direccion",
        label: "Dirección",
        value: '',
        type: "string",
        required: true
      },
      {
        name: "tipo",
        label: "Tipo",
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