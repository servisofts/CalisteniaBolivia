import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SButtom, SForm, SNavigation, SPage, SView } from 'servisofts-component'
import { connect } from 'react-redux';
import FotoPerfilComponent from '../../../../Components/FotoPerfilComponent/index';
import CuentaBanco from '../CuentaBanco';
import SSocket from 'servisofts-socket';
import BarraSuperior from '../../../../Components/BarraSuperior';

let ReducerName = "cuentaBancoReducer";
let component = "cuentaBanco";

class CuentaBancoRegistroPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
        var key = SNavigation.getParam("key");
        this.key_banco = SNavigation.getParam("key_banco");
        if (!key) {
            this.data = {};
        } else {
            this.data = this.props.state[ReducerName].data[this.key_banco][key];
        }

    }
    getEliminar() {
        if (!this.data.key) return null;
        return <SView col={"xs-12"} center style={{
            height: 60,
        }}>
            <SButtom props={{
                type: "danger",
                variant: "confirm"
            }} onPress={() => {
                var object = {
                    component: component,
                    type: this.data.key ? "editar" : "registro",
                    estado: "cargando",
                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                    data: {
                        key_banco: this.key_banco,
                        ...this.data,
                        estado: 0,
                    },
                }
                SSocket.send(object);
            }}> Eliminar</SButtom>
        </SView>
    }
    render() {
        var reducer = this.props.state[ReducerName]
        if (reducer.estado == "exito" && reducer.type == "registro") {
            reducer.estado = "";
            this.props.navigation.goBack();
        }
        if (reducer.estado == "exito" && reducer.type == "editar") {
            reducer.estado = "";
            this.props.navigation.goBack();
        }
        return (
            <SPage
                hidden
            >
                <BarraSuperior title={"Registro de " + component} goBack={() => {
                    SNavigation.goBack();
                }} />
                <SView col={"xs-12"} center>
                    <SView col={"xs-11 md-7 xl-5"} center>
                        <SView col={"xs-12"} center >
                            <FotoPerfilComponent data={this.data} component={component} style={{
                                width: 150,
                                height: 150,
                            }} />
                        </SView>
                        <SForm
                            props={{
                                center: true,
                                col: "xs-12"
                            }}
                            inputProps={{
                                customStyle: "calistenia",
                            }}
                            inputs={{
                                descripcion: {
                                    type: 'text',
                                    label: 'Descripcion',
                                    defaultValue: this.data.descripcion,
                                    isRequired: true,
                                    col: "xs-11 md-8 xl-6"
                                },
                                codigo: {
                                    type: 'text',
                                    label: 'Codigo',
                                    defaultValue: this.data.codigo,
                                    isRequired: true,
                                    col: "xs-11 md-8 xl-6"
                                },
                                // moneda: {
                                //     type: 'text',
                                //     label: 'Moneda',
                                //     defaultValue: this.data.moneda,
                                //     isRequired: true,
                                //     col: "xs-11 md-8 xl-6"
                                // }
                            }}
                            onSubmitProps={{
                                type: "outline"
                            }}
                            onSubmit={(data) => {
                                var object = {
                                    component: component,
                                    type: this.data.key ? "editar" : "registro",
                                    estado: "cargando",
                                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                    data: {
                                        key_banco: this.key_banco,
                                        ...this.data,
                                        ...data,
                                    },
                                }
                                SSocket.send(object);
                            }}
                            onSubmitName={this.data.key ? "Editar" : "Registro"}
                        />
                        {this.getEliminar()}
                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CuentaBancoRegistroPage);