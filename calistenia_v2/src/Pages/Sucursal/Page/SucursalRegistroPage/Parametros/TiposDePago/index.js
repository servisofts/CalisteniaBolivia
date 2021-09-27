import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
// import TipoPago from '../../../../../TipoPago';
// import Actions from '../../../../Actions';
import { SInput, SPopup, SPopupClose, SPopupOpen, SText, SView } from 'servisofts-component';
import Sucursal from '../../../..';
import Banco from '../../../../../Banco';
import BancoSelect from '../../../../../Banco/Pages/BancoSelect';
import TipoPago from '../../../../../TipoPago';
type TiposDePagoType = {
    value: String,
    preventEdit: Boolean,
    onChange: (tipoPago) => {},
    movimientos?: any,
}
class TiposDePago extends Component<TiposDePagoType> {
    constructor(props) {
        super(props);
        this.state = {
            cuenta: {}
        };
    }
    getAll() {
        // var reducer = this.props.state.tipoPagoReducer;
        // var data = reducer.data;
        // if (!data) {
        //     if (reducer.estado == "cargando") return false;
        //     var object = {
        //         component: "tipoPago",
        //         type: "getAll",
        //         estado: "cargando",
        //         key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        //     }
        //     this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        //     return false;
        // }
        return TipoPago.Actions.getAll(this.props)
    }
    getMonto(obj) {
        var total = 0;
        if (!this.props.movimientos) {
            return <View />
        }

        Object.keys(this.props.movimientos).map((key) => {
            var mov = this.props.movimientos[key];
            if (mov.data.key_tipo_pago == obj.key) {
                total += mov.monto;
            }
        })
        return <SView style={{
            width: "100%",
            height: 50,
            backgroundColor: "#66000088",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
        }} >
            <SText>Bs. {total}</SText>
        </SView>
    }
    getLista() {
        var data = this.getAll();
        var sucursalTipoPagoCuentaBanco = Sucursal.SucursalTipoPagoCuentaBanco.getByKeySucursal(this.props.key_sucursal, this.props);
        var cuentaBanco = Banco.Actions.getAllCuentaBancos(this.props);
        if (!data) return <ActivityIndicator color={"#fff"} />
        if (!sucursalTipoPagoCuentaBanco) return <ActivityIndicator color={"#fff"} />
        if (!cuentaBanco) return <ActivityIndicator color={"#fff"} />

        return Object.keys(data).map((key) => {
            var obj = data[key];
            if (obj) {
                var Icono;
                Icono = TipoPago.Actions.getIcon(obj.key);
                if (!this.state.cuenta[key]) this.state.cuenta[key] = {};
                var cuenta = sucursalTipoPagoCuentaBanco[obj.key];
                if (cuenta) {
                    if (cuentaBanco[cuenta.key_cuenta_banco]) {
                        this.state.cuenta[key] = cuentaBanco[cuenta.key_cuenta_banco];
                    }
                }
                return <SView col={"xs-12"} row style={{
                }}>
                    <SView
                        col={"xs-3"}
                        center
                        style={{
                            height: 100,
                            // width: 100,
                        }}>
                        <SView
                            style={{
                                // width: "60%",
                                borderRadius: 4,
                            }}>
                            <SView width={40}>
                                {Icono}
                            </SView>
                        </SView>
                        <SView col={"xs-12"} center>
                            <SText style={{
                                color: "#fff",
                                textAlign: "center",
                                textTransform: "capitalize"
                            }} center>{obj.descripcion}</SText>

                        </SView>

                    </SView>
                    <SView flex style={{
                        height: "100%",
                    }}>
                        <SInput
                            editable={false}
                            value={this.state.cuenta[key].codigo}
                            props={{
                                label: `${this.state.cuenta[key].descripcion}`,
                                // type: "select",
                                customStyle: "calistenia",
                                isRequired: true,
                                placeholder: "Cuenta",
                                style: {
                                    height: 50,
                                },

                            }} onPress={() => {
                                if (this.props.preventEdit) return;
                                SPopupOpen({
                                    key: "selectbanco",
                                    content: <BancoSelect onSelect={(cuenta_banco) => {
                                        SPopupClose("selectbanco");
                                        if (!this.props.preventEdit) {
                                            if (!cuenta) {
                                                Sucursal.SucursalTipoPagoCuentaBanco.registro({
                                                    key_sucursal: this.props.key_sucursal,
                                                    key_tipo_pago: obj.key,
                                                    key_cuenta_banco: cuenta_banco.key
                                                }, this.props)
                                            } else {
                                                Sucursal.SucursalTipoPagoCuentaBanco.editar({
                                                    ...cuenta,
                                                    key_cuenta_banco: cuenta_banco.key
                                                }, this.props)
                                            }
                                        }

                                        this.state.cuenta[key] = cuenta_banco;
                                        this.setState({ ...this.state });
                                    }} />
                                })
                                // this.props.navigation.navigate("BancoPage", {
                                //     onSelect: (cuenta) => {

                                //     }
                                // });
                            }} />
                    </SView>
                    {/* <SView col={"xs-2"} center style={{
                        height: "100%",
                        paddingTop: 16,
                    }}>
                        {this.getMonto(obj)}
                    </SView> */}
                </SView>
            }
        })
    }
    render() {
        return (
            <SView
                col={"xs-11.8"}
                center>
                {this.getLista()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TiposDePago);