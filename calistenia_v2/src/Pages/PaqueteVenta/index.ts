import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import ClientePaqueteRegistroPage from './Pages/ClientePaqueteRegistroPage'
import ClientePaqueteRegistroConfirmacion from './Pages/ClientePaqueteRegistroConfirmacion'
import EsperandoVenta from './Pages/EsperandoVenta'
const Pages: SPageListProps = {
    ClientePaqueteRegistroPage,
    ClientePaqueteRegistroConfirmacion,
    EsperandoVenta
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