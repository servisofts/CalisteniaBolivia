import React from "react";
import { SIcon } from "servisofts-component";
import SSocket from "servisofts-socket";

const componentName = "billetera";

export default class Actions {
    static _getReducer(props) {
        return props.state[componentName + "Reducer"];
    }
    static registro(data, props) {
        var object = {
            component: componentName,
            type: "registro",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: {
                ...data,
                key_usuario: props.state.usuarioReducer.usuarioLog.key
            }
        }
        SSocket.send(object);
    }
    static editar(data, props) {
        var object = {
            component: componentName,
            type: "editar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data
        }
        SSocket.send(object);
    }
    static getAll({ key_cuenta_banco }, props) {
        var reducer = props.state[componentName + "Reducer"];
        if (reducer.key_cuenta_banco != key_cuenta_banco) {
            reducer.data = null;
        }

        var data = props.state[componentName + "Reducer"].data;
        if (!data) {
            reducer.key_cuenta_banco = key_cuenta_banco
            if (props.state[componentName + "Reducer"].estado == "cargando") return;
            SSocket.send({
                component: componentName,
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                key_cuenta_banco: key_cuenta_banco
            })
            return;
        }
        return data;
    }
    static getByKey(key, key_cuenta_banco, props) {
        var data = this.getAll({ key_cuenta_banco: key_cuenta_banco }, props);
        if (!data) {
            return null;
        }
        return data[key];
    }
    static getByCodigo(key, props) {
        var data = props.state[componentName + "Reducer"].codigo;
        if (props.state[componentName + "Reducer"].code != key) {
            props.state[componentName + "Reducer"].codigo = null;

        }
        props.state[componentName + "Reducer"].code = key;
        if (!data) {
            if (props.state[componentName + "Reducer"].estado == "cargando") return;
            SSocket.send({
                component: componentName,
                type: "getByCodigo",
                estado: "cargando",
                codigo: key,
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            })
            return;
        }
        return data;
    }
}