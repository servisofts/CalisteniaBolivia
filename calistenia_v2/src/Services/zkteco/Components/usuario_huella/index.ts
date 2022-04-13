//  COMPONENT CONFIG
const component = "usuario_huella"; // COMPONENT NAME 
const version = "1.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";
import Lista from "./Pages/Lista";
import ZKTeco from "./Pages/ZKTeco";

export default {
    component,
    version,
    Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
        [component]: Lista,
        ["ZKTeco"]: ZKTeco,
    }
}