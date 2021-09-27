import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import ClientePaqueteRegistroPage from './Pages/ClientePaqueteRegistroPage'
import ClientePaqueteRegistroConfirmacion from './Pages/ClientePaqueteRegistroConfirmacion'
const Pages: SPageListProps = {
    ClientePaqueteRegistroPage,
    ClientePaqueteRegistroConfirmacion
}

import paqueteVentaReducer from './Reducer/paqueteVentaReducer'
const Reducers = {
    paqueteVentaReducer
}


export default {
    Pages,
    Actions,
    Reducers
};