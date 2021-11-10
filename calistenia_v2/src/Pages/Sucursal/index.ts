import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'
import SucursalTipoPagoCuentaBanco from './SucursalTipoPagoCuentaBanco'

import SucursalPage from './Page/SucursalPage'
import SucursalRegistroPage from './Page/SucursalRegistroPage'
const Pages: SPageListProps = {
    SucursalPage,
    "SucursalPage/registro": SucursalRegistroPage,
    "SucursalPage/perfil": SucursalRegistroPage,
}

import sucursalReducer from './Reducer/sucursalReducer'
import sucursalTipoPagoCuentaBancoReducer from './Reducer/sucursalTipoPagoCuentaBancoReducer'
const Reducers = {
    sucursalReducer,
    sucursalTipoPagoCuentaBancoReducer
}

import SucursalSelect from './Component/SucursalSelect'
const Component = {
    SucursalSelect
}

export default {
    Pages,
    Actions,
    Reducers,
    SucursalTipoPagoCuentaBanco,
    Component
};