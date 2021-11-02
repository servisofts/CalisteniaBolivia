import SSocket from "servisofts-socket";

export default class Events {
    static getUsuarioRol(key_rol, props) {
        var data = props.state.usuarioRolReducer.rol[key_rol];
        if (!data) {
            if (props.state.usuarioRolReducer.estado == "cargando") return;
            SSocket.send({
                component: "usuarioRol",
                type: "getAll",
                estado: "cargando",
                key_rol: key_rol,
            })
            return;
        }
        return data;
    }

}