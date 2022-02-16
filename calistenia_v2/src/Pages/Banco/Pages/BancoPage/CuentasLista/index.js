import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import SSocket from 'servisofts-socket';
import { SView, SText, STheme, SHr } from 'servisofts-component';
import MovimientosGraphic from './MovimientosGraphic';
let component = "cuentaBanco";

class CuentasLista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getMovimientos(key_cuenta_banco) {
        var reducer = this.props.state["cuentaBancoMovimientoReducer"];
        if (!reducer.data[key_cuenta_banco]) {
            return;
        }
        return reducer.data[key_cuenta_banco];
    }
    getAllMontoCuenta = (key_cuenta_banco) => {
        var movimientos = this.getMovimientos(key_cuenta_banco);
        if (!movimientos) {
            return 0;
        }
        var monto = 0;
        Object.keys(movimientos).map((key) => {
            monto += movimientos[key].monto;
        })
        if (monto % 1 > 0) monto = monto.toFixed(2);
        return monto;
    }
    getAll = () => {
        var reducer = this.props.state.cuentaBancoReducer;
        var keyBanco = this.props.data.key;
        if (!reducer.data[keyBanco]) {
            if (reducer.estado == "cargando") {
                return <Text>Cargando</Text>;
            }
            SSocket.send({
                component: component,
                type: "getAll",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key_banco: this.props.data.key,
                estado: "cargando"
            })
            return <Text></Text>;
        }

        var data = reducer.data[keyBanco];
        if (!data) {
            return <Text></Text>;
        }
        return Object.keys(data).map((key) => {
            var obj = data[key];
            if (obj.estado == 0) return <View />
            return (
                <SView col={"xs-12"} key={obj.key} center style={{
                    paddingTop: 4,
                    paddingBottom: 4,
                }} onPress={() => {
                    if (this.props.onSelect) {
                        this.props.onSelect(obj);
                        return;
                    }
                    this.props.navigation.navigate("CuentaMovimientosPage", {
                        key_banco: this.props.data.key, key: obj.key
                    });
                }}>
                    <SView col={"xs-11.8"} style={{
                        height: 60,
                    }} center card>
                        <SView style={{
                            width: "100%",
                        }} row>
                            <SView style={{
                                flex: 1,
                                height: "100%",
                                justifyContent: "center",
                                paddingStart: 4,
                                // alignItems: "center",
                            }}>
                                <SText style={{
                                    fontSize: 16,
                                }} >{obj.codigo}</SText>
                                <SText style={{
                                    color: "#999"
                                }} >{obj.descripcion}</SText>

                            </SView>
                            <SView style={{
                                height: "100%",
                                justifyContent: "center",
                                paddingStart: 4,
                                paddingEnd: 4,
                                // alignItems: "center",
                            }}>
                                <SView card style={{
                                    padding: 4,
                                }}>
                                    <SText style={{
                                    }} >{`Bs. ${this.getAllMontoCuenta(obj.key)}`}</SText>
                                </SView>

                            </SView>
                        </SView>
                        {/* <SView col={"xs-12"} style={{
                            flex: 1,
                        }}>
                            <MovimientosGraphic data={this.getMovimientos(obj.key)} />
                        </SView> */}
                    </SView>

                </SView>
            );
        })

    }
    render() {
        if (!this.props.data) {
            return <View />
        }

        return (
            <SView col={"xs-12"} center row style={{
                // marginBottom: 32,
            }}>
                <SHr />
                {this.getAll()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CuentasLista);