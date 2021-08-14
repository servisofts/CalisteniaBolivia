import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SView, SScrollView2, SText } from '../../../../SComponent';
import { connect } from 'react-redux';
import AppParams from '../../../../Params/index';
import SOrdenador from '../../../../Component/SOrdenador/index';

class ListaCajas extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getUsuarios(key_usuario) {
        if (this.props.state.usuarioReducer.data["registro_administrador"]) {
            var data = this.props.state.usuarioReducer.data["registro_administrador"]
            if (data[key_usuario]) {
                return data[key_usuario];
            }
        }
        if (this.props.state.usuarioReducer.estado == "cargando") return {};
        var object = {
            component: "usuario",
            version: "2.0",
            type: "getAll",
            estado: "cargando",
            cabecera: "registro_administrador",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
        }
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        return {};
    }
    getMovimientos(key_caja) {
        var reducer = this.props.state["cajaMovimientoReducer"];
        var data = reducer["activas"];
        if (!data) {
            if (reducer.estado == "cargando") return false;
            if (reducer.estado == "error") return false;
            this.props.state.socketReducer.session[AppParams.socket.name].send({
                component: "cajaMovimiento",
                type: "getAllActivas",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            }, true);
            return false;
        }
        return reducer["data"][key_caja];
    }
    getLista() {
        var reducer = this.props.state["cajaReducer"];
        var data = reducer["activas"];
        if (!data) {
            if (reducer.estado == "cargando") return false;
            if (reducer.estado == "error") return false;
            this.props.state.socketReducer.session[AppParams.socket.name].send({
                component: "caja",
                type: "getActivas",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando"
            }, true);
            return false;
        }
        return reducer["usuario"];
    }
    getItemUsuario(usr) {
        return (
            <SView style={{ flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <View style={{
                    width: 40,
                    height: 40,
                    marginRight: 8,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ff999933",
                    borderRadius: 100,
                    overflow: "hidden"
                }}>
                    {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + usr.key, {
                        width: "100%",
                        objectFit: "cover",
                        resizeMode: "cover",

                    })}
                </View>
                <SText style={{
                    textTransform: "capitalize"
                }}>{usr.Nombres}</SText>
                <SText style={{ textTransform: "capitalize" }}> {usr.Apellidos}</SText>
            </SView>
        )
    }
    getMovimientosItem(movimientos) {
        var total = 0 ;
        return new SOrdenador([{ key: "fecha_on", order: "asc", peso: 1 }]).ordernarObject(movimientos).map((key) => {
            total+=movimientos[key].monto;
            return (
                <SView key={key}>
                    <SText style={{ textTransform: "capitalize" }}>{total},</SText>
                </SView>
            )
        })
    }
    getItems() {
        var lista = this.getLista();
        if (!lista) return <ActivityIndicator color={"#fff"} />;
        return Object.keys(lista).map((key) => {
            var obj = lista[key];
            if (!key) return <View />
            if (!obj) return <View />
            if (!obj.key_usuario) return <View />
            var usuario = this.getUsuarios(obj.key_usuario);
            usuario.key = obj.key_usuario;
            var movimientos = this.getMovimientos(obj.key);
            return <SView key={key}
                col={"xs-11"}
                row
                style={{
                    borderRadius: 4,
                    height: 100,
                    backgroundColor: "#66000044",
                    marginTop: 8,
                }}>
                <SView col={"xs-4"}>
                    {this.getItemUsuario(usuario)}
                </SView>
                <SView col={"xs-8"} flex row>
                    {this.getMovimientosItem(movimientos)}
                </SView>

            </SView>
        })
    }
    render() {
        return (
            <SView props={{
                col: "xs-12",
            }} style={{
                flex: 1,
            }}>
                <SScrollView2 disableHorizontal style={{
                    width: "100%",
                }}>
                    <SView props={{
                        col: "xs-12",
                        variant: "center"
                    }}>
                        {this.getItems()}
                    </SView>
                </SScrollView2>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ListaCajas);
