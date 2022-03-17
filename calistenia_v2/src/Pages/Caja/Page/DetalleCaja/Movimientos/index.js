import React, { Component } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { connect } from 'react-redux';
import { SView, SText, SDate, SOrdenador, SIcon, STheme, SNavigation } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Usuario from '../../../../Usuario';
class Movimientos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sucursal: false
        };
    }
    componentDidMount() {
        this.activa = this.props.state.cajaReducer.usuario[this.props.state.usuarioReducer.usuarioLog.key];
        if (!this.activa) return;
        SSocket.send({
            component: "cajaMovimiento",
            type: "getByKeyCaja",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            key_caja: this.activa.key,
            estado: "cargando"
        }, true);
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
    getIcon(monto) {
        return <SIcon name={(monto >= 0 ? "Ingreso" : "Egreso")} style={{ width: 34, height: 34, }} />
    }
    getUsuario(data) {
        if (!data.data) return <View />
        if (!data.data.key_usuario) return <View />
        var usuarios = Usuario.Actions.getAll(this.props);
        if (!usuarios) return <View />
        var usr = usuarios[data.data.key_usuario];
        if (!usr) return <View />
        return <SText style={{
            textTransform: "capitalize",
            fontSize: 10,
            color: "#999"
        }} onPress={()=>{
            SNavigation.navigate("ClientePerfilPage",{
                key: usr.key
            })
        }}>{usr.Nombres} {usr.Apellidos} </SText>
    }
    getIconTipoPago(type, data) {
        // alert(JSON.stringify(data))
        // return <SText>{JSON.stringify(data.data)}</SText>
        if (!data.data) return <SIcon name={"Money"} style={{ width: 34, height: 34, }} />;
        switch (data.data.key_tipo_pago) {
            case "1": return <SIcon name={"Money"} style={{ width: 34, height: 34, }} />;
            case "2": return <SIcon name={"Card"} style={{ width: 34, height: 34, }} />;
            case "3": return <SIcon name={"Tranfer"} style={{ width: 34, height: 34, }} />;
            case "4": return <SIcon name={"Cheque"} style={{ width: 34, height: 34, }} />;
            default: return <SIcon name={"Money"} style={{ width: 34, height: 34, }} />;
        }
    }
    getIconTipo(type, monto) {
        switch (type.key) {
            case "1": return <SIcon name="Add" style={{ width: 34, height: 34, }} />; //apertura
            case "3": return <SIcon name="Paquete" style={{ width: 34, height: 34, }} />; //venta_servicio
            case "4": return <SIcon name={"Caja"} style={{ width: 34, height: 34, }} />; //movimiento de caja
            default: return <SIcon name="Add" style={{ width: 34, height: 34, }} />;
        }
    }
    getLista() {
        var movimientos = this.getMovimientos(this.activa.key);
        if (!movimientos) return <ActivityIndicator color={"#fff"} />;
        var tipoMovimientos = this.getCajaTipoMovimientos();
        if (!tipoMovimientos) return <ActivityIndicator color={"#fff"} />;

        return new SOrdenador([{ key: "fecha_on", order: "desc", peso: 1 }]).ordernarObject(movimientos).map((key, index) => {
            var timpoMovimiento = tipoMovimientos[movimientos[key].key_caja_tipo_movimiento];
            return (
                <View key={index} style={{ width: "100%", alignItems: "center", justifyContent: "center", padding: 4 }}>
                    <View style={{ backgroundColor: STheme.color.card, width: "100%", minHeight: 50, borderRadius: 4, flexDirection: "row", }}>
                        <SView style={{
                            flex: 1,
                            height: "100%",
                            padding: 4,
                        }}
                            props={{ direction: "row" }}
                        >
                            <SView col={"xs-12"} >
                                <Text style={{ color: "#999", fontSize: 9 }}>{new SDate(movimientos[key].fecha_on).toString("MONTH, dd  - hh:mm")}</Text>
                                <Text style={{ color: "#fff", fontSize: 14 }}>{movimientos[key].descripcion}</Text>
                                {this.getUsuario(movimientos[key])}

                            </SView>
                            {/* <SText>{JSON.stringify(movimientos[key])}</SText> */}
                        </SView>


                        <SView style={{
                            width: 200,
                            paddingBottom: 4,
                            paddingTop: 4,
                        }} center row>
                            <SView row col={"xs-12 sm-8"} center>
                                <SView style={{
                                    width: 40,
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }} center>
                                    {this.getIconTipoPago(timpoMovimiento, movimientos[key])}
                                </SView>
                                <SView style={{
                                    width: 40,
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }} center>
                                    {this.getIconTipo(timpoMovimiento, movimientos[key].monto)}
                                </SView>
                                <SView style={{
                                    width: 40,
                                    height: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }} center>
                                    {this.getIcon(movimientos[key].monto)}
                                </SView>
                            </SView>
                            <SView col={"xs-12 sm-4"} center>
                                <View style={{
                                    height: 50,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    flexDirection: "row"
                                }}>
                                    <Text style={{ color: "#fff", fontSize: 10, height: 20, }}>Bs.</Text>
                                    <Text style={{ color: "#fff", fontSize: 14, }}>{movimientos[key].monto}</Text>
                                </View>
                            </SView>
                        </SView>

                    </View>
                </View >
            )
        })
    }
    getDetalle(mensaje, icon) {
        return <SView col={"xs-4 md-3 xl-2"} center style={{
            height: 70,
        }}>
            <SView style={{
                width: 35,
                height: 35,
                justifyContent: "center",
                alignItems: "center",
            }}>
                {icon}
            </SView>
            <SText style={{
                fontSize: 10,
                textAlign: "center"
            }}>{mensaje}</SText>
        </SView>
    }
    getTipoPago() {
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
            SSocket.send(object, true);
            return false;
        }
        return data;
    }
    getInfo() {
        var tiposPagos = this.getTipoPago();
        if (!tiposPagos) return <View />
        return <SView center col={"xs-12 md-10 xl-8"} row >
            <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
            <SView col={"xs-12"} height={32} center>
                <SText style={{ color: "#999" }}>Informacion</SText>
            </SView>
            {this.getDetalle("Ingreso de caja", this.getIcon(1))}
            {this.getDetalle("Egreso de caja", this.getIcon(-1))}

            <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
            <SView col={"xs-12"} height={32} center>
                <SText style={{ color: "#999" }}>Tipos de pagos</SText>
            </SView>
            {Object.keys(tiposPagos).map((key, index) => {
                return this.getDetalle(tiposPagos[key].descripcion, this.getIconTipoPago(null, { data: { key_tipo_pago: key } }))
            })}
            <SView col={"xs-12"} height={32} center>
                <SText style={{ color: "#999", fontSize: 10, }}>Los pagos en tarjeta y transferecia se ingresan automaticamente al banco.</SText>
            </SView>
            <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
            <SView col={"xs-12"} height={32} center>
                <SText style={{ color: "#999" }}>Tipos de movimientos</SText>
            </SView>
            {this.getDetalle("Movimiento de apertura", this.getIconTipo({ key: "1" }))}
            {this.getDetalle("Movimiento de venta de paquete", this.getIconTipo({ key: "3" }))}
            {this.getDetalle("Movimiento de caja", this.getIconTipo({ key: "4" }))}

            <SView col={"xs-12"} height={32} center style={{ borderBottomWidth: 1, borderBottomColor: STheme.color.card }}></SView>
            <SView col={"xs-12"} height={62} center></SView>

        </SView>

    }

    render() {
        this.activa = this.props.caja;
        if (!this.activa) return <View />;
        if (this.props.setActiva) this.props.setActiva(this.activa);
        return (
            <SView col={"xs-12"} center style={{
                marginTop: 16,
            }}>
                <SText props={{ type: "primary" }}>Movimientos</SText>
                <SView col="xs-12 md-8 xl-6">
                    {this.getLista()}
                    <SView col={"xs-12"} style={{
                        height: 50,
                    }}>
                    </SView>
                </SView>
                {this.getInfo()}
            </SView>
        )
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Movimientos);