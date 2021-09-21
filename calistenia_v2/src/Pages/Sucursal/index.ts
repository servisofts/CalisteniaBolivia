import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import SucursalPage from './Page/SucursalPage'
import SucursalRegistroPage from './Page/SucursalRegistroPage'
const Pages: SPageListProps = {
    SucursalPage,
    "SucursalPage/registro": SucursalRegistroPage,
    "SucursalPage/perfil": SucursalRegistroPage,
}

import sucursalReducer from './Reducer/sucursalReducer'
const Reducers = {
    sucursalReducer
}


export default {
    Pages,
    Actions,
    Reducers
};