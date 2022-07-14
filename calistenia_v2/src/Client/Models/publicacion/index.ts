import Actions from "./Actions";
import Reducer from "./Reducer";

const component = "publicacion"; // COMPONENT NAME 

export default {
    component: component,
    version: "1.0",
    Actions: Actions,
    Reducers: {
        [component + 'Reducer']: Reducer
    },
}