import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import AppParams from "../Params";
let INSTANCE = false;
const delay = ms => new Promise(res => setTimeout(res, ms));

export const SSRolesPermisosValidate = ({ page, permiso, isAlert }) => {
    var isValid = INSTANCE.isValid({ page, permiso });
    if (isAlert && !isValid) {
        alert("No tiene permisos. Contactese con el administrador.")
    }
    return isValid;
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
        if (!this.permisos[page].permisos[permiso]) {
            return false;
        }
        // Object.keys(this.permisos).map((key) => {
        //     var obj = this.permisos[key];
        //     console.log(key);
        // })
        return true;
    }
    getPermisos = async () => {
        // await delay(2000);
        var object = {
            component: "usuarioPage",
            type: "getAll",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key
        }
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
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
            this.getPermisos();
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
