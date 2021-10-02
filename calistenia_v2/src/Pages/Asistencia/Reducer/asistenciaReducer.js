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
            case "getByKeyEntrenamiento":
                getByKeyEntrenamiento(state, action);
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
    }
}

const getByKeyEntrenamiento = (state, action) => {
    if (action.estado === "exito") {
        if (state.data) {
            state.data[action.key_entrenamiento] = action.data;
        }
    }
}


