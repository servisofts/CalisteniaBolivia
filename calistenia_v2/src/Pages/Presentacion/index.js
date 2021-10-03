import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SHr, SIcon, SNavigation, SPage, SText, SView } from 'servisofts-component';
import LogoAnimado from '../CargaPage/LogoAnimado';
import Usuario from '../Usuario';
class Presentacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        // if (Usuario.Actions.getUsuarioLogueado(this.props)) {
        //     SNavigation.replace("inicio");
        //     return null;
        // }
        return (
            <SPage hidden>
                <SView flex center>
                    <SView col={"xs-10 md-6 xl-4"} height={200}>
                        <LogoAnimado />
                    </SView>
                    <SHr height={48} />
                    <SView width={100} colSquare onPress={() => {
                        SNavigation.navigate('login');
                    }}>
                        <SIcon name={"Salir"} />
                        <SText center>Ingresar</SText>
                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Presentacion);