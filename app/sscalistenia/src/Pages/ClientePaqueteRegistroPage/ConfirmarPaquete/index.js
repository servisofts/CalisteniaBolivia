import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import BackgroundImage from '../../../Component/BackgroundImage';
import DeleteBtn from '../../../Component/DeleteBtn';
import STextImput from '../../../Component/STextImput';
import AppParams from '../../../Params';
import { SPopupClose } from '../../../SComponent/SPopup';

class ConfirmarPaquete extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    sendServer(data, usuario) {
        var correoNew = this.correoI.getValue();
        if (correoNew != usuario.Correo) {

            var object = {
                component: "usuario",
                type: "editar",
                version: "2.0",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                estado: "cargando",
                cabecera: "registro_administrador",
                data: {
                    ...usuario,
                    Correo: correoNew
                },
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
        }
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
    getTextDetail({ label, value }) {
        return <Text style={{ color: "#fff", marginBottom: 8, }}>{label}: {value}</Text>
    }
    render() {
        var usuario = this.props.state.usuarioReducer.data["registro_administrador"][this.props.data.key_usuario];
        var paquete = this.props.state.paqueteReducer.data[this.props.data.key_paquete];
        return (
            <View style={{
                width: "100%",
                height: 400,
                borderRadius: 10,
                overflow: "hidden",
                alignItems: "center",
            }}>
                <BackgroundImage contraste={"#66000044"} />
                <View style={{
                    width: "90%",
                    flex: 1,
                    padding: 8,
                    // alignItems: "center",
                }}>
                    <Text style={{ color: "#fff", fontSize: 18, marginBottom: 8 }}>{"Confirmar la compra del servicio"}</Text>
                    <Text style={{ color: "#fff", marginTop: 8, marginBottom: 8, }}>{"Cliente:"}</Text>
                    {this.getTextDetail({
                        label: "Nombre",
                        value: usuario.Nombres + " " + usuario.Apellidos
                    })}
                    <STextImput
                        ref={(ref) => { this.correoI = ref }}
                        style={{
                            width: "100%",
                            height: 30,
                            color: "#fff",
                            borderColor: "#fff",
                            borderWidth: 1,
                            borderRadius: 4,
                        }}
                        defaultValue={usuario.Correo}
                    />
                    <Text style={{ color: "#fff", marginTop: 8, marginBottom: 8, }}>{"Servicio:"}</Text>
                    {this.getTextDetail({
                        label: "Nombre",
                        value: paquete.descripcion
                    })}
                    {this.getTextDetail({
                        label: "Precio",
                        value: paquete.precio
                    })}
                    <Text style={{ color: "#fff", marginBottom: 8, }}>Cantidad de dias: {paquete.dias}</Text>
                    <Text style={{ color: "#fff", marginBottom: 8, }}>Cantidad de personas: {paquete.participantes}</Text>
                    <Text style={{ color: "#fff", marginBottom: 8, }}>Fecha inicio: {this.props.data.fecha_inicio}</Text>
                    <Text style={{ color: "#fff", marginBottom: 8, }}>Fecha fin: {this.props.data.fecha_fin}</Text>
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