import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import TipoPago from '../../TipoPago';
import Usuario from '../../Usuario';
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
    getPagos(recibo, obj_usr) {
        if (!recibo.caja_movimiento) return null;
        return recibo.caja_movimiento.map((obj) => {
            if (obj.data.key_usuario != obj_usr.key_usuario) return null;
            var tipoPago = TipoPago.Actions.getByKey(obj.key_tipo_pago, this.props);
            if (!tipoPago) return <SLoad />;
            return <> <SView col={"xs-12"} row>
                <SText color={STheme.color.lightBlack} font={"Roboto"} style={{
                    textTransform: "capitalize"
                }}>{tipoPago.descripcion}</SText>
                <SView flex>
                    <SView flex />
                    <SHr height={1} color={"#ddd"} />
                </SView>
                <SText color={STheme.color.lightBlack} font={"Roboto-Bold"}>{"Bs. " + parseFloat(obj.data.monto).toFixed(2)}</SText>

            </SView>
                <SHr />
            </>
        })


    }
    getDetallePago(recibo) {
        var detalle = recibo.paquete_venta_usuario;
        if (!detalle) return null;
        return detalle.map((obj) => {
            return <><SView col={"xs-12"} height={50} center row>
                <SView>
                    <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto-Bold"} style={{
                        textTransform: "uppercase"
                    }}>{this.getNombreUsuario(obj.key_usuario)}</SText>
                    <SView row>
                        <SText fontSize={12} color={STheme.color.lightBlack} font={"Roboto"}>{new SDate(obj.fecha_inicio, "yyyy-MM-dd").toString("MONTH, dd")}</SText>
                        <SText fontSize={12} color={STheme.color.lightBlack} > - </SText>
                        <SText fontSize={12} color={STheme.color.lightBlack} font={"Roboto"}>{new SDate(obj.fecha_fin, "yyyy-MM-dd").toString("MONTH, dd")}</SText>
                    </SView>

                </SView>
                <SView flex></SView>
            </SView>
                {this.getPagos(recibo, obj)}
            </>
        })
    }

    getTotal(recibo) {
        var total = 0;
        if (!recibo.caja_movimiento) return "Bs. 0.00";
        recibo.caja_movimiento.map((obj) => {
            total += parseFloat(obj.data.monto);
        })
        return "Bs." + parseFloat(total).toFixed(2);

    }
    getRecibo() {
        var reducer = this.props.state.paqueteVentaReducer;
        var key = this.props.key_paquete_venta;
        var recibo = reducer.recibo[key];
        if (!recibo) {
            if (reducer.estado == "cargando") return <SLoad />
            SSocket.send({
                component: "paqueteVenta",
                type: "getRecibo",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key: key
            });
            return <SLoad />
        }
        if (!recibo.paquete_venta) {
            return <SView col={"xs-12"} center>
                <SHr />
                <SHr />
                <SText fontSize={22} bold>Lo sentimos! no se pudo completar la venta, intente nuevamente.</SText>
                <SHr />
                <SHr />
            </SView>
        }
        return <SView col={"xs-11 sm-10 md-8 lg-7 xl-5"} backgroundColor={"#ffffff"} center style={{
            borderRadius: 4,
        }}>
            <SHr />
            <SView col={"xs-11"} style={{ alignItems: 'flex-end', }} row>
                <SIcon name={"Logo"} width={110} />
                <SView flex></SView>
                <SText fontSize={32} color={STheme.color.lightBlack} font={"Roboto"}>Recibo</SText>
            </SView>
            <SHr />
            <SView col={"xs-11"} style={{ alignItems: "flex-end" }} >
                <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto"}>{new SDate(recibo.paquete_venta.fecha_on).toString("yyyy, MONTH dd, hh:mm")}</SText>
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
                            <SImage src={SSocket.api.root + "sucursal_" + recibo.sucursal.key} style={{
                                borderRadius: 8,
                                overflow: 'hidden',
                                width: "90%",
                                height: "90%",
                            }} />
                        </SView>
                        <SView center >
                            <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto-Bold"} col={"xs-12"}>{recibo.sucursal.descripcion}</SText>
                            <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto"} col={"xs-12"}>{this.getNombreUsuario(recibo.caja.key_usuario)}</SText>
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
                <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto-Bold"} >{"Paquete"}</SText>
                <SHr />
                <SView col={"xs-12"} row>
                    <SView width={50} height={50} style={{
                        padding: 4,
                    }}>
                        <SImage src={SSocket.api.root + "paquete_" + recibo.paquete.key} />
                    </SView>
                    <SView center flex >
                        <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto-Bold"} col={"xs-12"}>{recibo.paquete.descripcion}</SText>
                        <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto"} col={"xs-12"}>{recibo.paquete.dias + " Días / " + recibo.paquete.participantes + " Personas"}</SText>
                    </SView>
                    <SView center >
                        <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto"} col={"xs-12"}>{"Bs. " + recibo.paquete.precio.toFixed(2)}</SText>
                    </SView>
                </SView>
                <SView col={"xs-12"} center>
                    <SHr />
                    <SHr />
                    <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto-Bold"} >{"Clientes"}</SText>
                    {this.getDetallePago(recibo)}

                </SView>
                <SHr />
                <SHr />
                <SView col={"xs-12"} height={50} center row>
                    <SHr height={1} color={STheme.color.lightGray} />
                    <SView>
                        <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto-Bold"} style={{
                            textTransform: "uppercase"
                        }}>{"Total: "}</SText>
                    </SView>
                    <SView flex></SView>
                    <SView row>
                        <SText fontSize={14} color={STheme.color.lightBlack} font={"Roboto-Bold"}>{this.getTotal(recibo)}</SText>
                    </SView>
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