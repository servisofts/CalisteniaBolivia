import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Page from '../../../Component/Page';
import FloatButtom from '../../../Component/FloatButtom/index';
import { connect } from 'react-redux';
import AppParams from '../../../Params/index';
import { SScrollView2, SView } from '../../../SComponent';
import { SText } from '../../../SComponent/SText/index';
import CuentasLista from './CuentasLista';
import Svg from '../../../Svg';
import FechasBetween from '../../../Component/FechasBetween';
let component = "banco";

class BancoPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getAllBancos = () => {
        var reducer = this.props.state.bancoReducer;
        if (!reducer.data) {
            if (reducer.estado == "cargando") {
                return <Text>Carfando</Text>;
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send({
                component: component,
                type: "getAll",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            }, true);
            return <View />
        }

        var data = reducer.data;
        return Object.keys(data).map((key) => {
            var obj = data[key];
            return (
                <>
                    <SView col={"xs-12"} key={obj.key} style={{
                        borderRadius: 4,
                        marginBottom: 8,
                        backgroundColor: "#66000044",
                    }} onPress={() => {
                        this.props.navigation.navigate("BancoRegistroPage", { key: obj.key });
                    }} row>
                        <SView col={"xs-12"} row style={{
                            height: 60,
                        }}>
                            <SView style={{
                                width: 60,
                                height: 60,
                            }} center>
                                <SView style={{
                                    width: 45,
                                    height: 45,
                                    borderRadius: 8,
                                    overflow: "hidden"
                                }}>
                                    {this.props.state.imageReducer.getImage(AppParams.urlImages + component + "_" + obj.key, {
                                    })}
                                </SView>

                            </SView>
                            <SView style={{
                                height: "100%",
                                flex: 1,
                                justifyContent: "center",
                            }}>
                                <SText style={{
                                    fontSize: 16,
                                }} >{obj.descripcion}</SText>
                            </SView>
                            <SView style={{
                                width: 60,
                                height: 60,
                            }} center>
                                <Svg name={"EditarOutline"} style={{
                                    width: 25,
                                    height: 25,
                                }} />
                            </SView>
                        </SView>


                    </SView>
                    <SView col={"xs-12"} style={{
                    }}>
                        <CuentasLista data={obj} navigation={this.props.navigation} onBack={()=>{
                            this.setState({...this.state})
                        }} />
                    </SView>
                </>
            );
        })

    }
    getAllMovimientosCuenta(force) {
        if (!this.state.fecha_incio || !this.state.fecha_fin) return;
        if (!this.props.state.cuentaBancoMovimientoReducer.data || force) {
            if (this.props.state.cuentaBancoMovimientoReducer.estado == "cargando" && !force) return;
            this.props.state.socketReducer.session[AppParams.socket.name].send({
                component: "cuentaBancoMovimiento",
                type: "getAll",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                fecha_inicio: this.state.fecha_incio,
                fecha_fin: this.state.fecha_fin,
                estado: "cargando"
            }, true);
            return;
        }
        return;
    }
    render() {
        this.getAllMovimientosCuenta();
        return (
            <Page
                navigation={this.props.navigation}
                title={"Bancos"}>

                <SScrollView2 disableHorizontal style={{
                    width: "100%",
                }}>
                    <SView col={"xs-12"} center>
                        <SView col={"xs-11 md-7 xl-6"} center>
                            <FechasBetween onChange={(fecha_incio, fecha_fin) => {
                                this.state.fecha_incio = fecha_incio;
                                this.state.fecha_fin = fecha_fin;
                                this.getAllMovimientosCuenta(true);
                            }} />
                            {this.getAllBancos()}

                        </SView>
                    </SView>
                </SScrollView2>
                <FloatButtom label={"+"} onPress={() => {
                    this.props.navigation.navigate("BancoRegistroPage");
                }} />
            </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(BancoPage);
