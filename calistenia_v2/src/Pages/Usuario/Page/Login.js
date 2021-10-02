import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SForm, SNavigation, SPage, SPopup, SView } from 'servisofts-component';
import Usuario from '..';
import LogoAnimado from '../../CargaPage/LogoAnimado';

class Login extends Component {
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
                separation:16,
            }}
            inputs={{
                usuario: {
                    placeholder: "Email",
                    isRequired: true, keyboardType: "email-address", autoCapitalize: "none", autoFocus: true, onKeyPress: (evt) => {
                        if (evt.key === "Enter") {
                            this.form.focus("password");
                        }
                    }
                },
                password: {
                    placeholder: "Password",
                    type: "password", isRequired: true, onKeyPress: (evt) => {
                        if (evt.key === "Enter") {
                            this.form.submit();
                        }
                    }
                },
            }}
            onSubmit={(data) => {
                if (data) {
                    Usuario.Actions.login(data);
                }
            }}
        />
    }


    render() {
        var error = Usuario.Actions.getError("login", this.props);
        if (error) {
            SPopup.alert("Usuario no encontrado, Verifique sus datos.");
        }
        if (this.props.state.usuarioReducer.type == "login") {
            this.props.state.usuarioReducer.type="";
            if (Usuario.Actions.getUsuarioLogueado(this.props)) {
                SNavigation.replace("inicio");
                return null;
            }
        }
        return (
            <SPage>
                <SView center>
                    <SView col={"xs-11 md-6 xl-4"} center>
                        <SView col={"xs-8"}>
                            <LogoAnimado />
                        </SView>
                        <SView height={32} />
                        {this.getForm()}
                        <SView height={16} />
                        <SView col={"xs-11"} row center>
                            <SButtom props={{
                                type: "outline"
                            }} onPress={() => {
                                this.form.submit();
                            }}>Login</SButtom>
                            <SView col={"xs-1"} />
                            <SButtom props={{
                                type: "outline"
                            }} onPress={() => {
                                SNavigation.navigate("registro");
                            }}>Registro</SButtom>
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
export default connect(initStates)(Login);