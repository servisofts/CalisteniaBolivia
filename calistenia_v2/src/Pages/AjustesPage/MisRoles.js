import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SPage, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Model from '../../Model';
import RolDeUsuario from '../Usuario/Page/RolDeUsuario';
class MisRoles extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        var key_usuario = Model.usuario.Action.getKey();
        var roles_usr = Model.usuarioRol.Action.getAllByKeyUsuario(key_usuario);
        var roles = Model.rol.Action.getAll();
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