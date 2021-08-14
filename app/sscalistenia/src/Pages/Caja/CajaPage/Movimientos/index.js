import React, { Component } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { connect } from 'react-redux';
import AppParams from '../../../../Params';
import { SView, SText, SDate } from '../../../../SComponent/';
import Svg from '../../../../Svg';
import SOrdenador from '../../../../Component/SOrdenador/index';

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
        this.props.state.socketReducer.session[AppParams.socket.name].send({
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
            this.props.state.socketReducer.session[AppParams.socket.name].send({
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
            this.props.state.socketReducer.session[AppParams.socket.name].send({
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
    getIcon(type) {
        switch (type.key) {
            case "3": return <Svg name="arrg" style={{ width: 34, height: 34, }} />;
            case "4": return <Svg name="arrr" style={{ width: 34, height: 34, }} />;
            default: return <Svg name="Add" style={{ width: 34, height: 34, }} />;
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
                <View key={index} style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center", padding: 4 }}>
                    <View style={{ backgroundColor: "#66000044", width: "100%", height: 50, borderRadius: 4, flexDirection: "row", }}>
                        <SView style={{
                            flex: 1,
                            height: "100%",
                            padding: 4,
                        }}
                            props={{ direction: "row" }}
                        >
                            <SView col={"xs-12"} >
                                <Text style={{ color: "#fff", fontSize: 16 }}>{movimientos[key].descripcion}</Text>
                                <Text style={{ color: "#fff", fontSize: 10 }}>{new SDate(movimientos[key].fecha_on).toString("MONTH, dd  - hh:mm")}</Text>
                            </SView>

                        </SView>
                        <SView style={{
                            width: 40,
                            height: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            {this.getIcon(timpoMovimiento)}
                        </SView>
                        <View style={{
                            width: 100,
                            height: 50,
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Text style={{ color: "#fff", fontSize: 16, }}>Bs. {movimientos[key].monto}</Text>
                        </View>
                    </View>
                </View >
            )
        })
    }

    render() {
        this.activa = this.props.state.cajaReducer.usuario[this.props.state.usuarioReducer.usuarioLog.key];
        if (!this.activa) return <View />;
        return (
            <SView props={{
                col: "xs-12",
                variant: "center"
            }} style={{
                marginTop: 16,
            }}>
                <SText props={{ type: "primary" }}>Movimientos</SText>
                <SView props={{ col: "xs-12 md-8 xl-6" }}>
                    {this.getLista()}
                </SView>
            </SView>
        )
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Movimientos);