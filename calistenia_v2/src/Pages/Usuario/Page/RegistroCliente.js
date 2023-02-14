import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SHr, SLoad } from 'servisofts-component';
import { SButtom, SDate, SForm, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import Usuario from '..';
import BackgroundImage from '../../../Components/BackgroundImage';
import FotoPerfilComponent from '../../../Components/FotoPerfilComponent';
import HuellasDeUsuario from '../../../Services/zkteco/Components/usuario_huella/Components/HuellasDeUsuario';
import SincronizarUsuario from '../../../Services/zkteco/Components/usuario_huella/Components/SincronizarUsuario';
import LogoAnimado from '../../CargaPage/LogoAnimado';
import RolDeUsuario from './RolDeUsuario';
import sucursal_usuario from '../../sucursal_usuario';
import Sucursal_usuario from '../../sucursal_usuario';
import { SSRolesPermisosValidate } from '../../../SSRolesPermisos';
class RegistroCliente extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
        this.key_rol = SNavigation.getParam("key_rol");
        if (!this.key_rol) {
            this.key_rol = "d16d800e-5b8d-48ae-8fcb-99392abdf61f";
        }

    }
    getForm() {

        return <SForm
            ref={(ref) => { this.form = ref; }}
            row
            style={{
                justifyContent: "space-between",
            }}
            inputProps={{
                col: "xs-12",
                customStyle: "calistenia",

            }}
            inputs={{
                Nombres: { label: "Nombres", isRequired: true, defaultValue: this.usr.Nombres, },
                Apellidos: { label: "Apellidos", isRequired: true, defaultValue: this.usr.Apellidos, },
                CI: { label: "CI", isRequired: true, defaultValue: this.usr.CI, col: "xs-5.5" },
                "Fecha nacimiento": { label: "Fecha de nacimiento", type: "date", isRequired: true, defaultValue: this.usr["Fecha nacimiento"], col: "xs-6" },
                Correo: { label: "Correo", type: "email", isRequired: true, defaultValue: this.usr.Correo, },
                Telefono: { label: "Telefono", type: "phone", isRequired: true, defaultValue: this.usr.Telefono, },
                Password: { label: "Password", type: "password", isRequired: true, defaultValue: this.usr.Password, },
            }}
            onSubmit={(values) => {
                this.state.onLoad = true;
                if (this.key) {
                    Usuario.Actions.editar({
                        ...this.usr,
                        ...values
                    }, this.props);

                } else {
                    Usuario.Actions.registro(values, this.key_rol, this.props);
                }

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

    getEliminar() {
        if (!this.key) return;
        return <>
            <SButtom props={{
                type: "danger",
                variant: "confirm"
            }}
                onPress={() => {
                    Usuario.Actions.editar({
                        ...this.usr,
                        estado: 0,
                    }, this.props);
                }}
            >{("Eliminar")}</SButtom>
            <SView width={16} />

        </>
    }
    getSucursalesA() {
        if(!SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "editar_usuario_sucursal"})){
            return null;
        }
        if(!this.usr?.key) return null;
        return (
            <SView col={"xs-12 sm-10 md-8 lg-6"} center>
                <SText color={"#999"} fontSize={16}>Sucursales</SText>
                <SHr />
                <SText color={"#999"} fontSize={12}>El usuario solo podra ver y manejar las sucursales activas.</SText>
                <SHr />
                <SHr />
                <Sucursal_usuario.Components.Select key_usuario={this.usr?.key} />
            </SView>
        )
    }
    render() {

        var error = Usuario.Actions.getError("registro", this.props);
        if (error) {
            SPopup.open({ key: "errorRegistro", content: this.alertError(error) });
        }
        if (this.state.onLoad) {
            this.state.onLoad = false;
            if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "registro") {
                this.props.state.usuarioReducer.estado = "";
                SNavigation.goBack();
            }
            if (this.props.state.usuarioReducer.estado == "exito" && this.props.state.usuarioReducer.type == "editar") {
                this.props.state.usuarioReducer.estado = "";
                SNavigation.goBack();
            }
        }


        if (this.key) {
            
            this.usr = Model.usuario.Action.getByKey(this.key);
            if (!this.usr) return <SLoad />
        } else {
            this.usr = {}
        }

        return (
            <SPage title={"Registro"}>
                <SView center>
                    <SView col={"xs-11 md-6 xl-4"} center>
                        <SView height={8} />
                        <SText fontSize={20} bold>{`${this.key ? "Edita el" : "Registra tu"} usuario!`}</SText>
                        <SView height={8} />
                        {this.key ? <SView col={"xs-6"} height={150}> <FotoPerfilComponent data={this.usr} component={"usuario"} /> </SView> : null}
                        {this.getForm()}
                        <SView height={16} />
                        <SView col={"xs-11"} row center>
                            {this.getEliminar()}
                            <SButtom props={{
                                type: "outline"
                            }}
                                onPress={() => {
                                    this.form.submit();

                                }}
                            >{(this.key ? "Editar" : "Crear")}</SButtom>

                        </SView>
                        <SView height={36} />
                    </SView>
                    <SHr />
                    <SHr />
                    <HuellasDeUsuario key_usuario={this.usr?.key} />
                    <SHr />
                    <SincronizarUsuario key_usuario={this.usr?.key} />
                    <SHr />
                    <SHr />
                    <RolDeUsuario data={this.usr} />
                    <SHr />
                    <SHr />
                    {this.getSucursalesA()}
                    <SHr height={35} />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RegistroCliente);