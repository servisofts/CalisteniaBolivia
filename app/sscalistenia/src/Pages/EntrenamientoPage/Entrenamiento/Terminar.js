import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../Params';
import { SButtom, SDate } from '../../../SComponent';
import Svg from '../../../Svg';

class Terminar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SButtom props={{
                variant: "confirm"
            }}
                style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#BD003C",
                    borderRadius: 4

                }}
                onPress={() => {
                    var objSend = {
                        component: "entrenamiento",
                        type: "editar",
                        estado: "cargando",
                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                        data: {
                            ...this.props.data,
                            estado: 0,
                            fecha_fin: new SDate().toString("yyyy-MM-dd hh:mm:ss")
                        }
                    }
                    this.props.state.socketReducer.session[AppParams.socket.name].send(objSend, true);
                }}>
                <Svg name={"Off"} style={{
                    width: 38,
                    height: 38,
                }} />
            </SButtom>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Terminar);