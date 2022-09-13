//  COMPONENT CONFIG
const component = "dispositivo"; // COMPONENT NAME 
const version = "1.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";

import Lista from "./Pages/Lista";
import Molinete from "./Pages/Molinete";
import DispositivoUsuarios from "./Pages/DispositivoUsuarios";
import Sincronizador from "./Pages/Sincronizador";
export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
        [component]: Lista,
        [component + "/usuarios"]: DispositivoUsuarios,
        [component + "/sync"]: Sincronizador,
        "molinete": Molinete,
    }
}