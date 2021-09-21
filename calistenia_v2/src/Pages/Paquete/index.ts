import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import PaquetePage from './Page/PaquetePage'
import Registro from './Page/Registro'
const Pages: SPageListProps = {
    PaquetePage,
    "PaquetePage/registro": Registro,
    "PaquetePage/perfil": Registro,
}


import paqueteReducer from './Reducer/paqueteReducer'
import paqueteServicioReducer from './Reducer/paqueteServicioReducer'
const Reducers = {
    paqueteReducer,
    paqueteServicioReducer
}


export default {
    Pages,
    Actions,
    Reducers
};