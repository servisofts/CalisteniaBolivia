import { SPageListProps } from 'servisofts-component'

import InicioPage from "./InicioPage";
import CargaPage from './CargaPage/index';
import Presentacion from './Presentacion';

import Usuario from './Usuario';
import SSRolesPermisosPages from '../SSRolesPermisos/Pages';
import AjustesPage from './AjustesPage';
import Sucursal from './Sucursal';
import TipoPago from './TipoPago';
import Paquete from './Paquete';
import PaqueteVenta from './PaqueteVenta';
import Servicio from './Servicio';
import Banco from './Banco';
import Caja from './Caja';
import Entrenamiento from './Entrenamiento';
import Asistencia from './Asistencia';
import Finanza from './Finanza';
import DashBoard from './DashBoard';
import Manual from './Manual';
import Billetera from './Billetera';
import Test from './Test';
import Inversiones from './Inversiones';
const Pages: SPageListProps = {
    "inicio": InicioPage,
    "carga": CargaPage,
    "presentacion": Presentacion,
    "test": Test,
    AjustesPage,
    ...Usuario.Pages,
    ...Sucursal.Pages,
    ...SSRolesPermisosPages,
    ...TipoPago.Pages,
    ...Paquete.Pages,
    ...Servicio.Pages,
    ...Banco.Pages,
    ...Caja.Pages,
    ...PaqueteVenta.Pages,
    ...Entrenamiento.Pages,
    ...Asistencia.Pages,
    ...Finanza.Pages,
    ...DashBoard.Pages,
    ...Manual.Pages,
    ...Billetera.Pages,
    ...Inversiones.Pages,
}
export default Pages;