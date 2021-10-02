import SSocket from "servisofts-socket";

export default class Actions {
    static component = "entrenamiento"
    static reducerName = "entrenamientoReducer";
    static getAll(props, force) {
        var reducer = props.state[Actions.reducerName];
        var data = reducer.data;
        if (!reducer.all || force) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: Actions.component,
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key
            })
            return;
        }
        return data;
    }


}