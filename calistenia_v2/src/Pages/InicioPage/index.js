import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SLoad, SNavigation, SPage, SPopup, SScrollView2, SStorage, SText, SView } from 'servisofts-component'
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
            if (SNavigation.lastRoute?.route?.name == "client") {
                return null;
            }
            SNavigation.reset("client");
            console.log("Remplazo cliente /pages/InicioPage 26")
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
                    // center
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