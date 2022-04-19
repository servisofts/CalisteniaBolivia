const initialState = {
    estado: "Not Found",
    data: {},
    entrenamientos: {},
    all: false,
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "reporte") {
        switch (action.type) {
            case "getMovimientosBancarios":
                getMovimientosBancarios(state, action);
                break;
            case "getReporteGeneral":
                getReporteGeneral(state, action);
                break;
            case "getPaquetesVendidos":
                getPaquetesVendidos(state, action);
                break;
            case "getReporteAsistencia":
                getReporteAsistencia(state, action);
                break;
            default:
                defaultType(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}


const getMovimientosBancarios = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = {}
        Object.keys(action.data).map(key => {
            var obj = action.data[key];
            obj.key = key;
            state.data[key] = obj;
        })
    }
}
const getReporteGeneral = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.dataEstado = action.data;
    }
}
const getPaquetesVendidos = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.paquetesVendidos = action.data;
    }
}
const getReporteAsistencia = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.reporteAsistencia = action.data;
    }
}
const defaultType = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        var name = action.name_in_reducer;
        if (!name) return;
        state[name] = action.data;
    }
}

