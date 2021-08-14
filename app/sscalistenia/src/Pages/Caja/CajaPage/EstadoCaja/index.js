import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AppParams from '../../../../Params';
import { SButtom, SInput, SText, STheme, SView } from '../../../../SComponent';

class EstadoCaja extends Component {
    constructor(props) {
        super(props);
        this.state = {
            montoDefault: "200.00"
        };
    }
    componentDidMount() {
        this.getActiva();
    }
    getActiva() {
        var obj = {
            component: "caja",
            type: "getActiva",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key
        }
        this.props.state.socketReducer.session[AppParams.socket.name].send(obj, true);
    }

    getBtn() {
        if (!this.props.sucursal) {
            return <SText style={{ color: "#644", fontSize: 10 }}>Seleccione su sucursal para continuar</SText>
        }
        return <SButtom props={{ type: "danger", variant: "confirm" }}
            onPress={() => {
                var value = this.inputr.getValue();
                if (!value) {
                    value = this.state.montoDefault;
                }
                var obj = {
                    component: "caja",
                    type: "registro",
                    estado: "cargando",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    data: {
                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                        monto: value,
                        key_sucursal: this.props.sucursal.key
                    }
                }
                this.props.state.socketReducer.session[AppParams.socket.name].send(obj, true);
            }}>Abrir</SButtom>
    }
    apertura() {
        if (this.activa) {
            return <View />
        }
        return (
            <SView props={{
                variant: "center",
                col: "xs-10",
            }} style={{
                flex: 1,
            }}>
                <SInput ref={(ref) => { this.inputr = ref }} props={{ col: "xs-12", customStyle: "calistenia", type: "money", label: "Monto de apertura", variant: "small" }} placeholder={this.state.montoDefault} />,
                {this.getBtn()}
            </SView>
        );
    }
    getBtnClose() {
        if (!this.activa) {
            return <View />
        }
        return <SButtom props={{ type: "danger", variant: "confirm", }}
            style={{
                width: 100,
                height: 30,
            }}
            onPress={() => {
                // var value = this.inputr.getValue();
                // if (!value) {
                // value = this.state.montoDefault;
                // }
                var obj = {
                    component: "caja",
                    type: "cierre",
                    estado: "cargando",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    data: {
                        monto: this.total,
                        ...this.activa,
                    }
                }
                this.props.state.socketReducer.session[AppParams.socket.name].send(obj, true);
            }}>cerrar la caja</SButtom>
    }
    getMontoEnCaja() {
        if (!this.activa) {
            return <View />
        }
        var reducer = this.props.state.cajaMovimientoReducer;
        var data = reducer.data[this.activa.key];
        if (!data) {
            return false;
        }
        var total = 0;
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
            var obj = data[keys[i]];
            total += obj.monto;
        }
        this.total = total;

        return <SView style={{
            width: 150,
            height: 50,
            backgroundColor: "#ffffff22",
            borderRadius: 8,
        }} props={{
            variant: "center"
        }}>
            <SText style={{ fontSize: 18, color: "#Fff" }}> {total}</SText>
        </SView>
    }
    cierre() {
        if (!this.activa) {
            return <View />
        }
        return (
            <SView props={{
                variant: "center",
                col: "xs-10",
            }} style={{
                flex: 1,
                justifyContent: "space-evenly"
            }}>

                {this.getMontoEnCaja()}
                {this.getBtnClose()}
            </SView>
        );
    }
    render() {
        this.activa = this.props.state.cajaReducer.usuario[this.props.state.usuarioReducer.usuarioLog.key];
        if (!this.props.sucursal) {
            if (this.activa) {
                if (this.props.setKeySucursal) {
                    this.props.setKeySucursal(this.activa.key_sucursal);
                }
            }
        }
        return (
            <SView props={{
                col: "xs-11 md-6 xl-4",
                variant: "center"
            }} style={{
                height: 150,
                backgroundColor: "#66000044",
                borderRadius: 8,
                marginTop: 8,
            }} >

                {this.apertura()}
                {this.cierre()}
                <SText style={{
                    position: "absolute",
                    right: 4,
                    top: 0,
                    fontSize: 10,
                    color: STheme().colorOpaque
                }}>Estado de caja:  {!this.activa ? "Cerrada" : "Activa"}</SText>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EstadoCaja);