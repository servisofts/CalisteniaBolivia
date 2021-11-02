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
            SSocket.send({
                component: Actions.component,
                type: "getMovimientosBancarios",
                estado: "cargando",
                data: {
                    fecha_desde: "2020-01-01",
                    fecha_hasta: "2035-12-01"
                },
                key_usuario: props.state.usuarioReducer.usuarioLog.key
            })
            return;
        }
        return data;
    }
    static getPaquetesVendidos(dataProps, props, force) {
        var reducer = props.state[Actions.reducerName];
        var data = reducer.paquetesVendidos;
        if (reducer.data_paquetesVendidos != JSON.stringify(dataProps)) {
            reducer.data_paquetesVendidos = JSON.stringify(dataProps);
            reducer.paquetesVendidos = false;
            force = true;
        }
        if (!data || force) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: Actions.component,
                type: "getPaquetesVendidos",
                estado: "cargando",
                data: dataProps,
                key_usuario: props.state.usuarioReducer.usuarioLog.key
            })
            return;
        }
        return data;
    }
    static getReporteAsistencia(dataProps, props, force) {
        var reducer = props.state[Actions.reducerName];
        var data = reducer.reporteAsistencia;
        if (reducer.data_reporteAsistencia != JSON.stringify(dataProps)) {
            reducer.reporteAsistencia = false;
            reducer.data_reporteAsistencia = JSON.stringify(dataProps);
            force = true;
        }
        if (!data || force) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: Actions.component,
                type: "getReporteAsistencia",
                estado: "cargando",
                data: dataProps,
                key_usuario: props.state.usuarioReducer.usuarioLog.key
            })
            return;
        }
        return data;
    }

    //DEFAULT FUNCTION GET REPORTE
    static _getReporte(dataProps, props, force, name, type) {
        var reducer = props.state[Actions.reducerName];
        var data = reducer[name];
        if (reducer["data_" + name] != JSON.stringify(dataProps)) {
            reducer[name] = false;
            reducer["data_" + name] = JSON.stringify(dataProps);
            force = true;
        }
        if (!data || force) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: Actions.component,
                type: type,
                estado: "cargando",
                data: dataProps,
                key_usuario: props.state.usuarioReducer.usuarioLog.key,
                name_in_reducer: name,
            })
            return;
        }
        return data;
    }

    static getReporteIngresosEgresos(dataProps, props, force) {
        const name = "reporteIngresosEgresos";
        const type = "getReporteIngresosEgresos";
        return this._getReporte(dataProps, props, force, name, type);
    }
}