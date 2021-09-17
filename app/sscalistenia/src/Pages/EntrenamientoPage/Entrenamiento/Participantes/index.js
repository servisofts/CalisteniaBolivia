import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../../../Actions';
import AppParams from '../../../../Params';
import { SLoad, SPopup, SText, SView } from '../../../../SComponent';
import Svg from '../../../../Svg';
import SeleccionarUsuario from './SeleccionarUsuario';

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
                backgroundColor: "#66000044",
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
                        Actions.Asistencia.registro({
                            descripcion: "",
                            key_usuario: usr.key,
                            key_entrenamiento: this.props.entrenamiento.key
                        }, this.props)
                        SPopup.close("selectUser");
                    }} />
                })
            }}>
                <SText fontSize={16}>Asistencia</SText>
            </SView>
        </SView>
    }
    getUsuario(data) {
        var usuarios = Actions.Usuario.getByKey(data.key_usuario, this.props);
        if (!usuarios) {
            return <SLoad />
        }
        return (
            <SView col={"xs-12"} center>
                <SView col={"xs-7"} colSquare >
                    {this.props.state.imageReducer.getImage(AppParams.urlImages + "usuario_" + data.key_usuario, {
                        width: "100%",
                        objectFit: "cover",
                        resizeMode: "cover",

                    })}
                </SView>
                <SText center fontSize={10}>{`${usuarios.Nombres} ${usuarios.Apellidos}`}</SText>
            </SView>
        )
    }
    getListaUsuarios = () => {
        var data = Actions.Asistencia.getByKeyEntrenamiento({ key_entrenamiento: this.props.entrenamiento.key }, this.props);
        if (!data) return <SLoad />
        return Object.keys(data).map((key) => {
            var obj = data[key];
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
                <SView col={"xs-12"} row >
                    {this.getAdd()}
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