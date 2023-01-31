import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SImage, SLoad, SMath, SNavigation, SOrdenador, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import TipoPago from '../../TipoPago';
import Usuario from '../../Usuario';
import Caja from ".."
import Sucursal from '../../Sucursal';
class Recibo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getNombreUsuario(key_usuario) {
        var usuario = Usuario.Actions.getByKey(key_usuario, this.props);
        if (!usuario) return null;
        return usuario.Nombres + " " + usuario.Apellidos;
    }
    getCajaTipoMovimientos() {
        var reducer = this.props.state.cajaTipoMovimientoReducer;
        var data = reducer.data;
        if (!data) {
            if (reducer.estado == "cargando") return false;
            if (reducer.estado == "error") return false;
            SSocket.send({
                component: "cajaTipoMovimiento",
                type: "getAll",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            }, true);
            return false;
        }
        return data;
    }
    getMovimientos(key_caja) {
        var reducer = this.props.state.cajaMovimientoReducer;
        var data = reducer.data[key_caja];
        if (!data) {
            if (reducer.estado == "cargando") return false;
            if (reducer.estado == "error") return false;
            SSocket.send({
                component: "cajaMovimiento",
                type: "getByKeyCaja",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key_caja: key_caja,
                estado: "cargando"
            }, true);
            return false;
        }
        return data;
    }
    getDetalleCaja() {
        var movimientos = this.getMovimientos(this.props.key_caja);
        if (!movimientos) return <SLoad />;
        var tipoMovimientos = this.getCajaTipoMovimientos();
        if (!tipoMovimientos) return <SLoad />

        return new SOrdenador([{ key: "fecha_on", order: "desc", peso: 1 }]).ordernarObject(movimientos).map((key, index) => {
            var obj = movimientos[key];
            var tipo_mov = tipoMovimientos[obj.key_caja_tipo_movimiento];
            if (obj.descripcion == "Transferencia por cierre") {
                return;
            }
            if (obj.descripcion == "Transferencia por apertura") {
                return;
            }
            return <>
                <SHr />
                <SView row col={"xs-12"}>
                    <SView flex>
                        <SText color={STheme.color.lightBlack}>{new SDate(obj.fecha_on).toString("hh:mm")}</SText>
                        <SText color={STheme.color.lightBlack} bold>{obj.descripcion}</SText>
                        <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto"} >{this.getNombreUsuario(obj.data.key_usuario)}</SText>
                        {/* <SText color={STheme.color.lightBlack}>{tipo_mov.descripcion}</SText> */}
                    </SView>
                    <SView width={100} style={{

                    }} >
                        <SText color={STheme.color.lightBlack} bold>{TipoPago.Actions.getName(obj.key_tipo_pago)}</SText>
                    </SView>
                    <SView width={80} style={{
                        alignItems: "flex-end",
                    }}>
                        <SText color={obj.monto > 0 ? STheme.color.lightBlack : "#990000"} bold>{obj.monto > 0 ? "  " : ""}{SMath.formatMoney(obj.monto)}</SText>
                    </SView>

                </SView>
                <SHr />
                <SHr />
            </>
        });
    }
    getTotales() {
        var movimientos = this.getMovimientos(this.props.key_caja);
        if (!movimientos) return <SLoad />;
        var total = 0;
        var monto_enviado_a_bancos;
        Object.keys(movimientos).map((key) => {
            let obj = movimientos[key];
            if (obj.descripcion == "Transferencia por cierre") {
                monto_enviado_a_bancos = obj;
                return;
            }
            if (obj.descripcion == "Transferencia por apertura") {
                return;
            }
            total += obj.monto;
        })
        return <SView col={"xs-12"} >
            <SView col={"xs-12"} row>
                <SView flex>
                    <SText color={STheme.color.lightBlack}  >Saldo</SText>
                </SView>
                <SView row>
                    <SText color={STheme.color.lightBlack} bold>{SMath.formatMoney(total)}</SText>
                </SView>
            </SView>
            {monto_enviado_a_bancos ? <SView col={"xs-12"} row>
                <SView flex>
                    <SText color={"#990000"}  >Monto enviado a bancos</SText>
                </SView>
                <SView row>
                    <SText color={"#990000"} bold style={{
                        textDecorationLine: "underline"
                    }}>{SMath.formatMoney(monto_enviado_a_bancos.monto)}</SText>
                </SView>
            </SView> : null}
            {monto_enviado_a_bancos ? <SView col={"xs-12"} row>
                <SView flex>

                </SView>
                <SView row>
                    <SText color={STheme.color.lightBlack} bold fontSize={16}>{SMath.formatMoney(total + monto_enviado_a_bancos.monto)}</SText>
                </SView>
            </SView> : null}
        </SView>
    }
    getRecibo() {
        // var reducer = this.props.state.paqueteVentaReducer;
        // var key = this.props.key_paquete_venta;
        // var recibo = reducer.recibo[key];
        // if (!recibo) {
        //     if (reducer.estado == "cargando") return <SLoad />
        //     SSocket.send({
        //         component: "paqueteVenta",
        //         type: "getRecibo",
        //         estado: "cargando",
        //         key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        //         key: key
        //     });
        //     return <SLoad />
        // }
        var caja = Caja.Actions.getByKey(this.props, this.props.key_caja);
        if (!caja) return <SLoad />
        var sucursal = Sucursal.Actions.getByKey(caja.key_sucursal, this.props);
        if (!sucursal) return <SLoad />
        var key = this.props.key_caja;
        return <SView col={"xs-12"} backgroundColor={"#ffffff"} center style={{
            borderRadius: 4,
        }}>
            <SHr />
            <SView col={"xs-11"} style={{ alignItems: 'flex-end', }} row>
                <SIcon name={"Logo"} width={110} />
                <SView flex></SView>
                <SText fontSize={32} color={STheme.color.lightBlack} font={"Roboto"}>{"Caja"}</SText>
            </SView>
            <SHr />
            <SView col={"xs-11"} style={{ alignItems: "flex-end" }} >
                <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto"}>{new SDate(caja.fecha_on).toString("yyyy, MONTH dd, hh:mm")}</SText>
                <SText fontSize={14} color={"#990000"} font={"Roboto"}>{new SDate(caja.fecha_cierre).toString("yyyy, MONTH dd, hh:mm")}</SText>
            </SView>
            <SHr />
            <SView col={"xs-11"} style={{ alignItems: 'flex-end', }}>
                <SText fontSize={10} color={STheme.color.lightBlack} font={"Roboto"}>{key}</SText>
            </SView>
            <SHr />
            <SHr />
            <SView col={"xs-11"} >
                <SView col={"xs-12"} row>
                    <SView col={"xs-6"} row>
                        <SText fontSize={12} color={STheme.color.lightBlack} font={"Roboto"}>{"Sucursal / Cajero"}</SText>
                    </SView>
                </SView>
                <SView col={"xs-12"} row>
                    <SView col={"xs-6"} row>
                        <SView width={50} height={50} center>
                            <SImage src={SSocket.api.root + "sucursal/" + caja.key_sucursal} style={{
                                borderRadius: 8,
                                overflow: 'hidden',
                                width: "90%",
                                height: "90%",
                            }} />
                        </SView>
                        <SView center >
                            <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto-Bold"} col={"xs-12"}>{sucursal.descripcion}</SText>
                            <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto"} col={"xs-12"}>{this.getNombreUsuario(caja.key_usuario)}</SText>
                        </SView>
                    </SView>
                </SView>
            </SView>
            <SHr />
            <SHr />
            <SView col={"xs-12"} center>
                <SText fontSize={18} color={STheme.color.lightBlack} font={"Roboto"}>{"Detalle"}</SText>
            </SView>
            <SHr />
            <SView col={"xs-11"} center>
                <SHr height={1} color={STheme.color.lightGray} />
                <SHr />
                <SHr />
                <SView col={"xs-12"} center>
                    {this.getDetalleCaja()}
                </SView>
                <SHr />
                <SHr />
                <SView col={"xs-12"} height={50} center row>
                    <SHr height={1} color={STheme.color.lightGray} />
                    {this.getTotales()}
                </SView>
                {/* <SHr height={1} color={STheme.color.lightGray} /> */}
            </SView>
            <SHr />
            <SHr height={50} />

            {/* <SText color={"#666"}>{JSON.stringify(recibo, "\n", "\t")}</SText> */}
        </SView>
    }
    render() {
        return (
            <SView col={"xs-12"}>
                <SView col={"xs-12"} center>
                    {this.getRecibo()}
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Recibo);