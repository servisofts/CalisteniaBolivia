import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import AppParams from '../../Params';
import Svg from '../../Svg';
import FilePreview from '../CarpetasPage/FilePreview';
import * as SImageImput from '.././../Component/SImageImput';
import { connect } from 'react-redux';
import moment from 'moment';
import SImage from '../../Component/SImage';
import Cronometro from './Cronometro';
import Sucursal from './Sucursal';
import * as SSStorage from '../../SSStorage';
import Page from '../../Component/Page';
import { SView } from '../../SComponent';


class EntrenamientoPage extends Component {
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
        SSStorage.getItem("sucursal", (vl) => {
            this.setState({ key_sucursal: vl });
        })

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
                        SImageImput.choseFile({
                            servicio: AppParams.socket.name,
                            component: "usuario",
                            type: "subirFoto",
                            estado: "cargando",
                            key: usuario.key,
                            key_usuario: usuario.key,
                        }, (resp) => {
                            this.props.dispatch({
                                component: "image",
                                type: "cambio",
                                url: AppParams.urlImages + "usuario_" + this.props.state.usuarioReducer.usuarioLog.key,
                            })
                            // this.state.repaint = new Date().getTime()
                            // this.setState({ ...this.state });
                        });
                    }}>
                        {/* {"foto"} */}
                        {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + this.props.state.usuarioReducer.usuarioLog.key, {
                            width: "100%",
                            height: "100%",
                        })}

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
                    </View>
                </View>
            </View>
        )
    }
    getBtnEntrenar() {
        return <TouchableOpacity style={{
            width: 100,
            height: 50,
        }} onPress={() => {
            this.props.navigation.navigate("EntrenamientoRegistroPage");
        }}>
            <Text style={{
                color: "#fff"
            }}>Nuevo entrenamiento</Text>
        </TouchableOpacity>
    }
    render() {

        return (
            <Page navigation={this.props.navigation} title={"Entrenamiento"}>
                <SView center col={"xs-12"}>
                    <SView height={8}/>
                    <Sucursal
                        navigation={this.props.navigation}
                        key_sucursal={this.state.key_sucursal}
                        sucursal={this.state.sucursal}
                        key_caja={this.state.key_caja}
                        setSucursal={(suc) => {
                            SSStorage.setItem("sucursal", suc.key)
                            this.setState({ sucursal: suc, key_sucursal: suc.key });
                        }}
                    />
                    <SView height={16}/>
                    <Cronometro />
                    {/* {this.getBtnEntrenar()} */}
                </SView>
            </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EntrenamientoPage);