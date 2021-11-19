import React, { Component } from 'react';
import { View, Text } from 'react-native';
import FloatButtom from '../../../../Components/FloatButtom/index';
import { connect } from 'react-redux';
import { SPopup, SScrollView2, SView, SText, SDate, SOrdenador, SPage, SNavigation, SImage, SIcon, SHr } from 'servisofts-component';
import CuentaBancoLista from '../CuentaBancoLista/index';
import BancoItem from '../BancoItem/index';
import CuentaBancoItem from '../CuentaBancoItem';
import FechasBetween from '../../../../Components/FechasBetween/index';
import BarraSuperior from '../../../../Components/BarraSuperior';
import SSocket from 'servisofts-socket';
let component = "cuentaBancoMovimiento";
let ReducerName = "cuentaBancoMovimientoReducer";

class CuentaMovimientosPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            monto_total: 0,
        };
        var key = SNavigation.getParam("key", null);
        this.key_banco = SNavigation.getParam("key_banco", null);
        if (!key) {
            this.data = {};
        } else {
            this.data = this.props.state["cuentaBancoReducer"].data[this.key_banco][key];

        }


    }
    componentDidMount() {
        this.getAll(true)
    }
    componentWillUnmount() {
        // this.props.state[ReducerName].data= {};
        if (this.props.onBack) this.props.onBack();
    }
    getTraspaso(obj) {
        if (obj.tipo_movimiento != "traspaso") {
            return <View />
        }
        return <> <SView style={{
            width: 34,
        }} center>
            <SView width={30}>
                <SIcon name={"Traspaso"} />
            </SView>
        </SView>
            <SView style={{
                width: 8,
            }} />
        </>
    }
    getAll = (force) => {
        var reducer = this.props.state[ReducerName];
        if (!reducer.data[this.data.key] || force) {
            if (reducer.estado == "cargando" && !force) {
                return <Text>Carfando</Text>;
            }
            SSocket.send({
                component: component,
                type: "getAllByKeyCuentaBanco",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key_cuenta_banco: this.data.key,
                estado: "cargando"
            });
            return <View />
        }
        if (!this.state.fecha_inicio || !this.state.fecha_fin) {
            return <View />
        }
        var data = reducer.data[this.data.key];
        var fecha_i = new SDate(this.state.fecha_inicio, "yyyy-MM-dd");
        var fecha_f = new SDate(this.state.fecha_fin, "yyyy-MM-dd");
        var monto_total = 0;
        var CONTAINER = new SOrdenador([
            { key: "fecha_on", order: "desc", peso: 1 }
        ]).ordernarObject(data).map((key) => {
            var obj = data[key];
            var monto = obj.monto;
            if (obj.monto == 0) {
                return <View />
            }
            if (monto) {
                if (monto % 1 != 0) monto = parseFloat(monto).toFixed(2);
            }
            var sdate = new SDate(obj.fecha_on)
            if ((!sdate.equalDay(fecha_i) && !sdate.equalDay(fecha_f)) && (sdate.isBefore(fecha_i) || sdate.isAfter(fecha_f))) {
                return <View />
            }
            monto_total += parseFloat(monto);
            return (
                <>
                    <SView col={"xs-12"} key={obj.key} style={{
                        borderRadius: 4,
                        backgroundColor: "#66000044",
                    }} row center>
                        <SView style={{
                            width: 50,
                            height: 50,
                        }} center >
                            <SView style={{
                                width: 40,
                                height: 40,
                                borderRadius: 8,
                                overflow: "hidden",
                            }}>
                                <SImage src={SSocket.api.root + "usuario_" + obj.key_usuario} />
                            </SView>
                        </SView>
                        <SView style={{
                            flex: 1,
                            height: "100%",
                            padding: 4,
                        }}
                            props={{ direction: "row" }}
                        >
                            <SView col={"xs-12"} >
                                <Text style={{ color: "#fff", fontSize: 16 }}>{obj.descripcion}</Text>
                                <Text style={{ color: "#fff", fontSize: 10 }}>{new SDate(obj.fecha_on).toString("MONTH, dd  - hh:mm")}</Text>
                            </SView>

                        </SView>
                        {this.getTraspaso(obj)}
                        <SView style={{
                            width: 34,
                        }} center>
                            <SView width={34}>
                                <SIcon name={(obj.monto >= 0 ? "Ingreso" : "Egreso")} />
                            </SView>
                        </SView>
                        <View style={{
                            width: 100,
                            height: 50,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={{ color: "#fff", fontSize: 16, }}>Bs. {monto}</Text>
                        </View>
                    </SView>
                    <SHr />
                </>
            );
        })

        if (monto_total != this.state.monto_total) {
            this.state.monto_total = monto_total.toFixed(2);
            this.setState({ monto_total: monto_total });
        }
        return CONTAINER;

    }
    render() {
        return (
            <SPage
                hidden
                disableScroll
                title={"Movimientos de cuenta"}>
                <BarraSuperior
                    title={"Movimientos de cuenta"}
                    goBack={() => {
                        SNavigation.goBack();
                    }} />
                <SScrollView2 disableHorizontal style={{
                    width: "100%",
                    height: "100%",
                }}>
                    <SView col={"xs-12"} center>
                        <BancoItem key_banco={this.key_banco} />
                        <CuentaBancoItem key_banco={this.key_banco} key_cuenta_banco={this.data.key} />

                        <SView col={"xs-11 md-7 xl-6"} center>
                            <SView col={"xs-12"} height={50} style={{
                                // backgroundColor: "#fff",
                            }}>
                                <FechasBetween onChange={(fi, ff) => {
                                    this.setState({
                                        fecha_inicio: fi,
                                        fecha_fin: ff
                                    })
                                }} />
                            </SView>
                            <SView col={"xs-12"} style={{ height: 36, }} center row>
                                <SView flex height style={{
                                    justifyContent: "center",
                                }}>
                                    <SText>Movimientos</SText>
                                </SView>
                                <SView center height>
                                    <SText>Bs. {this.state.monto_total}</SText>
                                </SView>
                            </SView>
                            {this.getAll()}

                        </SView>
                    </SView>
                </SScrollView2>
                <FloatButtom label={"+"} onPress={() => {
                    this.props.navigation.navigate("CuentaBancoMovimientoRegistroPage", {
                        key_banco: this.key_banco,
                        key_cuenta_banco: this.data.key,
                    });
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CuentaMovimientosPage);
