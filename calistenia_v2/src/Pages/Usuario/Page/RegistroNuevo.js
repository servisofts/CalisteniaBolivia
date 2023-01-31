import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SForm, SHr, SLoad, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import HuellasDeUsuario from '../../../Services/zkteco/Components/usuario_huella/Components/HuellasDeUsuario';
import SincronizarUsuario from '../../../Services/zkteco/Components/usuario_huella/Components/SincronizarUsuario';
import { SSRolesPermisosValidate } from '../../../SSRolesPermisos';
import Sucursal_usuario from '../../sucursal_usuario';
import Actions from '../Actions';
import RolDeUsuario from './RolDeUsuario';
class RegistroCliente extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.key = SNavigation.getParam("key");
        this.key_rol = SNavigation.getParam("key_rol");
        if (!this.key_rol) {
            this.key_rol = "d16d800e-5b8d-48ae-8fcb-99392abdf61f";
        }

    }
    render_form() {
        var usr = {
            // "Nombres": "Ricky",
            // "Apellidos": "Paz",
            // "CI": "6392496",
            // "Fecha nacimiento": "1997-03-14",
            // "Correo": "ricky7.paz.d.97@gmail.com",
            // "Telefono": "+591 75395857",
            // "Password": "123"
        }
        if (this.key) {
            usr = Actions.getByKey(this.key, this.props);
            if (!usr) return <SLoad />
        }
        return <SForm
            ref={(ref) => this.form = ref}
            row
            style={{
                justifyContent: "space-between",
            }}
            inputProps={{
                col: "xs-12",
                customStyle: "calistenia",

            }}
            inputs={{
                Nombres: { label: "Nombres", isRequired: true, defaultValue: usr.Nombres, },
                Apellidos: { label: "Apellidos", isRequired: true, defaultValue: usr.Apellidos, },
                CI: { label: "CI", isRequired: true, defaultValue: usr.CI, col: "xs-5.5" },
                "Fecha nacimiento": { label: "Fecha de nacimiento", type: "date", isRequired: true, defaultValue: usr["Fecha nacimiento"], col: "xs-6" },
                Correo: { label: "Correo", type: "email", isRequired: true, defaultValue: usr.Correo, },
                Telefono: { label: "Telefono", type: "phone", isRequired: true, defaultValue: usr.Telefono, },
                Password: { label: "Password", type: "password", isRequired: true, defaultValue: usr.Password, },
            }}
            onSubmit={(values) => {
                this.setState({ loading: true })
                if (this.key) {
                    Actions.editar_async({
                        ...usr,
                        ...values
                    }, this.props).then((resp) => {
                        this.setState({ loading: false })
                        SNavigation.goBack();
                    }).catch((e) => {
                        this.setState({ loading: false })
                        SPopup.alert("Error en al editar el dato " + e.error_dato)
                    })
                } else {
                    Actions.registro_async(values, this.key_rol, this.props).then((resp) => {
                        this.setState({ loading: false })
                        SNavigation.goBack();
                    }).catch((e) => {
                        this.setState({ loading: false })
                        SPopup.alert("Error en el registro, " + e.error_dato)
                    })
                }

            }}
        />
    }

    render_btn_aceptar() {
        return <SButtom props={{ type: "outline" }} loading={this.state.loading} onPress={() => {
            this.form.submit();
        }}>{(this.key ? "Editar" : "Crear")}</SButtom>
    }
    render_btn_eliminar() {
        if (!this.key) return null;
        var usr = Actions.getByKey(this.key, this.props);
        return <SButtom props={{ type: "danger" }} loading={this.state.loading} onPress={() => {
            this.setState({ loading: true })
            Actions.editar_async({
                ...usr,
                estado: 0,
            }, this.props).then((resp) => {
                this.setState({ loading: false })
                SNavigation.goBack();
            }).catch((e) => {
                this.setState({ loading: false })
                SPopup.alert("Error en al editar el dato " + e.error_dato)
            })
        }}>{"Eliminar"}</SButtom>
    }

    render_componentes_bottom() {
        var space = 24;
        if (!this.key) return null;
        var usr = Actions.getByKey(this.key, this.props);
        return <SView col={"xs-12"} center>
            <SHr height={space} />
            <SHr height={1} color={STheme.color.card} />
            <SHr height={space} />
            <HuellasDeUsuario key_usuario={this.key} />
            <SHr />
            <SincronizarUsuario key_usuario={this.key} />
            <SHr height={space} />
            <SHr height={1} color={STheme.color.card} />
            <SHr height={space} />
            <RolDeUsuario data={usr} />
            <SHr height={space} />
            <SHr height={1} color={STheme.color.card} />
            <SHr height={space} />
            {this.getSucursalesA()}
            <SHr height={space} />

        </SView>
    }

    getSucursalesA() {
        if (!SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "editar_usuario_sucursal" })) {
            return null;
        }
        if (!this.key) return null;
        return (
            <SView col={"xs-12"} center>
                <SText color={"#999"} fontSize={16}>Sucursales</SText>
                <SHr height={8} />
                <SText color={"#999"} fontSize={12}>El usuario solo podra ver y manejar las sucursales activas.</SText>
                <SHr height={16} />
                <Sucursal_usuario.Components.Select key_usuario={this.key} />
            </SView>
        )
    }
    render() {

        return (
            <SPage title={"Registro"}>
                <SView col={"xs-12"} center>
                    <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center>
                        {this.render_form()}
                        <SView row col={"xs-12"} center>
                            {this.render_btn_eliminar()}
                            <SView width={8} />
                            {this.render_btn_aceptar()}
                        </SView>
                    </SView>
                    {this.render_componentes_bottom()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RegistroCliente);