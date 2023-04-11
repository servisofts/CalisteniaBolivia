//  COMPONENT CONFIG
const component = "crowdfunding"; // COMPONENT NAME
import db from "./Pages/db";
import fijo from "./Pages/fijo";
// ---------------------------------------

import lista from "./Pages/lista";
import variable from "./Pages/variable";

export default {
  component,
  Reducers: {
  },
  Pages: {
    [component]: lista,
    [component + "/fijo"]: fijo,
    [component + "/variable"]: variable,
    [component + "/db"]: db,

    // "/:servicio/proyecto": { component: Lista }
  },
}