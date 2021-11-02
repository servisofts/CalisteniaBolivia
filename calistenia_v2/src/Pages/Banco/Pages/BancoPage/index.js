import React, { Component } from 'react';
import { View, Text } from 'react-native';
import FloatButtom from '../../../../Components/FloatButtom/index';
import { connect } from 'react-redux';
import { SScrollView2, SView, SText, SImage, SPage, SNavigation, SIcon } from 'servisofts-component'
import CuentasLista from './CuentasLista';
import FechasBetween from '../../../../Components/FechasBetween';
import SSocket from 'servisofts-socket';
import BarraSuperior from '../../../../Components/BarraSuperior';
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
            SSocket.send({
                component: component,
                type: "getAll",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            })
            return <View />
        }

        var data = reducer.data;
        return Object.keys(data).map((key) => {
            var obj = data[key];
            return (
                <SView col={"xs-12"}>
                    <SView col={"xs-12"} key={obj.key} style={{
                        borderRadius: 4,
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
                                    <SImage src={SSocket.api.root + component + "_" + obj.key} />

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
                                {/* <SIcon name={"Ed"}/> */}
                                {/* <Svg name={"EditarOutline"} style={{
                                    width: 25,
                                    height: 25,
                                }} /> */}
                            </SView>
                        </SView>


                    </SView>
                    <SView col={"xs-12"} style={{
                    }}>
                        <CuentasLista data={obj} navigation={this.props.navigation} onBack={() => {
                            this.setState({ ...this.state })
                        }} />
                    </SView>
                    <SView height={32}/>
                </SView>
            );
        })

    }
    getAllMovimientosCuenta(force) {
        if (!this.props.state.cuentaBancoMovimientoReducer.data || force) {
            if (this.props.state.cuentaBancoMovimientoReducer.estado == "cargando" && !force) return;
            SSocket.send({
                component: "cuentaBancoMovimiento",
                type: "getAll",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            })
            return;
        }
        return;
    }
    render() {
        this.getAllMovimientosCuenta();
        return (
            <SPage
                hidden
            >
                <BarraSuperior
                    goBack={() => {
                        SNavigation.goBack();
                    }}
                    title={"Bancos"} />
                <SScrollView2 disableHorizontal style={{
                    width: "100%",
                }}>
                    <SView col={"xs-12"} center>
                        <SView col={"xs-11 md-7 xl-6"} center>
                            {/* <FechasBetween onChange={(fecha_incio, fecha_fin) => {
                                this.state.fecha_incio = fecha_incio;
                                this.state.fecha_fin = fecha_fin;
                                this.getAllMovimientosCuenta(true);
                            }} /> */}
                            {this.getAllBancos()}

                        </SView>
                    </SView>
                </SScrollView2>
                <FloatButtom label={"+"} onPress={() => {
                    this.props.navigation.navigate("BancoRegistroPage");
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(BancoPage);
