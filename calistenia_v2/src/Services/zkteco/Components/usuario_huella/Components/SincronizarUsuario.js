import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from ".."
import SSocket from "servisofts-socket"
import dispositivo from '../../dispositivo';
class SincronizarUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SButtom type='danger' onPress={() => {
                SSocket.send({
                    servicio: "zkteco",
                    component: "zkteco",
                    type: "sincronizarUsuario",
                    estado: "cargando",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    data: {
                        key_usuario: this.key_usuario,
                        key_sucursal: this.key_sucursal,
                    }
                })
            }}>SINCRONIZAR</SButtom>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SincronizarUsuario);