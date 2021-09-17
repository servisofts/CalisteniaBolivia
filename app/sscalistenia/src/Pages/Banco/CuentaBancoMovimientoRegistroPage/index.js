import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Page from '../../../Component/Page/index';
import { SForm, SInput, SPopup, SPopupClose, SPopupOpen, SScrollView2 } from '../../../SComponent'
import { connect } from 'react-redux';
import AppParams from '../../../Params/index';
import FotoPerfilComponent from '../../../Component/FotoPerfilComponent/index';
import { SView } from '../../../SComponent/SView/index';
import CuentaBanco from '../CuentaBanco';
import TipoMovimiento from './TipoMovimiento';
import Sucursal from './Sucursal';
import BancoSelect from "../BancoSelect"
let ReducerName = "cuentaBancoMovimientoReducer";
let component = "cuentaBancoMovimiento";

class CuentaBancoMovimientoRegistroPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            cuenta: {
                descripcion: "Cuenta a transferir"
            },
            tipoSelect: "1"
        };
        this.key_banco = props.navigation.getParam("key_banco", null);
        this.key_cuenta_banco = props.navigation.getParam("key_cuenta_banco", null);
        // if (!key) {
        //     this.data = {};
        // } else {
        //     this.data = this.props.state["bancoReducer"].data[key];
        // }

    }
    getName() {
        switch (this.state.tipoSelect) {
            case "1": return "Ingreso";
            case "2": return "Egreso";
            case "3": return "Traspaso";
        }
        return "";
    }
    getBancoSelect() {
        if (this.state.tipoSelect != "3") {
            return <View />
        }
        return <>
            <SView col={"xs-12"} height={16}></SView>
            <SInput
                props={{
                    label: `${this.state.cuenta.descripcion}`,
                    type: "select",
                    customStyle: "calistenia",
                    isRequired: true,
                    placeholder: "Cuenta",
                    style: {
                        height: 50,
                    },
                    value: this.state.cuenta.codigo,
                    col: "xs-11 md-6 xl-4",
                    onPress: () => {
                        // if (this.props.preventEdit) return;
                        SPopupOpen({
                            key: "selectbanco",
                            content: <BancoSelect onSelect={(cuenta_banco) => {
                                SPopupClose("selectbanco");
                                // if (!this.props.preventEdit) {
                                //     if (!cuenta) {
                                //         Actions.SucursalTipoPagoCuentaBanco.registro({
                                //             key_sucursal: this.props.key_sucursal,
                                //             key_tipo_pago: obj.key,
                                //             key_cuenta_banco: cuenta_banco.key
                                //         }, this.props)
                                //     } else {
                                //         Actions.SucursalTipoPagoCuentaBanco.editar({
                                //             ...cuenta,
                                //             key_cuenta_banco: cuenta_banco.key
                                //         }, this.props)
                                //     }
                                // }

                                this.state.cuenta = cuenta_banco;
                                this.setState({ ...this.state });
                            }} />
                        })
                        // this.props.navigation.navigate("BancoPage", {
                        //     onSelect: (cuenta) => {

                        //     }
                        // });
                    },
                }} />
            <SView col={"xs-12"} height={16}></SView>
        </>
    }

    render() {
        var reducer = this.props.state[ReducerName]
        if (reducer.estado == "exito" && reducer.type == "registro") {
            reducer.estado = "";
            this.props.navigation.goBack();
        }
        if (reducer.estado == "exito" && reducer.type == "editar") {
            reducer.estado = "";
            this.props.navigation.goBack();
        }
        return (
            <Page title={"Nuevo Movimiento"}
                navigation={this.props.navigation}
            >
                <SScrollView2
                    style={{ width: "100%" }}
                    disableHorizontal
                >
                    <SView col={"xs-12"} center>

                        {/* <Sucursal navigation={this.props.navigation}
                            key_sucursal={this.state.key_sucursal}
                            sucursal={this.state.sucursal}
                            key_caja={this.state.key_caja}
                            setSucursal={(suc) => {
                                this.setState({ sucursal: suc, key_sucursal: suc.key });
                            }} /> */}

                        <TipoMovimiento value={this.state.tipoSelect} onChange={(tipo) => {
                            this.setState({ tipoSelect: tipo })
                        }} />
                        {this.getBancoSelect()}

                        <SForm
                            props={{
                                variant: "center",
                                col: "xs-11 md-6 xl-4",
                                // direction: "row",
                            }}
                            inputProps={{
                                customStyle: "calistenia",
                            }}
                            inputs={{
                                monto: {
                                    type: 'money',
                                    label: 'monto',
                                    placeholder: '0.00',
                                    isRequired: true,
                                    col: "xs-12",

                                },
                                descripcion: {
                                    type: 'text',
                                    label: 'motivo',
                                    isRequired: true,
                                    col: "xs-12",
                                    multiline: true,
                                    style: {
                                        height: 100
                                    }
                                },
                            }}
                            onSubmitProps={{
                                type: (this.state.tipoSelect != "1" ? "danger" : "success")
                            }}
                            onSubmit={(data) => {
                                if (this.state.tipoSelect == "3") {
                                    if(!this.state.cuenta.key){
                                        SPopup.alert("Seleccione la cuenta a transferir")
                                        return;
                                    }
                                    var object = {
                                        component: component,
                                        type: "traspaso",
                                        estado: "cargando",
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                        data: {
                                            ...data,
                                            tipo_movimiento:this.state.tipoSelect,
                                            key_cuenta_banco: this.key_cuenta_banco,
                                            key_cuenta_banco_to: this.state.cuenta.key,
                                            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                            monto: data.monto,
                                        },
                                    }
                                    this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                                    return;
                                }
                                var object = {
                                    component: component,
                                    type: "registro",
                                    estado: "cargando",
                                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                    data: {
                                        ...data,
                                        tipo_movimiento:this.state.tipoSelect,
                                        key_cuenta_banco: this.key_cuenta_banco,
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                        monto: data.monto * (this.state.tipoSelect != "1" ? -1 : 1),
                                    },
                                }
                                this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
                            }}
                            onSubmitName={this.getName()}
                        />
                    </SView>
                </SScrollView2>
            </Page>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CuentaBancoMovimientoRegistroPage);