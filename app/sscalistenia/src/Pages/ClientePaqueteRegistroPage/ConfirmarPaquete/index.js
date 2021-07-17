import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import DeleteBtn from '../../../Component/DeleteBtn';
import AppParams from '../../../Params';
import { SPopupClose } from '../../../SPopup';

class ConfirmarPaquete extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    sendServer(data, usuario) {
        var object = {
            component: "paqueteUsuario",
            type: "registro",
            estado: "cargando",
            key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            data,
            cliente: usuario,
        }
        // alert(JSON.stringify(object));
        this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        SPopupClose("confirmarPaquete");
    }
    render() {
        var usuario = this.props.state.usuarioReducer.data["registro_administrador"][this.props.data.key_usuario];
        var paquete = this.props.state.paqueteReducer.data[this.props.data.key_paquete];
        return (
            <View style={{
                width: "100%",
                height: 400,
                // backgroundColor: "#000"
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{ color: "#000" }}>{usuario.Nombres}</Text>
                    <Text style={{ color: "#000" }}>{usuario.Apellidos}</Text>
                    <Text style={{ color: "#000" }}>{usuario.Correo}</Text>
                    <Text style={{ color: "#000" }}>{"-- -- --"}</Text>
                    <Text style={{ color: "#000" }}>Nombre: {"\t\t\t\t" + paquete.descripcion}</Text>
                    <Text style={{ color: "#000" }}>Precio: {"\t\t\t\t" + paquete.precio}</Text>
                    <Text style={{ color: "#000" }}>Cantidad de dias: {"\t\t" + paquete.dias}</Text>
                    <Text style={{ color: "#000" }}>Cantidad de personas: {"\t" + paquete.participantes}</Text>
                    <Text style={{ color: "#000" }}>{"-- -- --"}</Text>
                    <Text style={{ color: "#000" }}>Fecha inicio: {this.props.data.fecha_inicio}</Text>
                    <Text style={{ color: "#000" }}>Fecha fin: {this.props.data.fecha_fin}</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <DeleteBtn title={"Pagar"} style={{ width: 100, height: 40, }} onDelete={() => {
                        this.sendServer({
                            key_usuario: usuario.key,
                            key_paquete: paquete.key,
                            fecha_inicio: this.props.data.fecha_inicio,
                            fecha_fin: this.props.data.fecha_fin,
                            monto: 100,
                            nombre_paquete: paquete.descripcion
                        }, usuario)
                    }} />
                </View>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ConfirmarPaquete);