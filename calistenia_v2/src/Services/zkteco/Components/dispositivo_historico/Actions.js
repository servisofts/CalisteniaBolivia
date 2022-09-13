import SSocket from 'servisofts-socket';
import Parent from './index';

export default class Actions {
    static _getReducer = (props) => {
        return props.state[Parent.component + "Reducer"];
    }
    static getAll = (key_dispositivo, props) => {
        var reducer = Actions._getReducer(props);
        if (reducer.key_dispositivo != key_dispositivo) {
            reducer.key_dispositivo = key_dispositivo;
            reducer.data = "";
        }
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return null;
            SSocket.send({
                service: 'zkteco',
                component: Parent.component,
                version: Parent.version,
                type: "getAll",
                estado: "cargando",
                key_usuario: "",
                key_dispositivo: key_dispositivo
            })
            return null;
        }
        return data;
    }

    static getAllByKeyPuntoVenta = (key_punto_venta, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        return Object.values(data).filter(x => x.key_punto_venta == key_punto_venta);
    }

    static getByKey = (key, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        return data[key];
    }

    static registro = (data, props) => {
        SSocket.send({
            component: Parent.component,
            version: Parent.version,
            type: "registro",
            estado: "cargando",
            key_usuario: "",
            data: data
        })
    }


    static editar = (data, props) => {
        SSocket.send({
            component: Parent.component,
            version: Parent.version,
            type: "editar",
            estado: "cargando",
            key_usuario: "",
            data: data
        })
    }
    static eliminar = (data, props) => {
        SSocket.send({
            component: Parent.component,
            version: Parent.version,
            type: "editar",
            estado: "cargando",
            key_usuario: "",
            data: {
                ...data,
                estado: 0,
            }
        })
    }

    static getError = (type, props) => {
        if (props.state.usuarioReducer.estado == "error" && props.state.usuarioReducer.type == type) {
            props.state.usuarioReducer.estado = "";
            return props.state.usuarioReducer.error;
        }
        return null
    }

}