import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SPage, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import RolDeUsuario from '../Usuario/Page/RolDeUsuario';
class MisRoles extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getLista = () => {
        var reducer = this.props.state.rolReducer;
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") {
                return null;
            }
            var object = {
                service: "roles_permisos",
                component: "rol",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            SSocket.send(object)
            return null;
        }
        return data;
    }
    render() {
        var key_usuario = this.props.state.usuarioReducer.usuarioLog.key;
        var roles_usr = this.props.state.usuarioRolReducer.usuario[key_usuario];
        var roles = this.getLista();
        if (!roles_usr) return <SLoad />;
        if (!roles) return <SLoad />;
        return (
            <SView col={"xs-12"}>
                <RolDeUsuario data={{ key: key_usuario }} preventEdit={true} title={"Mis perfiles"} />
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(MisRoles);