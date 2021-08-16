import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AppParams from '../../../../../Params/index';
import { connect } from 'react-redux';
import { SView } from '../../../../../SComponent/SView/index';
import BackgroundImage from '../../../../../Component/BackgroundImage';
import { SText } from '../../../../../SComponent/SText/index';
import { SForm, SPopupClose } from '../../../../../SComponent';
import { SPopupOpen } from '../../../../../SComponent/SPopup/index';
import BancoSelect from '../../../../Banco/BancoSelect/index';

class PopupCerrar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            cuenta: false,
        };
    }


    render() {
        if (this.state.hidden) return <View />
        return (
            <SView col={"xs-11"}
                withoutFeedback
                style={{
                    minHeight: 350,
                    borderRadius: 8,
                }}>
                <BackgroundImage />
                <SView col={"xs-12"} center>
                    <SText fontSize={20}>Cerrar caja</SText>
                    <SForm props={{
                        variant: "center",
                        col: "xs-11 md-7 xl-6",
                        // direction: "row",
                    }}
                        inputProps={{
                            customStyle: "calistenia",
                        }}
                        inputs={{
                            cuenta: {
                                label: 'Cuenta',
                                type: "select",
                                isRequired: true,
                                placeholder: "Cuenta",
                                value: this.state.cuenta.descripcion,
                                col: "xs-11",
                                onPress: () => {
                                    SPopupOpen({
                                        key: "selectbanco",
                                        content: <BancoSelect onSelect={(cuenta_banco) => {
                                            SPopupClose("selectbanco");
                                            this.setState({ cuenta: cuenta_banco });
                                        }} />
                                    })
                                    // this.props.navigation.navigate("BancoPage", {
                                    //     onSelect: (cuenta) => {

                                    //     }
                                    // });
                                },
                            },
                            monto_caja: {
                                type: 'money',
                                label: 'monto en caja',
                                defaultValue: this.props.total + "",
                                isRequired: true,
                                col: "xs-8"
                            },
                            monto: {
                                type: 'money',
                                label: 'monto a depocitar',
                                placeholder: '0.00',
                                isRequired: true,
                                col: "xs-8"
                            },
                        }}
                        onSubmitProps={{
                            type: "danger",
                            variant: "default"
                        }}
                        onSubmitName={"Cerrar"}
                        onSubmit={(data) => {
                            var obj = {
                                component: "caja",
                                type: "cierre",
                                estado: "cargando",
                                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                data: {
                                    key_caja: this.props.data.key,  
                                    key_cuenta_banco: this.state.cuenta.key,
                                    monto: data.monto * -1,
                                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                }
                            }
                            this.props.state.socketReducer.session[AppParams.socket.name].send(obj, true);
                            SPopupClose("cerrarCaja")
                        }}
                    >

                    </SForm>
                </SView>
            </SView>
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(PopupCerrar);