import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SNavigation, SPage, SScrollView2, SText, SView } from 'servisofts-component';
import Sucursal from '..';
import BarraSuperior from '../../../Components/BarraSuperior';
import Buscador from '../../../Components/Buscador';
import FloatButtom from '../../../Components/FloatButtom';
import { SSRolesPermisosValidate } from '../../../SSRolesPermisos';
import sucursal_usuario from '../../sucursal_usuario';
import SucursalItem from './SucursalItem';

class SucursalPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onSelect = SNavigation.getParam("onSelect");
        if (typeof this.onSelect !== "function") {
            // SNavigation.goBack();
            this.onSelect = null;
        }
    }
    getLista() {
        var data = Sucursal.Actions.getAll(this.props);
        // var actives = sucursal_usuario.Actions.getActive(this.props);
        // if (!actives) return <SLoad />
        if (!data) return <SLoad />;
        // var arr= Object.values(data).filter(i=>sucursal_usuario.Actions.isActive(i.key, this.props));
        return Object.keys(data).map((key) => {
            // var select = Object.values(actives).find(o => o.key_sucursal == key);
            if (!sucursal_usuario.Actions.isActive(key, this.props)) return null;
            return <SucursalItem key_sucursal={key} onPress={(obj) => {
                if (this.onSelect) {
                    this.onSelect(obj);
                    this.props.navigation.goBack();
                    return;
                }
                SNavigation.navigate("SucursalPage/perfil", {
                    key: key
                })
            }} />
        })
    }
    render() {
        return (
            <SPage title={'SucursalPage'} hidden disableScroll>
                <BarraSuperior title={"Sucursales"} navigation={this.props.navigation} goBack={() => {
                    SNavigation.goBack();
                }} />
                <Buscador placeholder={"Buscar..."} ref={(ref) => {
                    this._buscador = ref;
                }} repaint={() => { this.setState({ ...this.state }) }}
                />
                <SScrollView2 disableHorizontal>
                    <SView center>
                        {this.getLista()}
                    </SView>
                </SScrollView2>
                <FloatButtom esconder={!SSRolesPermisosValidate({ page: "SucursalPage", permiso: "crear" })} onPress={() => {
                    SNavigation.navigate("SucursalPage/registro")
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SucursalPage);