import SSocket from 'servisofts-socket';
import Parent from './index';

export default class Actions {
    static _getReducer = (props) => {
        return props.state[Parent.component + "Reducer"];
    }
    static getAll = (props) => {
        var reducer = Actions._getReducer(props);
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return null;
            SSocket.send({
                component: Parent.component,
                version: Parent.version,
                type: "getAll",
                estado: "cargando",
                key_usuario: "",
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

    static solicitudRegistroHuella = (data, props) => {
        SSocket.send({
            servicio: "zkteco",
            component: Parent.component,
            version: Parent.version,
            type: "solicitud_registro_huella",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data
        })
    }
    static abrir = (dispositivo, door, props) => {
        var data = {
            operID: 1,
            doorOrAuxoutID: door,
            outputAddrType: 1,
            doorAction: 3,
        }

        if (dispositivo.actividad) {
            delete dispositivo.actividad;
        }
        SSocket.send({
            service: "zkteco",
            component: Parent.component,
            version: Parent.version,
            type: "open",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            dispositivo: dispositivo,
            parameters: data
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