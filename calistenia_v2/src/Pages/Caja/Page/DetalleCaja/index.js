import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { SButtom, SHr, SMath, SNavigation, SPage, SPopup, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import Caja from '../..';
import Cabecera from './Cabecera';
import Movimientos from './Movimientos';
import Perfil from './Perfil';
import SSocket from 'servisofts-socket'
import Model from '../../../../Model';
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
                        <SHr />
                        <SButtom type={"danger"} onPress={() => {
                            SSocket.sendPromise({
                                component: "caja",
                                type: "reparar",
                                key_caja: this.key_caja,
                                key_usuario: Model.usuario.Action.getKey()
                            }).then(resp => {
                                SPopup.alert("Reparado con exito");
                                console.log(resp);
                            }).catch(e => {
                                console.error(e);
                            })
                            // SNavigation.navigate("ReciboCaja", { key: caja.key })
                        }}>{"REPARAR"}</SButtom>
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

