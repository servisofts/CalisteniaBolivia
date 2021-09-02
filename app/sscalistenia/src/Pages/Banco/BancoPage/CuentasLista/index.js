import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SView, SText } from '../../../../SComponent';
import AppParams from '../../../../Params/index';
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
    getAll = () => {
        var reducer = this.props.state.cuentaBancoReducer;
        var keyBanco = this.props.data.key;
        if (!reducer.data[keyBanco]) {
            if (reducer.estado == "cargando") {
                return <Text>Cargando</Text>;
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send({
                component: component,
                type: "getAll",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key_banco: this.props.data.key,
                estado: "cargando"
            }, true);
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
                <SView col={"xs-12"} key={obj.key} style={{
                    marginBottom: 8,
                }} onPress={() => {
                    if (this.props.onSelect) {
                        this.props.onSelect(obj);
                        return;
                    }
                    this.props.navigation.navigate("CuentaMovimientosPage", { key_banco: this.props.data.key, key: obj.key, onBack: () => {
                            if(this.props.onBack){
                                this.props.onBack();
                            }
                    } });
                }}>
                    <SView style={{
                        width: "100%",
                        height: 250,
                        borderRadius: 4,
                        backgroundColor: "#66000044",
                    }}>
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
                                }} >{obj.descripcion}</SText>
                                <SText style={{
                                    fontSize: 10,
                                }} >{obj.codigo}</SText>
                            </SView>

                        </SView>
                        <SView col={"xs-12"} style={{
                            flex: 1,
                        }}>
                            <MovimientosGraphic data={this.getMovimientos( obj.key )} />
                        </SView>
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
                marginBottom: 32,
            }}>
                {this.getAll()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CuentasLista);