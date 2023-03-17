import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SNavigation, SOrdenador, SPage, SScrollView2, SText, SView } from 'servisofts-component';
import Paquete from '..';
import Sucursal from '..';
import BarraSuperior from '../../../Components/BarraSuperior';
import Buscador from '../../../Components/Buscador';
import FloatButtom from '../../../Components/FloatButtom';
import { SSRolesPermisosValidate } from '../../../SSRolesPermisos';
import sucursal_paquete from '../../sucursal_paquete';
import sucursal_usuario from '../../sucursal_usuario';
import PaqueteItem from './PaqueteItem';

class PaquetePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.onSelect = SNavigation.getParam("onSelect");
    }
    getLista() {

        var data = Paquete.Actions.getAll(this.props);
        var data_sucursal_paquete = sucursal_paquete.Actions.getAll(this.props);
        var sucursales_activas = sucursal_usuario.Actions.getActive(this.props);
        if (!data) return <SLoad />;
        if (!data_sucursal_paquete) return <SLoad />;
        if (!sucursales_activas) return <SLoad />;
        if (!this.state.buscador) return <SLoad />
        // return 
        var isAll = SSRolesPermisosValidate({ page: "SucursalPage", permiso: "admin_all" });
        return new SOrdenador([
            // { key: "Peso", order: "desc", peso: 4 },
            { key: "Descripcion", order: "asc", peso: 2 },
        ]).ordernarObject(
            this.state.buscador.buscar(data)
        ).map((key) => {
            var isActive = false;
            if (!isAll) {
                var arr_ps = Object.values(data_sucursal_paquete).filter(o => o.key_paquete == key && o.estado != 0).map((p_s_a) => {
                    if (!isActive) {
                        isActive = sucursal_usuario.Actions.isActive(p_s_a.key_sucursal, this.props);
                    }
                });
                if (!isActive) return null;
            }

            return <PaqueteItem key_paquete={key} onPress={(obj) => {
                if (this.onSelect) {
                    this.onSelect(obj);
                    return;
                }
                SNavigation.navigate("PaquetePage/perfil", {
                    key: key
                })
            }} />
        })
    }
    render() {
        return (
            <SPage title={'PaquetePage'} hidden disableScroll>
                <BarraSuperior title={"Paquetes"} navigation={this.props.navigation} goBack={() => {
                    SNavigation.goBack();
                }} />
                <Buscador placeholder={"Buscar..."} ref={(ref) => {
                    if (!this.state.buscador) this.setState({ buscador: ref });
                }} repaint={() => { this.setState({ ...this.state }) }}
                    eliminados
                />
                <SScrollView2 disableHorizontal contentContainerStyle={{ width: "100%" }}>
                    <SView center>
                        {this.getLista()}
                    </SView>
                </SScrollView2>
                <FloatButtom esconder={!SSRolesPermisosValidate({ page: "PaquetePage", permiso: "crear" })} onPress={() => {
                    SNavigation.navigate("PaquetePage/registro")
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(PaquetePage);