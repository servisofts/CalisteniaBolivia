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
import { SLoad, SText, SView } from '../../SComponent';
import IniciarEntrenamiento from './IniciarEntrenamiento';
import Entrenamiento from './Entrenamiento';


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
        SSStorage.getItem("sucursal", (vl) => {
            this.setState({ key_sucursal: vl });
        })

    }
    getEntrenamientoUsuario() {
        var reducer = this.props.state.entrenamientoReducer;
        var data = reducer.entrenamiento;
        if (!data) {
            if (reducer.estado == "cargando") return;
            var objSend = {
                component: "entrenamiento",
                type: "getByKeyUsuario",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(objSend, true);
            return;
        }
        return data;
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
    getEntrenamiento(entrenamiento) {
        return <>
            <Entrenamiento data={entrenamiento} />
        </>
    }
    getIniciar() {
        return <SView center col={"xs-12"}>
            <SView height={8} />
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
            <SView height={16} />
            {/* <Cronometro /> */}
            <IniciarEntrenamiento sucursal={this.state.sucursal} />

        </SView>
    }
    getComponent() {
        var entrenamiento = this.getEntrenamientoUsuario();
        if (!entrenamiento) {
            return <SLoad />
        }
        if (!entrenamiento.key) {
            return this.getIniciar();
        } else {
            return this.getEntrenamiento(entrenamiento);
        }
    }

    render() {

        return (
            <Page navigation={this.props.navigation} title={"Entrenamiento"} >
                {this.getComponent()}
            </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EntrenamientoPage);