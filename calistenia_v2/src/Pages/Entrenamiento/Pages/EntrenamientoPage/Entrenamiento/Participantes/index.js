import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, STheme } from 'servisofts-component';
import { SLoad, SPopup, SText, SView } from 'servisofts-component';
import SeleccionarUsuario from './SeleccionarUsuario';
import SSocket from 'servisofts-socket'
import Asistencia from '../../../../../Asistencia';
import Usuario from '../../../../../Usuario';
import Model from '../../../../../../Model';
class Participantes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    getItem(content) {
        return <SView col={"xs-3 sm-2.5 md-2 lg-1.5 xl-1"} props={{
            variant: "col-square"
        }} style={{
            padding: 10,
        }}>
            <SView height col={"xs-12"} center style={{
                backgroundColor: STheme.color.card,
                borderRadius: 8,
            }}>
                {content}
            </SView>
        </SView>
    }
    getAdd() {
        return <SView col={"xs-12"} center height={60}>
            <SView col={"xs-11 md-8 xl-6"} height={50} card center onPress={() => {
                SPopup.open({
                    key: "selectUser",
                    content: <SeleccionarUsuario select={(usr) => {
                        Asistencia.Actions.registro({
                            descripcion: "",
                            key_usuario: usr.key,
                            key_sucursal: this.props.sucursal?.key,
                            // key_entrenamiento: this.props.entrenamiento.key
                        }, this.props)
                        SPopup.close("selectUser");
                    }} />
                })
            }}>
                <SText fontSize={16}>Asistencia</SText>
            </SView>
        </SView>
    }
    sincronizar() {
        var key_sucursal = this.props?.sucursal?.key;
        return <SView col={"xs-12"} center height={60}>
            <SView col={"xs-11 md-8 xl-6"} height={50} card center onPress={() => {
                SSocket.sendPromise({
                    component: "zkteco",
                    type: "sincronizarLog",
                    estado: "cargando",
                    key_sucursal: key_sucursal,
                }, 10000)
            }}>
                <SText fontSize={16}>Sync Molinetes</SText>
            </SView>
        </SView>
    }
    getUsuario(data) {

        var usuarios = Model.usuario.Action.getByKey(data.key_usuario);
        if (!usuarios) {
            return <SLoad />
        }
        console.log(data);
        return (
            <SView col={"xs-12"} center>
                <SView col={"xs-7"} colSquare >
                    <SImage src={SSocket.api.root + "usuario/" + data.key_usuario} />
                </SView>
                <SText center fontSize={10}>{`${usuarios.Nombres} ${usuarios.Apellidos}`}</SText>
                <SView style={{
                    position: "absolute",
                    width: 20,
                    height: 20,
                    top: -4,
                    right: -4,
                }} onPress={() => {
                    SPopup.confirm({
                        "title": "Eliminar asistencia",
                        message: "¿Esta seguro de eliminar esta asistencia?",
                        onPress: () => {

                            Asistencia.Actions.eliminar(data, this.props.sucursal.key, this.props)
                        }
                    })

                }}>
                    <SIcon name={"Delete"} />
                </SView>
            </SView>
        )
    }
    getListaUsuarios = () => {
        if (!this.props.sucursal) return <SView />
        var data = Asistencia.Actions.getByKeySucursal({ key_sucursal: this.props.sucursal.key }, this.props);
        if (!data) return <SLoad />
        return Object.keys(data).map((key) => {
            var obj = data[key];
            if (obj.estado != 1) return null;
            return this.getItem(this.getUsuario(obj));
        })
    }
    render() {
        return (
            <SView col={"xs-12"} center>
                {/* <SText>Participantes</SText> */}
                <SView height={8} />
                <SText color={"#999"}>Ingrese el participante</SText>
                <SView height={4} />
                <SView col={"xs-12"} row>
                    {this.getAdd()}
                    <SHr />
                    {this.sincronizar()}
                    <SHr />
                    {this.getListaUsuarios()}
                </SView>

            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Participantes);