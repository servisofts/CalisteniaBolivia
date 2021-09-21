import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import BancoPage from "./Pages/BancoPage"
import BancoRegistroPage from './Pages/BancoRegistroPage/index';
import CuentaBancoRegistroPage from './Pages/CuentaBancoRegistroPage/index';
import CuentaMovimientosPage from "./Pages/CuentaMovimientosPage";
import CuentaBancoMovimientoRegistroPage from "./Pages/CuentaBancoMovimientoRegistroPage";
const Pages: SPageListProps = {
    BancoPage,
    BancoRegistroPage,
    CuentaBancoRegistroPage,
    CuentaMovimientosPage,
    CuentaBancoMovimientoRegistroPage
}

import bancoReducer from './Reducer/bancoReducer'
import cuentaBancoReducer from './Reducer/cuentaBancoReducer'
import cuentaBancoMovimientoReducer from './Reducer/cuentaBancoMovimientoReducer'
const Reducers = {
    bancoReducer,
    cuentaBancoReducer,
    cuentaBancoMovimientoReducer
}


export default {
    Pages,
    Actions,
    Reducers
};