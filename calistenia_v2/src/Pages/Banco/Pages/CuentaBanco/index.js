import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SView, SText, SImage, STheme, SLoad } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Sucursal from '../../../Sucursal';
import sucursal_usuario from '../../../sucursal_usuario';
// import  from '../../../Params/index';
let component = "cuentaBanco";

class CuentaBanco extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getAll = () => {
        var reducer = this.props.state.cuentaBancoReducer;
        var keyBanco = this.props.data.key;
        var data_sucursal_cuenta = Sucursal.SucursalTipoPagoCuentaBanco.getAll(this.props);
        if (!reducer.data[keyBanco]) {
            if (reducer.estado == "cargando") {
                return <Text>Cargando</Text>;
            }
            SSocket.send({
                component: component,
                type: "getAllByKeyBanco",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key_banco: this.props.data.key,
                estado: "cargando"
            })
            return <View />
        }
        if (!data_sucursal_cuenta) return <SLoad />
        var data = reducer.data[keyBanco];
        return Object.keys(data).map((key) => {
            var obj = data[key];
            if (obj.estado == 0) return <View />
            var arr_active = Object.values(data_sucursal_cuenta).filter(i => i.key_cuenta_banco == obj.key);
            var isActive = false;
            arr_active.map((itm) => {
                if (!isActive) {
                    isActive = sucursal_usuario.Actions.isActive(itm.key_sucursal, this.props);
                }
            })
            console.log(arr_active)
            if (arr_active.length > 0) {
                if (!isActive) {
                    // return null;
                }
            }
            return (
                <SView key={obj.key} col={"xs-12"} style={{
                    // paddingBottom: 8,
                    paddingTop: 8,
                }}>
                    <SView col={"xs-12"} style={{
                        height: 60,
                        borderRadius: 4,
                        backgroundColor: STheme.color.card,
                    }} onPress={() => {
                        this.props.navigation.navigate("CuentaBancoRegistroPage", { key_banco: this.props.data.key, key: obj.key });
                    }} row>
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
                            justifyContent: "center",
                        }}>
                            <SText style={{
                                fontSize: 16,
                            }} >{obj.descripcion}</SText>
                            <SText style={{
                            }} >{obj.codigo}</SText>
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
        if (!this.props.data.key) {
            return <View />
        }

        return (
            <SView col={"xs-12"} center style={{
                paddingTop: 8,
            }}>
                <SView col={"xs-12 md-7 xl-6"} center style={{

                }}>
                    <SView col={"xs-12"} style={{
                        height: 60,
                        borderRadius: 4,
                        backgroundColor: STheme.color.card,
                    }} onPress={() => {
                        this.props.navigation.navigate("CuentaBancoRegistroPage", { key_banco: this.props.data.key });
                    }} center>
                        <SText>Nueva cuenta</SText>
                    </SView>
                    {this.getAll()}
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CuentaBanco);