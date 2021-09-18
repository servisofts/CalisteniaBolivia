import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { SDate, SImage, SNavigation, SPage } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BarraSuperior from '../../../../Components/BarraSuperior';
import CerrarSession from './CerrarSession';

// import AppParams from '../../Params';
// import FilePreview from '../CarpetasPage/FilePreview';
// import * as SImageImput from '.././../Component/SImageImput';
// import moment from 'moment';
// import SImage from '../../Component/SImage';
// import CerrarSession from './CerrarSession';


class Perfil extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        // this.props.dispatch({
        //     component: "image",
        //     type: "cambio",
        //     url: AppParams.urlImages + "usuario_" + this.props.state.usuarioReducer.usuarioLog.key,
        // })
    }
    getPerfil() {
        var usuario = this.props.state.usuarioReducer.usuarioLog
        return (
            <View style={{
                width: "95%",
                height: 130,
                borderBottomWidth: 1,
                borderColor: "#aaa",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row"
            }}>
                <View style={{
                    width: 100,
                    height: 100,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <TouchableOpacity style={{
                        width: "90%",
                        height: "90%",
                        backgroundColor: "#66000022",
                        borderRadius: 8,
                        overflow: "hidden",
                    }} onPress={() => {
                        // SImageImput.choseFile({
                        //     servicio: AppParams.socket.name,
                        //     component: "usuario",
                        //     type: "subirFoto",
                        //     estado: "cargando",
                        //     key: usuario.key,
                        //     key_usuario: usuario.key,
                        // }, (resp) => {
                        //     this.props.dispatch({
                        //         component: "image",
                        //         type: "cambio",
                        //         url: AppParams.urlImages + "usuario_" + this.props.state.usuarioReducer.usuarioLog.key,
                        //     })
                        // });
                    }}>
                        <SImage src={`${SSocket.api.root}${"usuario_" + this.props.state.usuarioReducer.usuarioLog.key}`} style={{
                            width: "100%",
                            height: "100%",
                        }} />


                    </TouchableOpacity>
                </View>
                <View style={{
                    flex: 1,
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                    // backgroundColor:"#000"
                }}>
                    <View style={{
                        width: "95%",
                        flex: 1,
                        alignItems: "center",
                        flexDirection: "row"
                    }}>
                        <Text style={{
                            flex: 5,
                            fontSize: 20,
                            fontWeight: "bold",
                            color: "#fff"
                        }}>{usuario["Nombres"] + " " + usuario["Apellidos"]} </Text>
                    </View>
                    <View style={{
                        width: "95%",
                        flex: 1,
                    }}>
                        <Text style={{
                            width: "90%",
                            fontSize: 14,
                            color: "#bbb"
                        }}>{usuario["Correo"]} </Text>
                        <Text style={{
                            width: "90%",
                            fontSize: 14,
                            color: "#bbb"
                        }}>{usuario["Telefono"]} </Text>
                        <Text style={{
                            width: "90%",
                            fontSize: 10,
                            color: "#bbb"
                        }}>Fecha de registro: {new SDate(usuario.fecha_on).toString("dd/MM/yyyy")} </Text>
                    </View>
                </View>
            </View>
        )
    }
    render() {

        return (
            <SPage hidden>
                <BarraSuperior duration={500} title={"Perfil de usuario"} goBack={() => {
                    SNavigation.goBack()
                }} />
                <View style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "#000"
                }}>
                    <View style={{
                        width: "90%",
                        borderRadius: 8,
                        height: "90%",
                        maxWidth: 500,
                        backgroundColor: "#66000022",
                        alignItems: "center"
                    }}>
                        {this.getPerfil()}
                        <CerrarSession  />
                    </View>
                </View>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Perfil);