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
        state.all = true;
        Object.keys(action.data).map(key => {
            var obj = action.data[key];
            state.data[key] = obj;
        })
    }
}

