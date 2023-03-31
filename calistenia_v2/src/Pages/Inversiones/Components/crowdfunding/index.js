//  COMPONENT CONFIG
const component = "crowdfunding"; // COMPONENT NAME
// ---------------------------------------

import lista from "./Pages/lista";

export default {
  component,
  Reducers: {
  },
  Pages: {
    [component]: lista,
    // "/:servicio/proyecto": { component: Lista }
  },
}