import SSocket from 'servisofts-socket'
export default class index {
    static component = "asistencia"
    static reducerName = "asistenciaReducer";
    static registro({
        key_usuario,
        descripcion,
        key_entrenamiento
    }, props) {
        var reducer = props.state[index.reducerName];
        var data = reducer.data["registro_administrador"];
        if (!data) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: index.component,
                type: "registro",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                data: {
                    key_usuario: key_usuario,
                    descripcion: descripcion,
                    key_entrenamiento: key_entrenamiento
                }
            })
            return;
        }
        return data;
    }
    static getByKeyEntrenamiento({ key_entrenamiento }, props) {
        var reducer = props.state[index.reducerName];
        var data = reducer.data[key_entrenamiento];
        if (!data) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: index.component,
                type: "getByKeyEntrenamiento",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                key_entrenamiento: key_entrenamiento,
            })
            return;
        }
        return data;
    }
}