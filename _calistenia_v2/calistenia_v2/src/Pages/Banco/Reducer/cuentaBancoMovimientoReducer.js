const initialState = {
    estado: "Not Found",
    data: false,
}

export default (state, action) => {
    if (!state) return initialState
    if (action.component == "cuentaBancoMovimiento") {
        switch (action.type) {
            case "getAll":
                getAll(state, action);
                break;
            case "getAllByKeyCuentaBanco":
                getAllByKeyCuentaBanco(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
            case "traspaso":
                traspaso(state, action);
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

const getAll = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        state.data = {
            ...state.data,
            ...action.data
        };
    }
}
const getAllByKeyCuentaBanco = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data) {
            state.data = {}
        }
        if (action.key_cuenta_banco) {
            state.data[action.key_cuenta_banco] = action.data;
        }

    }
}
const registro = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data) {
            return;
        }
        if (state.data[action.data.key_cuenta_banco]) {
            state.data[action.data.key_cuenta_banco][action.data.key] = action.data;
        }
    }
}
const traspaso = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data) {
            return;
        }
        // if (state.data[action.data.key_cuenta_banco]) {
        //     state.data[action.data.key_cuenta_banco][action.data.key] = action.data;
        // }
        // if (state.data[action.data.key_cuenta_banco_to]) {
        //     state.data[action.data.key_cuenta_banco_to][action.data.key] = action.data;
        // }
    }
}
const editar = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        if (!state.data) {
            return;
        }
        if (state.data[action.data.key_cuenta_banco]) {
            state.data[action.data.key_cuenta_banco][action.data.key] = action.data;
        }
    }
}
