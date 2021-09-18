import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import Login from './Page/Login'
import RegistroCliente from './Page/RegistroCliente'
import Perfil from './Page/Perfil'
const Pages: SPageListProps = {
    login: Login,
    registro:RegistroCliente,
    "perfil":Perfil,
}


import usuarioReducer from './Reducer/usuarioReducer'
const Reducers = {
    usuarioReducer
}


export default {
    Pages,
    Actions,
    Reducers
};