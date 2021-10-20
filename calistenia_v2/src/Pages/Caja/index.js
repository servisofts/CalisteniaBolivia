import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import CajaPage from "./Page/CajaPage"
import CajaMovimientoRegistroPage from "./Page/CajaMovimientoRegistroPage"
import CajasAbiertas from './Page/CajasAbiertas'
import DetalleCaja from './Page/DetalleCaja'
import CajasPage from './Page/CajasPage'
const Pages: SPageListProps = {
    CajaPage,
    CajaMovimientoRegistroPage,
    CajasAbiertas,
    DetalleCaja,
    CajasPage
}


import cajaReducer from './Reducer/cajaReducer'
import cajaMovimientoReducer from './Reducer/cajaMovimientoReducer'
import cajaTipoMovimientoReducer from './Reducer/cajaTipoMovimientoReducer'
const Reducers = {
    cajaReducer,
    cajaMovimientoReducer,
    cajaTipoMovimientoReducer
}

import CajaMovimiento from './CajaMovimiento'
export default {
    Pages,
    Actions,
    Reducers,
    CajaMovimiento
};