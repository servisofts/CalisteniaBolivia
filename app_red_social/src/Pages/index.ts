import { SPage, SPageListProps } from 'servisofts-component';

import root from './root';
import carga from "./carga"
import login from "./login";
import registro from './registro';
import paquete from './paquete';
import sucursal from './sucursal';
import cuenta from './cuenta';
import terminos from './terminos';



import restaurante from './restaurante';
import explorar from './explorar';
import favoritos from './favoritos';
// import mapa from './mapa';
import billetera from './billetera';
import direccion from './direccion';
import pedido from './pedido';
import contacto from './contacto';
import novedades from './novedades';
import compras from './compras';
import perfil from './perfil';
import tarjeta from './tarjeta';
import notificaciones from './notificaciones';
import chat from './chat';
import ajustes from './ajustes';
import ayuda from './ayuda';
import filtros from './filtros';
import cupones from './cupones';
import test from './test';
import publicacion from './publicacion';
export default SPage.combinePages("/", {
  "": carga,
  "root": root,
  "carga": carga,
  ...login,
  ...registro,
  ...paquete,
  ...sucursal,
  ...cuenta,
  ...publicacion,
  "terminos": terminos,
  "test": test,
  "contacto": contacto,
  "novedades": novedades,
  "compras": compras,
  notificaciones,
  explorar,
  favoritos,
  //mapa,
  ajustes,
  filtros,
  ...restaurante,
  ...billetera,
  ...direccion,
  ...pedido,
  ...perfil,
  ...tarjeta,
  ...chat,
  ...ayuda,
  ...cupones
  // ...ayuda
});