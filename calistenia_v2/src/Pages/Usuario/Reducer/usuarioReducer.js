// import AppParams from "../Params";
import { SStorage } from 'servisofts-component'

const initialState = {
    estado: "",
    data: {},
    usuarioLog:{}
}

export default (state, action) => {
    if (!state) {
        SStorage.getItem("usr_log", (resp) => {
            
            initialState.usuarioLog = JSON.parse(resp);
            
        })
        return initialState
    }
    if (action.component == "usuario") {
        if (action.version != "2.0") {
            return state;
        }
        switch (action.type) {
            case "login":
                login(state, action);
                break;
            case "getAll":
                getAll(state, action);
                break;
            case "editar":
                editar(state, action);
                break;
            case "registro":
                registro(state, action);
                break;
            case "getById":
                getById(state, action);
                break;
        }
        state.type = action.type;
        if (action.estado == "error") {
            state.error = action.error;
        }
        state.lastSend = new Date();
        state = { ...state };
    }
    return state;
}
const login = (state, action) => {
    state.estado = action.estado
    if (action.estado === "exito") {
        state.usuarioLog = action.data;
        SStorage.setItem("usr_log", JSON.stringify(action.data));
        state.login = action.data
    }
}
const getAll = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.data[action.cabecera] = action.data;
        SStorage.setItem("db_usuarios", JSON.stringify(state.data));
    }
}
const getById = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        if (!state.data[action.cabecera]) {
            state.data[action.cabecera] = {};
        }
        state.data[action.cabecera][action.key_usuario] = action.data;
    }
}
const editar = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        state.data[action.cabecera][action.data.key] = action.data;
    }
}
const registro = (state, action) => {
    state.estado = action.estado;
    if (action.estado === "exito") {
        // state.lastRegister = action.data;
        if (!state.data[action.cabecera]) {
            state.data[action.cabecera] = {};
        }
        state.data[action.cabecera][action.data.key] = action.data;
        console.log("SE REGISTRO EL USUARIO CON EXITO")

    }
    
}