import SSocket from "servisofts-socket";

export default class index {
    static component = "cajaMovimiento"
    static reducerName = "cajaMovimientoReducer";

    static getByKeyCaja(key_caja, props) {
        var reducer = props.state[index.reducerName];
        var data = reducer.data[key_caja];
        if (!data) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: index.component,
                type: "getByKeyCaja",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                key_caja: key_caja,
                estado: "cargando"
            })
            return;
        }
        return data;
    }

}