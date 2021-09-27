import { combineReducers } from 'redux';

import Usuario from '../Pages/Usuario';
import RolesPermisosReducer from '../SSRolesPermisos/Reducer'
import Sucursal from '../Pages/Sucursal';
import TipoPago from '../Pages/TipoPago';
import Paquete from '../Pages/Paquete';
import Servicio from '../Pages/Servicio';
import Banco from '../Pages/Banco';
import Caja from '../Pages/Caja';
import PaqueteVenta from '../Pages/PaqueteVenta';
import Entrenamiento from '../Pages/Entrenamiento';
const reducers = combineReducers({
    ...Usuario.Reducers,
    ...RolesPermisosReducer,
    ...Sucursal.Reducers,
    ...TipoPago.Reducers,
    ...Paquete.Reducers,
    ...Servicio.Reducers,
    ...Banco.Reducers,
    ...Caja.Reducers,
    ...PaqueteVenta.Reducers,
    ...Entrenamiento.Pages
});

export default (state, action) => {
    switch (action.type) {
        case 'USUARIO_LOGOUT':
            state = undefined;
            break;
        default:
            break;
    }
    return reducers(state, action);
}