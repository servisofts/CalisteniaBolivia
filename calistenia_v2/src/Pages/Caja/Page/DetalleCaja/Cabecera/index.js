import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SLoad, SPage, SPopup, SPopupOpen, SText, SView } from 'servisofts-component';
import PopupCerrar from '../../CajaPage/EstadoCaja/PopupCerrar';
import PopupConfirmarCierre from '../../CajaPage/EstadoCaja/PopupConfirmarCierre';
import SSocket from 'servisofts-socket';
class Cabecera extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
    getMonto(key_caja) {
        // if (!this.activa) {
        //     return 0
        // }
        var reducer = this.props.state.cajaMovimientoReducer;
        var data = reducer.data[key_caja];
        if (!data) {
            return 0;
        }
        var total = 0;
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
            var obj = data[keys[i]];
            total += obj.monto;
        }
        if (total % 1 != 0) total = total.toFixed(2);
        return total;
    }
    getEstadoCaja() {
        var caja = this.props.caja;
        if (!caja.fecha_off) {
            return <SView col={"xs-12"} center>
                <SButtom props={{ type: "danger", variant: "default", }}
                    style={{
                        width: 100,
                        height: 30,
                    }}
                    onPress={() => {
                        var total = this.getMonto(this.props.caja.key)
                        SPopup.open({
                            key: "ConfirmarCierreCaja",
                            content: < PopupConfirmarCierre data={this.activa} onSelect={(select) => {
                                if (select == "banco") {
                                    SPopupOpen({
                                        key: "cerrarCaja",
                                        content: <PopupCerrar data={this.props.caja} total={total} navigation={this.props.navigation} />
                                    })
                                } else {

                                    var obj = {
                                        component: "caja",
                                        type: "cierre",
                                        estado: "cargando",
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                        data: {
                                            key_caja: this.props.caja.key,
                                            monto_salvar: total,
                                            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                        }
                                    }
                                    SSocket.send(obj);
                                }
                                SPopup.close("ConfirmarCierreCaja");
                            }} />
                        })
                    }
                    }> cerrar la caja</SButtom >
            </SView>
        }
        return <SText></SText>
    }
    render() {
        this.movimientos = this.getMovimientos(this.props.caja.key);
        if (!this.movimientos) return <SLoad />
        return (
            <SView col={"xs-12"} card height={60} center>
                <SView col={"xs-12"} center>
                    <SText>{`Fecha de apertura\t\t${new SDate(this.props.caja.fecha_on).toString("yyyy-MM-dd hh:mm")}`}</SText>
                    <SText>{!this.props.caja.fecha_off ? "" : `Fecha de cierre\t\t${new SDate(this.props.caja.fecha_on).toString("yyyy-MM-dd hh:mm")}`}</SText>
                    {/* <SText>{this.getMonto(this.props.caja.key)}</SText> */}
                </SView>
                {this.getEstadoCaja()}
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Cabecera);