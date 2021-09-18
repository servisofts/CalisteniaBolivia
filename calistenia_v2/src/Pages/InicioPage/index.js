import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SIcon, SNavigation, SPage, SPopup, SStorage, SText, SView } from 'servisofts-component'
import BotonesPaginas from '../../Components/BotonesPaginas';
// import Usuario from '../Usuario';
// import UsuarioSession from '../Usuario';
class InicioPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        // if (!Usuario.getUsuarioLogueado(this.props)) {
        //     SNavigation.replace("carga")
        // }
        return (
            <SPage
                // title="Inicio"
                preventBack
            >
                <SView
                    col={"xs-12"} center
                    props={{
                        col: "xs-12",
                        variant: "center"
                    }}>
                    <BotonesPaginas
                        history={this.props.history}
                        data={[
                            // {
                            //     label: "Salir", icon: <SIcon name={"Salir"} />, onPress: () => {
                            //         SPopup.confirm({
                            //             title: "Cerrar sesión", message: "Seguro que desea desconectar su usuario?", onPress: () => {
                            //                 UsuarioSession.logout(this.props)
                            //             }
                            //         })
                            //     }
                            // },
                            // { url: "tarifa", label: "Tarifas", icon: <SIcon name={"Tarifas"} /> },
                            // { url: "parametros", label: "Parametros", icon: <SIcon name={"Parametros"} /> },
                            // { url: "palabra_restringida", label: "Palabra restringida", icon: <SIcon name={"Parametros"} /> },
                            // { url: "motivo_cancelacion", label: "motivo cancelacion", icon: <SIcon name={"Parametros"} /> },
                        ]}
                    />
                </SView>

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(InicioPage);