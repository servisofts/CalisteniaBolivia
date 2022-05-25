//  COMPONENT CONFIG
const component = "sucursal_servicio"; // COMPONENT NAME 
const version = "1.0";
// ---------------------------------------
import Actions from "./Actions";
import Reducer from "./Reducer";

import Select from "./Component/Select";
export default {
    component,
    version,
    Actions,
    Components: {
        Select
    },
    Reducers: {
        [component + 'Reducer']: Reducer
    },
    Pages: {
    }
}