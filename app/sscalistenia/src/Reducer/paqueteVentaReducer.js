const initialState = {
    estado: "Not Found",
    usuario: {}
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "paqueteVenta") {
        switch (action.type) {
            case "registro":
                registro(state, action);
                break;
            case "getAllByUsuario":
                getAllByUsuario(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
            case "eliminar":
                eliminar(state, action);
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
    state.estado = action.estado
    if (action.estado === "exito") {
        action.clientes.map((cli) => {
            if (state.usuario[cli.key_usuario]) {
                state.usuario[cli.key_usuario][action.data.key] = {
                    ...action.data,
                    fecha_inicio: cli.fecha_inicio,
                    fecha_fin: cli.fecha_fin,
                }
            }
            if (state.data) {
                state.data[cli.key_usuario][action.data.key] = {
                    ...action.data,
                    fecha_inicio: cli.fecha_inicio,
                    fecha_fin: cli.fecha_fin,
                }
            }
        })
        state.lastRegister = action.data;
    }
}
const eliminar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        action.clientes.map((cli) => {
            if (state.usuario[cli]) {
                delete state.usuario[cli][action.data.key];
            }
            if (state.data) {
                delete state.data[cli][action.data.key];
            }
        })
        state.lastRegister = action.data;
    }
}
const getAllByUsuario = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        console.log("ecito");
        if (action.key_usuario) {
            state.usuario[action.key_usuario] = action.data;
        }
    }
}
const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        console.log("ecito");
        if (action.key_usuario) {
            state.data[action.key_usuario] = action.data;
        }
    }
}

