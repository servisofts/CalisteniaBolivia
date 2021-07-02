import { combineReducers } from 'redux';
import socketReducer from './socketReducer';
import usuarioReducer from './usuarioReducer';
import permisoReducer from './permisoReducer';
import permisoPageReducer from './permisoPageReducer';
import rolReducer from './rolReducer';
import imageReducer from './imageReducer';
import rolPermisoReducer from './rolPermisoReducer';
import usuarioRolReducer from './usuarioRolReducer';
import usuarioPageReducer from './usuarioPageReducer';
import cabeceraDatoReducer from './cabeceraDatoReducer';
import fileReducer from './fileReducer';
import fileSeguimiento from './fileSeguimiento';
import oldReducer from './oldReducer';
import moduloReducer from './moduloReducer';
import procesoReducer from './procesoReducer';
import procesoComentarioReducer from './procesoComentarioReducer';
import procesoSeguimientoReducer from './procesoSeguimientoReducer';
import tipoSeguimientoReducer from './tipoSeguimientoReducer';
import tipoUsuarioReducer from './tipoUsuarioReducer';
import clienteReducer from './clienteReducer';
import servicioReducer from './servicioReducer';
import paqueteReducer from './paqueteReducer';
import paqueteServicioReducer from './paqueteServicioReducer';
import paqueteUsuarioReducer from './paqueteUsuarioReducer';

import SSRolesPermisos from '../SSRolesPermisos/Reducer'
export default combineReducers({
    cabeceraDatoReducer,
    socketReducer,
    usuarioReducer,
    permisoReducer,
    permisoPageReducer,
    imageReducer,
    rolReducer,
    rolPermisoReducer,
    usuarioRolReducer,
    usuarioPageReducer,
    fileReducer,
    fileSeguimiento,
    oldReducer,
    moduloReducer,
    procesoReducer,
    procesoComentarioReducer,
    procesoSeguimientoReducer,
    tipoSeguimientoReducer,
    tipoUsuarioReducer,
    clienteReducer,
    servicioReducer,
    paqueteReducer,
    paqueteServicioReducer,
    paqueteUsuarioReducer,
    ...SSRolesPermisos
});