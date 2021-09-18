import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SDate, SForm, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import Usuario from '..';
import BackgroundImage from '../../../Components/BackgroundImage';
import LogoAnimado from '../../CargaPage/LogoAnimado';

class RegistroCliente extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getForm() {
        return <SForm
            ref={(ref) => { this.form = ref; }}
            props={{
                col: "xs-12"
            }}
            inputProps={{
                customStyle: "calistenia",
            }}
            inputs={{
                Nombres: { label: "Usuario", isRequired: true, },
                Apellidos: { label: "Apellidos", isRequired: true, },
                CI: { label: "CI", isRequired: true, },
                "Fecha nacimiento": { label: "Fecha de nacimiento", type: "date", isRequired: true, },
                Correo: { label: "Correo", type: "email", isRequired: true, },
                Telefono: { label: "Telefono", type: "phone", isRequired: true, },
                Password: { label: "Password", type: "password", isRequired: true, },
            }}
            onSubmit={(values) => {
                // alert();
                Usuario.Actions.registro_cliente(values, this.props);
            }}
        />
    }

    alertError(error) {
        return <SView col={"xs-12 md-8 xl-6"} style={{ height: 200, borderRadius: 8, }} backgroundColor={STheme.color.background}>
            <BackgroundImage />
            <SView style={{
                width: "100%",
                height: "100%",
            }} center>
                <SText style={{ fontSize: 16, }}>El usuario ya existe</SText>
                <SView height={8} />
                <SText style={{ fontSize: 12, }}>{`Nombre: ${error["Nombres"] + " " + error["Apellidos"]}`}</SText>
                <SText style={{ fontSize: 12, }}>{`Correo: ${error["Correo"]}`}</SText>
                {/* <SText style={{ fontSize: 12, }}>{`Fecha nacimiento: ${error["Fecha nacimiento"]}`}</SText> */}
                <SText style={{ fontSize: 12, }}>{`CI: ${error["CI"]}`}</SText>
                <SText style={{ fontSize: 12, }}>{`Telefono: ${error["Telefono"]}`}</SText>
            </SView>
        </SView>
    }

    render() {
        var error = Usuario.Actions.getError("registro", this.props);
        if (error) {
            SPopup.open({ key: "errorRegistro", content: this.alertError(error) });
        }
        if (Usuario.Actions.getUsuarioLogueado(this.props)) {
            SNavigation.replace("inicio");
        }
        if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "registro") {
            this.props.state.usuarioReducer.estado = "";
            this.props.navigation.goBack();
        }
        if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "editar") {
            this.props.state.usuarioReducer.estado = "";
            this.props.navigation.goBack();
        }
        return (
            <SPage>
                <SView center>
                    <SView col={"xs-11 md-6 xl-4"} center>
                        <SView height={8} />
                        <SText fontSize={20} bold>Registra tu usuario!</SText>
                        <SView height={8} />
                        {this.getForm()}
                        <SView height={16} />
                        <SView col={"xs-11"} row center>
                            <SButtom props={{
                                type: "outline"
                            }}
                                onPress={() => {
                                    this.form.submit();
                                }}
                            >Crear</SButtom>
                        </SView>
                    </SView>

                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RegistroCliente);