import { SPageListProps } from "servisofts-component";
import Actions from "./Actions";

import ClienteHistorial from "./Page/ClienteHistorial";
import ClientePerfilPage from "./Page/ClientePerfilPage";
import ClientesComparacion from "./Page/ClientesComparacion";
import ClientesCumpleaño from "./Page/ClientesCumpleaño";
import ClientesPage from "./Page/ClientesPage";
import EntrenadorPage from "./Page/EntrenadorPage";
import Login from "./Page/Login";
import Perfil from "./Page/Perfil";
import RegistroNuevo from "./Page/RegistroNuevo";
import UsuarioPage from "./Page/UsuarioPage";
import VendedorPage from "./Page/VendedorPage";
import {
  default as VentasPage,
  default as VentasSelect,
} from "./Page/VentasPage";
const Pages: SPageListProps = {
  login: Login,
  // registro:RegistroCliente,
  registro: RegistroNuevo,
  perfil: Perfil,
  UsuarioPage,
  ClientesPage,
  VentasPage,
  VentasSelect,
  EntrenadorPage,
  ClientePerfilPage,
  VendedorPage,
  "clientes/cumplenos": ClientesCumpleaño,
  "clientes/historial": ClienteHistorial,
  "clientes/comparacion": ClientesComparacion,
};

import usuarioReducer from "./Reducer/usuarioReducer";
const Reducers = {
  usuarioReducer,
};

export default {
  Pages,
  Actions,
  Reducers,
};
