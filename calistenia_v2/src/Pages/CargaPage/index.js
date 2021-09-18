import React, { Component } from 'react';
import { SPage, SText, SThread, SView, SNavigation, STheme, SIcon } from 'servisofts-component';
// import Usuario from '../Usuario';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

class CargaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }
    render() {
        new SThread(2500, "cargaHilo", true).start(() => {
            // if (!Usuario.getUsuarioLogueado(this.props)) {
            // SNavigation.replace("login");
            // } else {
            SNavigation.replace("inicio");
            // }
        });
        return (
            <SPage
                hidden
                title="CargaPage"
            >
                <SView center flex backgroundColor={STheme.color.barColor}>
                    <SView
                        col={"xs-11 sm-10 md-8 lg-6 xl-4"}>
                        <SIcon
                            name={"Logo"}
                            fill={STheme.color.secondary}
                        />
                        <ActivityIndicator color={STheme.color.secondary} size={"large"} />
                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CargaPage);