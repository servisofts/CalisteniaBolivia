import SSocket from "servisofts-socket";

export default class Actions {
    static registro(data, props) {
        var object = {
            component: "sucursal",
            type: "registro",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data
        }
        SSocket.send(object);
    }
    static editar(data, props) {
        var object = {
            component: "sucursal",
            type: "editar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data
        }
        SSocket.send(object);
    }
    static getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    static getAll(props) {
        var data = props.state.sucursalReducer.data;
        if (!data) {
            if (props.state.sucursalReducer.estado == "cargando") return;
            SSocket.send({
                component: "sucursal",
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            })
            return;
        }
        return data;
    }
    static getByKey(key_sucursal, props) {
        var data = props.state.sucursalReducer.data;
        if (!data) {
            if (props.state.sucursalReducer.estado == "cargando") return;
            SSocket.send({
                component: "sucursal",
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            })
            return;
        }
        return data[key_sucursal];
    }

}