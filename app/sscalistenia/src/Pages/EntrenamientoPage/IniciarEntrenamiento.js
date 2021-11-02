import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Params';
import { SText, SView, SButtom, SDate } from '../../SComponent';
import Reloj from './Reloj';

class IniciarEntrenamiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        if (!this.props.sucursal) {
            return (
                <SView col={"xs-12"} center>
                    <SText>{`Para iniciar el entrenamiento seleccion una sucursal.`}</SText>
                </SView>
            );
        }
        return (
            <SView col={"xs-12"} center>
                <SView col={"xs-11 md-8 xl-6"} center height={200} card>
                    <Reloj />
                    <SView height={16} />
                    <SButtom props={{
                        type: "danger",
                        variant: "confirm"
                    }} onPress={() => {
                        var objSend = {
                            component: "entrenamiento",
                            type: "registro",
                            estado: "cargando",
                            data: {
                                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                key_sucursal: this.props.sucursal.key,
                                fecha_inicio: new SDate().toString("yyyy-MM-dd hh:mm:ss"),
                            }
                        }
                        this.props.state.socketReducer.session[AppParams.socket.name].send(objSend, true);
                    }}>Entrenar</SButtom>
                    <SView height={4} />
                    <Text style={{ color: "#666", fontSize: 10, }}>{"Preciona el boton entrenar para iniciar un entrenamiento."}</Text>
                </SView>

            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(IniciarEntrenamiento);