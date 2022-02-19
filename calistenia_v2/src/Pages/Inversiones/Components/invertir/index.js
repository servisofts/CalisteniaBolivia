//  COMPONENT CONFIG
const component = "invertir"; // COMPONENT NAME 
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