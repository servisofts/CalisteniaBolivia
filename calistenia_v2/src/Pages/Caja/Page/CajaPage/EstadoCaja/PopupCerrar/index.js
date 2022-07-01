import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
// import AppParams from '../../../../../Params/index';
import { connect } from 'react-redux';
import { SView, SText, SPopupOpen, SForm, SPopupClose, SScrollView2, SPage, SPopup, SNavigation, STheme } from 'servisofts-component';
import TiposDePago from './TiposDePago';
import Caja from '../../../..';
import SSocket from 'servisofts-socket';

class PopupCerrar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            cuenta: false,
        };
    }

    getMenos200() {
        var val = this.props.total - 200;
        if (val < 0) val = 0;
        return val;
    }



    render() {
        var MovimientosCaja = Caja.CajaMovimiento.getByKeyCaja(this.props.data.key, this.props)
        if (!MovimientosCaja) return <ActivityIndicator color={STheme.color.primary} />
        if (this.state.hidden) return <View />
        return (
            <SView col={"xs-12 md-8 xl-6"}
                withoutFeedback
                style={{
                    maxHeight: "90%",
                    height: 1000,
                    borderRadius: 8,
                    backgroundColor: STheme.color.background,
                }}>
                {SPage.backgroundComponent}
                <SScrollView2 disableHorizontal style={{
                    // flex: 1,
                }}>
                    <SView col={"xs-12"} center withoutFeedback>
                        <SView col={"xs-12"} center height={32} />
                        <SText fontSize={20}>Cerrar caja</SText>
                        <SView col={"xs-12"} style={{
                            height: 32,
                        }}></SView>
                        <SView col={"xs-12 md-10 xl-9"} flex>
                            <TiposDePago key_sucursal={this.props.data.key_sucursal} movimientos={MovimientosCaja} preventEdit onPress={(montoSalvar) => {
                                var obj = {
                                    component: "caja",
                                    type: "cierre",
                                    estado: "cargando",
                                    key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                    data: {
                                        key_caja: this.props.data.key,
                                        monto_salvar: montoSalvar,
                                        key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                                    }
                                }
                                SSocket.send(obj, true);
                                SPopupClose("cerrarCaja")
                                SNavigation.navigate("ReciboCaja", { key: this.props.data.key });
                            }} />
                        </SView>
                        <SView col={"xs-12"} style={{
                            height: 16,
                        }}></SView>
                    </SView>
                </SScrollView2>
            </SView>
        );
    }
}

const initStates = (state) => {
    return { state }
};
export default connect(initStates)(PopupCerrar);