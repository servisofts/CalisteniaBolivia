import { SPage } from "servisofts-component";

import documento from "./documento";
import pagar from "./pagar";
import root from "./root";

// import cumpleaños from "./documento";
// import { default as historial } from "./historial";
// import comparativos from "./pagar";
export const Parent = {
  title: "responsabilidades",
  name: "responsabilidades",
  path: "/responsabilidades",
};
export default SPage.combinePages(Parent.name, {
  "": root,
  documento: documento,
  pagar: pagar,
});
