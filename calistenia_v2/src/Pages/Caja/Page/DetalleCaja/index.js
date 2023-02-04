import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SHr, SMath, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import Caja from '../..';
import Cabecera from './Cabecera';
import Movimientos from './Movimientos';
import Perfil from './Perfil';

class DetalleCaja extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_caja = SNavigation.getParam("key");
    }

    render() {
        var caja = Caja.Actions.getByKey(this.props, this.key_caja);
        if (!caja) return <ActivityIndicator />
        return (
            <SPage
                title="Detalle de caja "
                disableScroll
            >
                {/* <SText>{JSON.stringify(caja)}</SText> */}
                <SScrollView2 disableHorizontal>
                    <SView col={"xs-12"} center>
                        <SView col={"xs-11.8 md-8 xl-6"} center>
                            <Perfil key_usuario={caja.key_usuario} />
                            <SHr />
                            <Cabecera caja={caja} />
                        </SView>
                        <SHr />
                        <SButtom type={"danger"} onPress={() => {
                            SNavigation.navigate("ReciboCaja", { key: caja.key })
                        }}>{"IMPRIMIR"}</SButtom>
                        <Movimientos caja={caja} />
                    </SView>

                </SScrollView2>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(DetalleCaja);

