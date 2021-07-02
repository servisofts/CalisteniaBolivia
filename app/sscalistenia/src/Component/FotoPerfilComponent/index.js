
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../Params';
import * as SImageImput from '../SImageImput';
type tprop = {
    data: Object,
    component: String
}
class FotoPerfilComponent extends Component<tprop> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        var data = this.props.data;
        return (<TouchableOpacity style={{
            width: "90%",
            height: "90%",
            backgroundColor: "#ff999933",
            borderRadius: 8,
            overflow: "hidden",
        }} onPress={() => {
            SImageImput.choseFile({
                servicio: AppParams.socket.name,
                component: this.props.component,
                type: "subirFoto",
                estado: "cargando",
                key: data.key,
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }, (resp) => {
                this.props.dispatch({
                    component: "image",
                    type: "cambio",
                    url: AppParams.urlImages + this.props.component + "_" + data.key,
                })
                // this.state.repaint = new Date().getTime()
                // this.setState({ ...this.state });
            });
        }}>
            {/* {"foto"} */}
            {this.props.state.imageReducer.getImage(AppParams.urlImages + this.props.component + "_" + data.key, {
                width: "100%",
                height: "100%",
            })}

        </TouchableOpacity>
        )
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(FotoPerfilComponent);