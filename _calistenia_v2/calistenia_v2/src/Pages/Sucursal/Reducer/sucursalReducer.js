const initialState = {
    estado: "Not Found",
    data: false,
    monto: {},
    cajaActiva: {}
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "sucursal") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "editar":
                editar(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
            case "anular":
                anular(state, action);
                break;
            case "getMontoCaja":
                getMontoCaja(state, action);
                break;
            case "getCajaActiva":
                getCajaActiva(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.data.key] = action.data;
        }
        state.lastRegister = action.data;
    }
}
const editar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.data.key] = action.data;
        }
        state.lastEdit = action.data;
    }
}
const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data;
    }
}

const anular = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            delete state.data[action.key];
        }
    }
}
const getMontoCaja = (state, action) => {
    state.estado = action.estado
    if (action.estado == "exito") {
        state.monto[action.key_sucursal] = action.data;
    }
}
const getCajaActiva = (state, action) => {
    state.estado = action.estado
    if (action.estado == "exito") {
        state.cajaActiva[action.key_sucursal] = action.data;
    }
}
