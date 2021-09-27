import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import CajaPage from "./Page/CajaPage"
import CajaMovimientoRegistroPage from "./Page/CajaMovimientoRegistroPage"

const Pages: SPageListProps = {
    CajaPage,
    CajaMovimientoRegistroPage
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