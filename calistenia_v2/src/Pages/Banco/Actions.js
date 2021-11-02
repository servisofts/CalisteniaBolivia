import SSocket from "servisofts-socket";

export default class Actions {
    static getAllBancos = (props) => {
        var reducer = props.state.bancoReducer;
        if (!reducer.data) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: "banco",
                type: "getAll",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            })
            return;
        }
        return reducer.data;
    }
    static getAllCuentaBancos = (props) => {
        var reducer = props.state.cuentaBancoReducer;
        if (!reducer.dataAll) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: "cuentaBanco",
                type: "getAll",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            })
            return;
        }
        return reducer.dataAll;
    }
}