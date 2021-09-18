import { SPageListProps } from 'servisofts-component'

import InicioPage from "./InicioPage";
import CargaPage from './CargaPage/index';
import Presentacion from './Presentacion';

import Usuario from './Usuario';
import SSRolesPermisosPages from '../SSRolesPermisos/Pages';
const Pages: SPageListProps = {
    "inicio": InicioPage,
    "carga": CargaPage,
    "presentacion": Presentacion,
    ...Usuario.Pages,
    ...SSRolesPermisosPages
}
export default Pages;