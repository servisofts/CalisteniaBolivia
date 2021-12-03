import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SHr, SIcon, SImage, SLoad, SNavigation, SPage, SPopup, SScrollView2, SStorage, SText, SView } from 'servisofts-component'
import SSocket from 'servisofts-socket';
import BarraSuperior from '../../Components/BarraSuperior';
import BotonesPaginas from '../../Components/BotonesPaginas';
import { SSRolesPermisosGetPages, SSRolesPermisosValidate } from '../../SSRolesPermisos';
import Usuario from '../Usuario';
import Iconos from './Iconos';
// import Usuario from '../Usuario';
// import UsuarioSession from '../Usuario';
class InicioPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        if (!Usuario.Actions.getUsuarioLogueado(this.props)) {
            SNavigation.replace("carga");
            return null;
        }
        return (
            <SPage
                title="Inicio"
                preventBack
            >
                <SView
                    height
                    col={"xs-12"}
                    center
                    activeOpacity={1}
                >
                    <SView col={"xs-12"} row >
                        <Iconos ref={(ref) => { this.icons = ref }} />
                    </SView>

                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(InicioPage);