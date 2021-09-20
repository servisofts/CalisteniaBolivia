import { SIcon } from "servisofts-component";
import SSocket from "servisofts-socket";

export default class Actions {
    static registro(data, props) {
        var object = {
            component: "tipoPago",
            type: "registro",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data
        }
        SSocket.send(object);
    }
    static editar(data, props) {
        var object = {
            component: "tipoPago",
            type: "editar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data
        }
        SSocket.send(object);
    }
    static getAll(props) {
        var data = props.state.tipoPagoReducer.data;
        if (!data) {
            if (props.state.tipoPagoReducer.estado == "cargando") return;
            SSocket.send({
                component: "tipoPago",
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            })
            return;
        }
        return data;
    }
    static getByKey(key, props) {
        var data = props.state.tipoPagoReducer.data;
        if (!data) {
            if (props.state.tipoPagoReducer.estado == "cargando") return;
            SSocket.send({
                component: "tipoPago",
                type: "getAll",
                estado: "cargando",
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
            })
            return;
        }
        return data[key];
    }
    static getIcon(tipo) {
        switch (tipo) {
            case "1": return <SIcon name={"Money"} />
            case "2": return <SIcon name={"Card"} />
            case "3": return <SIcon name={"Tranfer"} />
            case "4": return <SIcon name={"Cheque"} />
        }
        return;
    }
}