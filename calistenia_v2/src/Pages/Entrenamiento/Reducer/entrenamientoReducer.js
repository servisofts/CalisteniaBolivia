const initialState = {
    estado: "Not Found",
    data: {},
    entrenamientos: {},
    all: false,
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "entrenamiento") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "getByKeyUsuario":
                getByKeyUsuario(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
            case "editar":
                editar(state, action);
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
            if (!state.data[action.data.key_usuario]) state.data[action.data.key_usuario] = {};
            state.data[action.data.key_usuario] = action.data;
        }
        if (state.entrenamiento) {
            if (!state.entrenamiento.key) state.entrenamiento = false;
        }
    }
}
const editar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            if (!state.data[action.data.key_usuario]) state.data[action.data.key_usuario] = {};
            state.data[action.data.key_usuario] = action.data;
        }
        if (state.entrenamiento) {
            if (!state.entrenamiento.key) state.entrenamiento = false;
            if (state.entrenamiento.key == action.data.key) {
                state.entrenamiento = false;
            }
        }
    }
}
const getByKeyUsuario = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (state.data) {
            if (!state.data[action.data.key_usuario]) state.data[action.data.key_usuario] = {};
            state.data[action.data.key_usuario] = action.data;
        }
        state.entrenamiento = action.data;
    }
}

const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.all = true;
        Object.keys(action.data).map(key => {
            var obj = action.data[key];
            state.data[obj.key_usuario] = obj;
        })
    }
}

