//  COMPONENT CONFIG
const component = "fondo_inversion_usuario"; // COMPONENT NAME 
const version = "1.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";
import struct from "./struct";

import Lista from "./Pages/Lista";
import Registro from "./Pages/Registro";
import Perfil from "./Pages/Perfil";
import Select from "./Pages/Select";
export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
        [component]: Lista,
        [component + "/registro"]: Registro,
        [component + "/perfil"]: Perfil,
        [component + "/select"]: Select,
        // "/:servicio/proyecto": { component: Lista }
    },
    struct: struct
}