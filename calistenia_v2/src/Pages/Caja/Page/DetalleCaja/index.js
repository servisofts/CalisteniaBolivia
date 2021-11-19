import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { SNavigation, SPage, SScrollView2, SText, SView } from 'servisofts-component';
import Caja from '../..';
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
                        </SView>
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

