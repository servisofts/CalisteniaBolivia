import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon, SLoad, SList, SImage } from 'servisofts-component';
import { AccentBar } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import Card from './components/Card';
import Header from './components/Header';


class detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0
        };
        this.params = SNavigation.getAllParams();
    }
    contenido() {
        return <SView col={"xs-12"} row>

        </SView>
    }

    render_with_data() {
        // var paquete = Model.paquete.Action.getAll();
        // if (!paquete) return <SLoad />
        return this.contenido()
    }

    render() {
        var defaultData = {
            ...this.params,
        };

        return (
            <SPage  >
                <Header />
                <Container>
                    <SView col={"xs-12"} center>
                        <SHr height={20} />
                        <SText fontSize={17} color={STheme.color.text}>ENTRENADORES</SText>
                    </SView>
                    <SHr height={20} />

                    <SHr height={20} />
                    {this.render_with_data()}
                    <SHr height={20} />

                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(detalle);