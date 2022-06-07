import { SIcon } from "servisofts-component";
import SSocket from "servisofts-socket";

const config = {
    reducer: "servicioReducer",
    component: "servicio"
}
export default class Actions {
    static registro(data, props) {
        var object = {
            component: config.component,
            type: "registro",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data
        }
        SSocket.send(object);
    }
    static editar(data, props) {
        var object = {
            component: config.component,
            type: "editar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data
        }
        SSocket.send(object);
    }
    static getAll(props) {
        var data = props.state[config.reducer].data;
        if (!data) {
            if (props.state[config.reducer].estado == "cargando") return;
            SSocket.send({
                component: config.component,
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            })
            return;
        }
        return data;
    }
    static getByKey(key, props) {
        var data = props.state[config.reducer].data;
        if (!data) {
            if (props.state[config.reducer].estado == "cargando") return;
            SSocket.send({
                component: config.component,
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            })
            return;
        }
        return data[key];
    }
}