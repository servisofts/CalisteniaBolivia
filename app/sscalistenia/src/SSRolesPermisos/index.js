import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import AppParams from "../Params";
let INSTANCE = false;
export const SSRolesPermisosValidate = ({ page, permiso }) => {
    return INSTANCE.isValid({ page, permiso });
}
export const SSRolesPermisosGetPages = () => {
    return INSTANCE.getPages();
}

class SSRolesPermisos extends Component {
    constructor(props) {
        super(props);
    }
    getPages() {
        return this.permisos;
    }
    isValid({ page, permiso }) {
        // console.log("ENTRO IS VALID")
        if (!this.permisos) return false;
        var isValid = false;
        // console.log(this.permisos);
        // console.log(this.permisos[page]);
        if (!this.permisos[page]) {
            return false;
        }
        // Object.keys(this.permisos).map((key) => {
        //     var obj = this.permisos[key];
        //     console.log(key);
        // })
        return true;
    }
    getPermisos() {

    }
    render() {
        if (!this.props.state.socketReducer.session[AppParams.socket.name]) {
            console.log("No haysocket")
            return <View />
        }
        INSTANCE = this;
        if (!this.props.state.usuarioReducer.usuarioLog) {
            console.log("NO HAY USARIO")
            return <View />
        }
        var permisos = this.props.state.usuarioPageReducer.data;
        if (!permisos) {
            if (this.props.state.usuarioPageReducer.estado == "cargando") {
                console.log("CARGANDO PAGINAS")
                return <View />
            }
            var object = {
                component: "usuarioPage",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <View />
        }
        this.permisos = permisos;
        return <View />
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SSRolesPermisos);
