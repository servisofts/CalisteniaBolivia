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
                // title="Inicio"
                hidden
                preventBack
                disableScroll
            >
                <BarraSuperior title={"Inicio"} />
                <SScrollView2 disableHorizontal>
                    <SView
                        height
                        col={"xs-12"}
                        center
                        style={{
                            justifyContent: 'start',
                        }}
                        onPress={() => {
                            this.icons.stopAnimation();
                        }}
                        activeOpacity={1}
                    >
                        <SView col={"xs-11"} row >
                            <Iconos ref={(ref) => { this.icons = ref }} />
                        </SView>

                        {/* <BotonesPaginas
                        history={this.props.history}
                        data={[
                            // {
                            //     label: "Salir", icon: <SIcon name={"Salir"} />, onPress: () => {
                            //         
                            //     }
                            // },
                            // { url: "tarifa", label: "Tarifas", icon: <SIcon name={"Tarifas"} /> },
                            // { url: "parametros", label: "Parametros", icon: <SIcon name={"Parametros"} /> },
                            // { url: "palabra_restringida", label: "Palabra restringida", icon: <SIcon name={"Parametros"} /> },
                            // { url: "motivo_cancelacion", label: "motivo cancelacion", icon: <SIcon name={"Parametros"} /> },
                        ]}
                    /> */}
                    </SView>
                </SScrollView2>

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(InicioPage);