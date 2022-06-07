import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SNavigation, SOrdenador, SPage, SScrollView2, SText, SView } from 'servisofts-component';
import Servicio from '..';
import BarraSuperior from '../../../Components/BarraSuperior';
import Buscador from '../../../Components/Buscador';
import FloatButtom from '../../../Components/FloatButtom';
import { SSRolesPermisosValidate } from '../../../SSRolesPermisos';
import Item from './Item';

class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getLista() {

        var data = Servicio.Actions.getAll(this.props);
        if (!data) return <SLoad />;
        if (!this.state.buscador) return <SLoad />
        // return 
        return new SOrdenador([
            { key: "Peso", order: "desc", peso: 4 },
            { key: "Descripcion", order: "asc", peso: 2 },
        ]).ordernarObject(
            this.state.buscador.buscar(data)
        ).map((key) => {
            return <Item key_servicio={key} onPress={(obj) => {
                if (this.onSelect) {
                    this.onSelect(obj);
                    this.props.navigation.goBack();
                    return;
                }
                // SNavigation.navigate("PaquetePage/perfil", {
                //     key: key
                // })
            }} />
        })
    }
    render() {
        return (
            <SPage hidden disableScroll>
                <BarraSuperior title={"Servicio"} navigation={this.props.navigation} goBack={() => {
                    SNavigation.goBack();
                }} />
                <Buscador placeholder={"Buscar..."} ref={(ref) => {
                    if (!this.state.buscador) this.setState({ buscador: ref });
                }} repaint={() => { this.setState({ ...this.state }) }}
                // eliminados
                />
                <SScrollView2 disableHorizontal>
                    <SView center>
                        {this.getLista()}
                    </SView>
                </SScrollView2>
                {/* <FloatButtom esconder={!SSRolesPermisosValidate({ page: "PaquetePage", permiso: "crear" })} onPress={() => {
                    SNavigation.navigate("PaquetePage/registro")
                }} /> */}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);