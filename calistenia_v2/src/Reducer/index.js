import { combineReducers } from 'redux';

import Usuario from '../Pages/Usuario';
import RolesPermisosReducer from '../SSRolesPermisos/Reducer'
const reducers = combineReducers({
    ...Usuario.Reducers,
    ...RolesPermisosReducer
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