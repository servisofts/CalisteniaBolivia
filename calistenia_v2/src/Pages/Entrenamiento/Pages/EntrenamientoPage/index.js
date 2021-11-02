import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Sucursal from './Sucursal';
import { SLoad, SPage, SText, SView, SStorage, SScrollView2, SNavigation } from 'servisofts-component';
import IniciarEntrenamiento from './IniciarEntrenamiento';
import Entrenamiento from './Entrenamiento';
import SSocket from 'servisofts-socket'
import BarraSuperior from '../../../../Components/BarraSuperior';

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
        SStorage.getItem("sucursal", (vl) => {
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
            SSocket.send(objSend);
            // this.props.state.socketReducer.session[AppParams.socket.name].send(objSend, true);
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
                    SStorage.setItem("sucursal", suc.key)
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
            <SPage title={"Entrenamiento"} hidden disableScroll>
                <BarraSuperior title={"Entrenamiento"} goBack={()=>{
                    SNavigation.goBack();
                }} />
                <SScrollView2 disableHorizontal>
                    {this.getComponent()}
                </SScrollView2>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EntrenamientoPage);