import SSocket from 'servisofts-socket';
export default class index {
    static component = "caja"
    static reducerName = "cajaReducer";
    static getByKey(props, key_caja) {
        var reducer = props.state[index.reducerName];
        var data = reducer.keys[key_caja];
        if (!data) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: index.component,
                type: "getByKey",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                key: key_caja,
            })
            return;
        }
        return data;
    }
}