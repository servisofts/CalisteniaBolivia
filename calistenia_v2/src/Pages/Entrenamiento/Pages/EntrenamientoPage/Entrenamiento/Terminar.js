import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SIcon, SButtom, SDate } from 'servisofts-component';
import SSocket from 'servisofts-socket'
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
                    height: 45,
                    backgroundColor: "#BD003C",
                    // borderRadius: 4
                    borderBottomRightRadius: 8,
                    borderBottomLeftRadius: 8,
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
                    SSocket.send(objSend);
                }}>
                <SIcon name={"Off"} height={30} />

            </SButtom>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Terminar);