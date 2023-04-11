import { SPageListProps } from 'servisofts-component'
import Actions from './Actions'

import ClientePerfilPage from './Page/ClientePerfilPage'
import ClientesPage from './Page/ClientesPage'
import EntrenadorPage from './Page/EntrenadorPage'
import Llamada from './Page/Llamada'
import Login from './Page/Login'
import Perfil from './Page/Perfil'
import RegistroNuevo from './Page/RegistroNuevo'
import UsuarioPage from './Page/UsuarioPage'
import VendedorPage from './Page/VendedorPage'
import { default as VentasPage, default as VentasSelect } from './Page/VentasPage'
const Pages: SPageListProps = {
    login: Login,
    // registro:RegistroCliente,
    registro: RegistroNuevo,
    "perfil": Perfil,
    UsuarioPage,
    ClientesPage,
    VentasPage,
    VentasSelect,
    EntrenadorPage,
    ClientePerfilPage,
    VendedorPage,
    Llamada

}


import usuarioReducer from './Reducer/usuarioReducer'
const Reducers = {
    usuarioReducer,
}


export default {
    Pages,
    Actions,
    Reducers
};