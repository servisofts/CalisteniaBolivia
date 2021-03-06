const initialState = {
    estado: "Not Found",
    // data: {},
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "paqueteServicio") {
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
        }
        state.type = action.type;
        state.estado = action.estado;
        state.error = action.error;
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}

const registro = (state, action) => {
    if (action.estado != "exito") return;
    state.lastRegister = action.data;
    if (!state.data) return;
    state.data[action.data.key] = action.data;
}
const editar = (state, action) => {
    if (action.estado != "exito") return;
    if (!state.data) return;
    state.data[action.data.key] = action.data;
}
const getAll = (state, action) => {
    if (action.estado != "exito") return;
    state.data = action.data;
    // if (action.key_paquete) {
    //     state.data[action.key_paquete] = action.data;
    // }
    // Object.keys(action.data).map((key) => {
    //     var obj = action.data[key];
    //     if (!state.rol[obj.key_rol]) {
    //         state.rol[obj.key_rol] = {};
    //     }
    //     state.rol[obj.key_rol][obj.key_permiso] = obj.key

    //     if (!state.permiso[obj.key_permiso]) {
    //         state.permiso[obj.key_permiso] = {};
    //     }
    //     state.permiso[obj.key_permiso][obj.key_rol] = obj.key
    // })
}
