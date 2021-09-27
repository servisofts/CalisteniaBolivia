import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import SSocket from 'servisofts-socket';
import Banco from '../../../../../../Banco';
import { SButtom, SInput, SPopup, SPopupClose, SPopupOpen, SText, SView } from 'servisofts-component';
import Sucursal from '../../../../../../Sucursal';
import TipoPago from '../../../../../../TipoPago';
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
            cantDecimal: 2,
            cuenta: {},
            montoASalvar: 200,
            total_salvar: {},
            total_depocito: {},
            enabledClose: true,
        };
    }
    getAll() {
        var reducer = this.props.state.tipoPagoReducer;
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return false;
            var object = {
                component: "tipoPago",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            SSocket.send(object);
            return false;
        }
        return data;
    }
    getMontoTotalEnDepocito() {
        var total = 0;
        if (!this.state.total_depocito) {
            return 0;
        }
        Object.keys(this.state.total_depocito).map((key) => {
            total += parseFloat(this.state.total_depocito[key]);
        })
        if (total % 1 > 0) return total.toFixed(this.state.cantDecimal);
        return total;
    }
    getMontoTotalSalvar() {
        var total = 0;
        if (!this.state.total_salvar) {
            return 0;
        }
        Object.keys(this.state.total_salvar).map((key) => {
            total += parseFloat(this.state.total_salvar[key]);
        })
        if (total % 1 > 0) return total.toFixed(this.state.cantDecimal);
        return total;
    }
    getMontoTotalEnCaja() {
        var total = 0;
        if (!this.props.movimientos) {
            return 0;
        }

        Object.keys(this.props.movimientos).map((key) => {
            var mov = this.props.movimientos[key];
            total += mov.monto;
        })
        if (total % 1 > 0) return total.toFixed(this.state.cantDecimal);
        return total;
    }
    getMonto(obj) {
        var total = 0;
        if (!this.props.movimientos) {
            return 0;
        }

        Object.keys(this.props.movimientos).map((key) => {
            var mov = this.props.movimientos[key];
            if (!mov.data) {
                if ("1" == obj.key) {
                    total += parseFloat(mov.monto);
                }
            } else {
                if (mov.data.key_tipo_pago == obj.key) {
                    total += parseFloat(mov.monto);
                }
            }

        })
        if (total % 1 > 0) return total.toFixed(this.state.cantDecimal);
        return total;
    }
    getEnabledClose() {
        if (!this.state.enabledClose) {
            return <SText>
                <Text>
                    {"No existen cuentas para esta sucursal."}
                </Text>
            </SText>
        }
        return <SButtom props={{
            type: "danger",
            variant: "confirm",
        }} onPress={() => {
            if (this.props.onPress) this.props.onPress(this.state.montoASalvar);
        }}>Cerrar</SButtom>
    }
    getDetallePago(obj) {
        if (obj.key == "2" || obj.key == "3" || obj.key == "4") {
            this.state.total_depocito[obj.key] = 0;
            if (obj.key == "4") {
                this.state.total_depocito[obj.key] = this.getMonto(obj);
            }
            return <SView col={"xs-12"} style={{
                justifyContent: "flex-end",
            }} row>
                <SView col={"xs-4"} center>
                    <SText style={{ fontSize: 16 }}>Bs. {this.getMonto(obj)}</SText>
                    <SText style={{ fontSize: 10, color: "#999" }}>{`Monto en caja`}</SText>
                </SView>
                <SView col={"xs-4"} center>
                </SView>
                <SView col={"xs-4"} center>
                    <SText style={{ fontSize: 16 }}>Bs. {this.state.total_depocito[obj.key]}</SText>
                    <SText style={{ fontSize: 10, color: "#999" }}>{`Monto a depocitar`}</SText>
                </SView>
            </SView>
        } else {
            var monto = this.getMonto(obj);
            var montoASalvar = this.state.montoASalvar;
            if (monto < montoASalvar) {
                montoASalvar = monto;
            }

            this.state.total_salvar[obj.key] = montoASalvar;
            this.state.total_depocito[obj.key] = monto - montoASalvar;
            if (this.state.total_depocito[obj.key] % 1 > 0) {
                this.state.total_depocito[obj.key] = this.state.total_depocito[obj.key].toFixed(this.state.cantDecimal);
            }
            return <SView col={"xs-12"} style={{
                justifyContent: "flex-end",
            }} row>
                <SView col={"xs-4"} center>
                    <SText style={{ fontSize: 16 }}>Bs. {monto}</SText>
                    <SText style={{ fontSize: 10, color: "#999" }}>{`Monto en caja`}</SText>
                </SView>
                <SView col={"xs-4"} center>
                    <SText style={{ fontSize: 16 }}>Bs. {montoASalvar}</SText>
                    <SText style={{ fontSize: 10, color: "#999" }}>{`Monto a salvar`}</SText>
                </SView>
                <SView col={"xs-4"} center>
                    <SText style={{ fontSize: 16 }}>Bs. {this.state.total_depocito[obj.key]}</SText>
                    <SText style={{ fontSize: 10, color: "#999" }}>{`Monto a depocitar`}</SText>
                </SView>
            </SView>
        }

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
                if (obj.key == "2") return <View />
                if (obj.key == "3") return <View />
                Icono = TipoPago.Actions.getIcon(obj.key);

                if (!this.state.cuenta[key]) this.state.cuenta[key] = {};
                var cuenta = sucursalTipoPagoCuentaBanco[obj.key];
                if (cuenta) {
                    if (cuentaBanco[cuenta.key_cuenta_banco]) {
                        this.state.cuenta[key] = cuentaBanco[cuenta.key_cuenta_banco];
                        if (!cuentaBanco[cuenta.key_cuenta_banco]) {
                            this.state.enabledClose = false;
                        }
                    }
                }
                return <SView col={"xs-12"} >
                    <SView col={"xs-12"} row style={{
                    }}>

                        <SView col="xs-3 md-2" center style={{
                            height: 95,
                        }}>
                            <SView
                                center
                                style={{
                                    padding: 0,
                                    margin: 0,
                                    width: "60%",
                                    height: "60%",
                                    borderRadius: 4,
                                    // backgroundColor: "#66000044"
                                }}>
                                {Icono}
                            </SView>
                            <SText style={{
                                color: "#fff",
                                textAlign: "center",
                                textTransform: "capitalize"
                            }}>{obj.descripcion}</SText>
                        </SView>
                        <SView flex style={{
                            height: "100%",
                        }}>
                            {/* 
                        ${this.state.cuenta[key].descripcion} 
                        ${this.state.cuenta[key].codigo} 
                        */}
                            <SText style={{ fontSize: 14 }}>{`${this.state.cuenta[key].codigo}`}</SText>
                            <SText style={{ fontSize: 10 }}>{`${this.state.cuenta[key].descripcion}`}</SText>
                            <SView col={"xs-12"} style={{
                                height: 50,
                                justifyContent: "flex-end"
                            }} >
                                {this.getDetallePago(obj)}
                            </SView>
                        </SView>
                        {/* <SView col={"xs-2"} center style={{
                        height: "100%",
                        paddingTop: 16,
                    }}>
                        <SView style={{
                            width: "100%",
                            height: 50,
                            backgroundColor: "#66000088",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 4,
                        }} >
                            <SText>Bs. {this.getMonto(obj)}</SText>
                        </SView>

                    </SView> */}

                    </SView>
                    <SView col={"xs-12"} style={{ height: 16, borderTopWidth: 1, borderColor: "#66666644" }} />
                </SView>
            }
        })
    }
    render() {
        var totalCaja = this.getMontoTotalEnCaja();
        if (this.state.montoASalvar > totalCaja) {
            this.state.montoASalvar = totalCaja;
        }
        return (
            <SView col={"xs-11.8"} center >
                {this.getLista()}

                < SView col={"xs-12"} >
                    <SView col={"xs-12"} row style={{
                    }}>
                        <SView col="xs-3 md-2" center style={{
                            height: "100%",
                        }}>
                            <SText style={{ fontSize: 20 }}>Total</SText>
                        </SView>
                        <SView flex style={{
                            height: "100%",
                        }}>

                            <SView col={"xs-12"} style={{
                                height: 50,
                                justifyContent: "center"
                            }} >
                                <SView col={"xs-12"} style={{
                                    justifyContent: "center",
                                }} row>
                                    <SView col={"xs-4"} center>
                                        <SText style={{ fontSize: 16 }}>Bs. {this.getMontoTotalEnCaja()}</SText>
                                        <SText style={{ fontSize: 10, color: "#999" }}>{`Total en caja`}</SText>
                                    </SView>
                                    <SView col={"xs-4"} center>
                                        <SInput props={{
                                            type: "money",
                                            col: "xs-12",
                                        }}
                                            style={{
                                                height: 30,
                                                borderWidth: 1,
                                                borderColor:"#666",
                                                borderRadius:4,
                                            }}
                                            onChangeText={(e) => {
                                                if (e > totalCaja) {
                                                    this.setState({ montoASalvar: totalCaja })
                                                    return;
                                                }
                                                this.setState({ montoASalvar: e })
                                            }}
                                            value={this.state.montoASalvar + ""} />
                                        {/* <SText style={{ fontSize: 16 }}>Bs. {}</SText> */}
                                        <SView height={20}>
                                            <SText style={{ fontSize: 10, color: "#999" }}>{`Total a salvar`}</SText>
                                        </SView>
                                    </SView>
                                    <SView col={"xs-4"} center>
                                        <SText style={{ fontSize: 16 }}>Bs. {this.getMontoTotalEnDepocito()}</SText>
                                        <SText style={{ fontSize: 10, color: "#999" }}>{`Total a depocitar`}</SText>
                                    </SView>
                                </SView>
                            </SView>
                        </SView>
                    </SView>
                    <SView col={"xs-12"} style={{ height: 16, borderTopWidth: 1, borderColor: "#66666644" }} />

                    <SView col={"xs-12"} center style={{
                        height: 80,
                    }}>
                        {this.getEnabledClose()}

                    </SView>
                    <SView col={"xs-12"} center height={16} />
                    <SView col={"xs-12"} center>
                        <SView col={"xs-11.5"} center>
                            <SText style={{ fontSize: 10, color: "#999", textAlign: "center" }}>{`Total en caja: Es el monto que debería tener en su caja contando el valor de los cheques.`}</SText>
                            <SView col={"xs-12"} center height={8} />
                            <SText style={{ fontSize: 10, color: "#999", textAlign: "center" }}>{`Total a salvar: Es el monto que se dejara en caja para realizar la siguiente apertura.`}</SText>
                            <SView col={"xs-12"} center height={8} />
                            <SText style={{ fontSize: 10, color: "#999", textAlign: "center" }}>{`Total a depositar: Es el monto que se debería depositar a la cuenta de banco una vez se cierra la caja.`}</SText>
                        </SView>
                    </SView>
                </SView >
            </SView >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TiposDePago);