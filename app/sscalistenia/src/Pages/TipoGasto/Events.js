import AppParams from "../../Params";

export default {
    getEstado(props) {
        return props.state.tipoGastoReducer.estado;
    },
    getType(props) {
        return props.state.tipoGastoReducer.type;
    },
    getAll(props) {
        var reducer = props.state.tipoGastoReducer
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return;
            if (reducer.estado == "error") return;
            var object = {
                component: "tipoGasto",
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            }
            props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return;
        }
        return data;

    },
    registro(props, data) {
        var object = {
            component: "tipoGasto",
            type: "registro",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data,
        }
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    },
    editar(props, data) {
        var object = {
            component: "tipoGasto",
            type: "editar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data,
        }
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    },
    anular(props, data) {
        var object = {
            component: "tipoGasto",
            type: "editar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: {
                ...data,
                estado: 0,
            },
        }
        props.state.socketReducer.session[AppParams.socket.name].send(object, true);
    }
}