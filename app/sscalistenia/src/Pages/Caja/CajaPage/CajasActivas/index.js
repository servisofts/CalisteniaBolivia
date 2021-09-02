import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../../../Actions';
import AppParams from '../../../../Params';
import { SText, SView } from '../../../../SComponent';

class CajasActivas extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount() {
        this.getAlguienEnCaja(true);
    }
    getAlguienEnCaja(force) {
        if (!this.props.sucursal) {
            return;
        }
        var data = this.props.state.sucursalReducer.cajaActiva[this.props.sucursal.key];
        if (!data || force) {
            if (this.props.state.sucursalReducer.estado == "cargando" && !force) {
                return;
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send({
                component: "sucursal",
                type: "getCajaActiva",
                estado: "cargando",
                key_sucursal: this.props.sucursal.key,
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }, true);
            return;
        }
        return data;
    }
    getUsuario(key_usuario) {
        var usuario = Actions.Usuario.getByKey(key_usuario, this.props);
        if (!usuario) {
            return <View />
        }
        return <SView col={"xs-4"} props={{
            variant: "col-square"
        }}>
            <SView style={{
                width: "100%",
            }} center>
                <View style={{
                    backgroundColor: "#66000044",
                    width: 40,
                    height: 40,
                    borderRadius: 100,
                    overflow:"hidden",
                }}>
                    {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + key_usuario, {
                    width: "100%",
                    objectFit: "cover",
                    resizeMode: "cover",

                })}
                </View>

                <SText style={{
                    textAlign: "center",
                    fontSize: 10,
                }}>{usuario.Nombres}</SText>
            </SView>
        </SView >
    }
    render() {
        var cajasActivas = this.getAlguienEnCaja();
        if (!cajasActivas) {
            return <View />
        }
        if (Object.keys(cajasActivas).length <= 0) {
            return <View />
        }
        return (
            <SView col={"xs-11 md-6 xl-4"} style={{
                height: 100,
                padding: 4,
            }} center>
                <SText style={{
                    fontSize: 10,
                    color: "#666",
                }}>{"Hay cajas abiertas en esta sucursal."}</SText>
                <SView col={"xs-12"} center row style={{
                    height: 60
                }}>
                    {
                        Object.keys(cajasActivas).map((key_caja) => {
                            var obj = cajasActivas[key_caja];
                            return this.getUsuario(obj.key_usuario);
                        })
                    }
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CajasActivas);