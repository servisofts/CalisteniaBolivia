const initialState = {
    estado: "Not Found",
    data: {},
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "asistencia") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "editar":
                editar(state, action);
                break;
            case "getByKeyEntrenamiento":
                getByKeyEntrenamiento(state, action);
                break;
            case "getByKeySucursal":
                getByKeySucursal(state, action);
                break;
        }
        state.type = action.type;
        state.estado = action.estado;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const registro = (state, action) => {
    if (action.estado === "exito") {
        if (state.data[action.data.key_entrenamiento]) {
            state.data[action.data.key_entrenamiento][action.data.key] = action.data;
        }
        if (state.data[action.data.key_sucursal]) {
            var key_entrenamiento = action.data.key_entrenamiento;
            var remove = false;
            Object.keys(state.data[action.data.key_sucursal]).map((key) => {
                var asistencia = state.data[action.data.key_sucursal][key];
                if (asistencia.key_entrenamiento != key_entrenamiento) {
                    remove = true;
                }
            })
            if (remove) {
                state.data[action.data.key_sucursal] = {};
            }
            state.data[action.data.key_sucursal][action.data.key] = action.data;
        }
    }
}
const editar = (state, action) => {
    if (action.estado === "exito") {
        if (state.data[action.data.key_entrenamiento]) {
            state.data[action.data.key_entrenamiento][action.data.key] = action.data;
        }
        if (state.data[action.key_sucursal]) {
            state.data[action.key_sucursal][action.data.key] = action.data;
        }
    }
}

const getByKeyEntrenamiento = (state, action) => {
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.key_entrenamiento] = action.data;
        }
    }
}
const getByKeySucursal = (state, action) => {
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.key_sucursal] = action.data;
        }
    }
}


