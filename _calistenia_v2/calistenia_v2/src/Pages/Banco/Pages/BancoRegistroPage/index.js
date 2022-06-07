import React, { Component } from 'react';
import { View, Text } from 'react-native';
// import Page from '../../../Component/Page/index';
import { SForm, SNavigation, SPage, SScrollView2, SView, SImage, SLoad } from 'servisofts-component'
import { connect } from 'react-redux';
import FotoPerfilComponent from '../../../../Components/FotoPerfilComponent/index';
import CuentaBanco from '../CuentaBanco';
import SSocket from 'servisofts-socket';
import BarraSuperior from '../../../../Components/BarraSuperior';
import Banco from '../..';

let ReducerName = "bancoReducer";
let component = "banco";

class BancoRegistroPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_banco = SNavigation.getParam("key");
        // if (!this.key_banco) {
        this.data = {};


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
        if (this.key_banco) {
            var bancos = Banco.Actions.getAllBancos(this.props);
            if (!bancos) return <SLoad />
            this.data = bancos[this.key_banco];
        }
        return (
            <SPage
                disableScroll
                hidden
            >
                <BarraSuperior title={"Registro de " + component} goBack={() => {
                    SNavigation.goBack();
                }} />

                <SScrollView2
                    style={{ width: "100%" }}
                    disableHorizontal
                >
                    <SView col={"xs-12"} center >
                        <FotoPerfilComponent data={this.data} component={component} style={{
                            width: 150,
                            height: 150,
                        }} />
                    </SView>
                    <SView col={"xs-12"} center >
                        <SForm
                            props={{
                                col: "xs-11 md-8 xl-6",
                                center: true,
                            }}
                            inputProps={{
                                customStyle: "calistenia",
                            }}
                            inputs={{
                                descripcion: {
                                    type: 'text',
                                    label: 'Nombre',
                                    defaultValue: this.data.descripcion,
                                    isRequired: true,
                                }
                            }}
                            onSubmit={(data) => {
                                var object = {
                                    component: component,
                                    type: this.data.key ? "editar" : "registro",
                                    estado: "cargando",
                                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                    data: {
                                        ...this.data,
                                        ...data,
                                    },
                                }
                                SSocket.send(object);

                            }}
                            onSubmitName={this.data.key ? "editar" : "registro"}
                        />
                    </SView>
                    <CuentaBanco data={this.data} navigation={this.props.navigation} />
                </SScrollView2>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(BancoRegistroPage);