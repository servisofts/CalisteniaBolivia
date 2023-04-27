import { SPage } from "servisofts-component";

// PAGES OLD //
import Client from "../Client";
import Services from "../Services";
import AjustesPage from "./AjustesPage";
import Asistencia from "./Asistencia";
import Banco from "./Banco";
import Billetera from "./Billetera";
import Caja from "./Caja";
import CargaPage from "./CargaPage/index";
import clientes_activos from "./clientes_activos";
import DashBoard from "./DashBoard";
import Entrenamiento from "./Entrenamiento";
import Finanza from "./Finanza";
import Inversiones from "./Inversiones";
import Manual from "./Manual";
import Paquete from "./Paquete";
import PaqueteVenta from "./PaqueteVenta";
import Presentacion from "./Presentacion";
import prorroga from "./prorroga";
import Servicio from "./Servicio";
import Sucursal from "./Sucursal";
import Test from "./Test";
import TipoPago from "./TipoPago";
import Usuario from "./Usuario";
// PAGES NEW//
import contabilidad from "./contabilidad";
import empresa from "./empresa";
import rol from "./rol";
import root from "./root";
import testAlvaro from "./testAlvaro";
import testTablaUsuarios from "./testTablaUsuarios";

import fidelizacion from "./fidelizacion";
import responsabilidades from "./responsabilidades";
import terminos from "./terminos";

const newPages = SPage.combinePages("/", {
  "": root,
  test: Test,
  terminos: terminos,
  ...empresa,
  ...contabilidad,
  ...fidelizacion,
  ...responsabilidades,
  ...rol,
});

export default {
  ...newPages,
  // "inicio": InicioPage,
  inicio: root,
  carga: CargaPage,
  presentacion: Presentacion,
  clientes_activos: clientes_activos,
  AjustesPage,
  ...Usuario.Pages,
  ...Sucursal.Pages,
  // ...SSRolesPermisosPages,
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
  ...prorroga.Pages,
  ...Inversiones.Pages,
  ...Services.Pages,
  ...Client.Pages,
  alvaro: testAlvaro,
  tabla: testTablaUsuarios,
};
