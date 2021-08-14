const initialState = {
    estado: "Not Found",
    usuario: {},
    data: false,
    activas: false,
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "caja") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "getActivas":
                getActivas(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
            case "cierre":
                cierre(state, action);
                break;
            case "getActiva":
                getActiva(state, action);
                break;
        }
        state.type = action.type;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.data = action.data;
    }
}
const getActivas = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        Object.keys(action.data).map(key => {
            var obj = action.data[key];
            state.usuario[obj.key_usuario] = obj;
        })
        state.activas = true;
    }
}
const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        console.log(action.data);
        state.usuario[action.data.key_usuario] = action.data;
        state.lastRegister = action.data;
    }
}
const getActiva = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuario[action.data.key_usuario] = action.data;
        state.lastRegister = action.data;
    }
}
const cierre = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        delete state.usuario[action.data.key_usuario];
        // state.lastRegister = action.data;
    }
}
