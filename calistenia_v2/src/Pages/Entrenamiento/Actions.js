import SSocket from "servisofts-socket";
import { SDate } from "servisofts-component";

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
    static getByKey(key, props, force) {
        var reducer = props.state[Actions.reducerName];
        var data = reducer.data_key[key];
        if (!data || force) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: Actions.component,
                type: "getByKey",
                estado: "cargando",
                key: key,
                key_usuario: props.state.usuarioReducer.usuarioLog.key
            })
            return;
        }
        return data;
    }
    static getByDate(fecha, props, force) {
        var reducer = props.state[Actions.reducerName];
        var data = reducer.date;
        if (fecha != reducer.date_last) {
            reducer.date_last = fecha;
            force = true;
        }
        if (!data || force) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: Actions.component,
                type: "getByDate",
                estado: "cargando",
                fecha: fecha,
                key_usuario: props.state.usuarioReducer.usuarioLog.key
            })
            return;
        }
        return data;
    }


}