import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SNavigation, SPage } from 'servisofts-component';
import ConfirmarPaquete from './ConfirmarPaquete';

export default class ClientePaqueteRegistroConfirmacion extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        return (
            <SPage
                // navigation={this.props.navigation}
                title={"Verifica los datos."}
                disableScroll
            >
                <ConfirmarPaquete
                    {...this.props}
                    data={{
                        key_paquete: SNavigation.getParam('key_paquete'),
                        key_usuario:  SNavigation.getParam('key_usuario'),
                        usuarios: SNavigation.getParam('usuarios'),
                        usuariosData:  SNavigation.getParam('usuariosData'),
                        tasks:  SNavigation.getParam('tasks'),
                        dataPagos:  SNavigation.getParam('dataPagos'),
                    }} />
            </SPage>
        );
    }
}
