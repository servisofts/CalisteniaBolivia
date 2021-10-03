import { SIcon } from "servisofts-component";
import SSocket from "servisofts-socket";

const config = {
    // reducer: "paqueteReducer",
    // component: "paquete"
}
export default class Actions {
    static component = "reporte"
    static reducerName = "reporteReducer";
    static getMovimientosBancarios(props, force) {
        var reducer = props.state[Actions.reducerName];
        var data = reducer.data;
        if (!reducer.all || force) {

            if (reducer.estado == "cargando") return;

            data["fecha_desde"]="2020-01-01";
            data["fecha_hasta"]="2021-12-01";

            SSocket.send({
                component: Actions.component,
                type: "getMovimientosBancarios",
                estado: "cargando",
                data,
                key_usuario: props.state.usuarioReducer.usuarioLog.key
            })
            return;
        }
        return data;
    }
}