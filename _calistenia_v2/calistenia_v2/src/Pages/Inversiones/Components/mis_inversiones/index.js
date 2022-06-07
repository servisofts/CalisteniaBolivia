//  COMPONENT CONFIG
const component = "mis_inversiones"; // COMPONENT NAME 
// ---------------------------------------

import lista from "./Pages/lista";
import Perfil from "./Pages/Perfil";

export default {
    component,
    Reducers: {
    },
    Pages: {
        [component]: lista,
        [component + "/perfil"]: Perfil,
        // "/:servicio/proyecto": { component: Lista }
    },
}