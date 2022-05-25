import { SIcon } from "servisofts-component";
import SSocket from "servisofts-socket";

const config = {
    // reducer: "paqueteReducer",
    // component: "paquete"
}
export default class Actions {
    static component = "reporte"
    static reducerName = "reporteReducer";
    static getMovimientosBancarios(fecha_desde, fecha_hasta, isAdmin, props, force) {
        var reducer = props.state[Actions.reducerName];
        var dataProps = {
            fecha_desde: fecha_desde,
            fecha_hasta: fecha_hasta
        };
        var data = reducer.data;
        if (reducer.data_movBanco != JSON.stringify(dataProps)) {
            reducer.data_movBanco = JSON.stringify(dataProps);
            reducer.data = false;
            force = true;
        }
        if (!data || force) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: Actions.component,
                type: "getMovimientosBancarios",
                estado: "cargando",
                data: dataProps,
                admin: isAdmin,
                key_usuario: props.state.usuarioReducer.usuarioLog.key
            })
            return;
        }
        return data;
    }
    static getEstadoFinanciero(fecha_desde, fecha_hasta, key_sucursal, props, force) {
        var reducer = props.state[Actions.reducerName];
        var dataProps = {
            fecha_desde: fecha_desde,
            fecha_hasta: fecha_hasta,

        };
        if (key_sucursal) {
            dataProps.key_sucursal = key_sucursal;
        }
        var data = reducer.dataEstado;
        if (reducer.data_estadoFinanciero != JSON.stringify(dataProps)) {
            reducer.data_estadoFinanciero = JSON.stringify(dataProps);
            reducer.dataEstado = false;
            force = true;
        }
        if (!data || force) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: Actions.component,
                type: "getReporteGeneral",
                estado: "cargando",
                data: dataProps,
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
    static getPaquetesVendidosAll(dataProps, props, force) {
        var reducer = props.state[Actions.reducerName];
        var data = reducer.paquetesVendidosAll;
        if (reducer.data_paquetesVendidosAll != JSON.stringify(dataProps)) {
            reducer.data_paquetesVendidosAll = JSON.stringify(dataProps);
            reducer.paquetesVendidosAll = false;
            force = true;
        }
        if (!data || force) {
            if (reducer.estado == "cargando") return;
            SSocket.send({
                component: Actions.component,
                type: "getPaquetesVendidosAll",
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