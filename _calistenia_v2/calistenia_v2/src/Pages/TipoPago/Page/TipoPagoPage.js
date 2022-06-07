import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SNavigation, SPage, SScrollView2, SText, SView } from 'servisofts-component';
import TipoPago from '..';
import BarraSuperior from '../../../Components/BarraSuperior';
import Buscador from '../../../Components/Buscador';
import FloatButtom from '../../../Components/FloatButtom';
import { SSRolesPermisosValidate } from '../../../SSRolesPermisos';
import TipoPagoItem from './TipoPagoItem';

class TipoPagoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getLista() {
        var data = TipoPago.Actions.getAll(this.props);
        if (!data) return <SLoad />;
        // return 
        return Object.keys(data).map((key) => {
            return <TipoPagoItem key_tipo_pago={key} onPress={(obj) => {
                if (this.onSelect) {
                    this.onSelect(obj);
                    this.props.navigation.goBack();
                    return;
                }
                SNavigation.navigate("TipoPagoPage/perfil", {
                    key: key
                })
            }} />
        })
    }
    render() {
        return (
            <SPage title={'TipoPagoPage'} hidden disableScroll>
                <BarraSuperior title={"Tipos de pago"} navigation={this.props.navigation} goBack={() => {
                    SNavigation.goBack();
                }} />
                {/* <Buscador placeholder={"Buscar..."} ref={(ref) => {
                    if (!this.state.buscador) this.setState({ buscador: ref });
                }} repaint={() => { this.setState({ ...this.state }) }}
                /> */}
                <SScrollView2 disableHorizontal>
                    <SView center>
                        {this.getLista()}
                    </SView>
                </SScrollView2>
                {/* <FloatButtom esconder={!SSRolesPermisosValidate({ page: "TipoPagoPage", permiso: "crear" })} onPress={() => {
                    SNavigation.navigate("TipoPagoPage/registro")
                }} /> */}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TipoPagoPage);