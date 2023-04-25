import { SPage } from "servisofts-component";

import root from "./root";

import comparativos from "./comparativos";
import cumpleaños from "./cumpleaños";
import { default as historial } from "./historial";
export const Parent = {
  title: "fidelizacion",
  name: "fidelizacion",
  path: "/fidelizacion",
};
export default SPage.combinePages(Parent.name, {
  "": root,
  comparativos: comparativos,
  cumpleaños: cumpleaños,
  historial: historial,
});
