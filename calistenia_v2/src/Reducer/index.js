import { combineReducers } from 'redux';

import socketReducer from './socketReducer';


const reducers = combineReducers({
    socketReducer,
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