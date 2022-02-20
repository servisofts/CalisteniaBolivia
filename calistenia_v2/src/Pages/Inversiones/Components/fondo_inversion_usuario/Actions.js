import SSocket from 'servisofts-socket';
import Parent from './index';
import Service from '../../index';

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
    static getByKeyFondo = (key_fondo, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        return Object.values(data).filter((key) => data[key].key_fondo_inversion = key_fondo);
    }
    static filtrar = (filtro, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        return Object.values(data).filter((itm) => {
            var acept = true;
            Object.keys(filtro).map((fil) => {
                if (itm[fil] != filtro[fil]) acept = false;
            })
            return acept;
        });
    }
    static getMisInversiones = (key_usuario, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        var monto = 0;
        var cantidad = 0;

        return Object.keys(data).filter((key) => (data[key].key_usuario_inversionista == key_usuario)).map((item) => {
            return data[item]
        });
    }
    static getMontoInvertido = (key_fondo, props) => {
        var data = Actions.getAll(props);
        if (!data) return null;
        var monto = 0;
        var cantidad = 0;
        Object.keys(data).filter((key) => (data[key].key_fondo_inversion == key_fondo) && (data[key].fecha_aprobacion != null)).map((item) => {
            monto += data[item].inversion;
            cantidad++;
        });
        return { monto, cantidad };
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
    static aprobar = (data, props) => {
        SSocket.send({
            component: Parent.component,
            version: Parent.version,
            type: "aprobar",
            estado: "cargando",
            key_usuario: props.state.usuarioReducer.usuarioLog.key,
            data: data
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