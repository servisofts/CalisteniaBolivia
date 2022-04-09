import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from ".."
import SSocket from 'servisofts-socket';
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_usuario = SNavigation.getParam("key_usuario");
        this.key_sucursal = SNavigation.getParam("key_sucursal");
    }


    render() {
        return (
            <SPage title={'Lista de ' + Parent.component} disableScroll>
                <SView row>
                    <SButtom type={"outline"} onPress={() => {
                        Parent.Actions.solicitudRegistroHuella({
                            key_usuario: this.key_usuario,
                            key_sucursal: this.key_sucursal,
                            codigo: 1,
                        }, this.props);
                    }}>PEDIR HUELLA</SButtom>
                    <SView width={16} />
                    <SButtom type={"outline"} onPress={() => {
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
                    }}>SINCRONIZAR USUARIO</SButtom>
                    <SView width={16} />

                    <SButtom type={"danger"} onPress={() => {
                        SSocket.send({
                            servicio: "zkteco",
                            component: "zkteco",
                            type: "sincronizarAll",
                            estado: "cargando",
                            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                        })
                    }} >SINCRONIZAR ALL</SButtom>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);