import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon, SLoad, SList, SImage } from 'servisofts-component';
import { AccentBar } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import Mapa from './components/Mapa';
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
            <SView col={"xs-6"} center>
                <SView height={127} width={127} center style={{ borderRadius: 15, overflow: "hidden" }}>
                    <SImage src={require('../../Assets/img/entrenador1.jpg')} width={"100%"} height={"100%"}
                        style={{
                            resizeMode: 'cover',
                        }}
                    />
                </SView>
                <SText fontSize={17} center>Fabiana Santistevan</SText>
                <SHr height={5} />
                <SText fontSize={9}>2:00 pm  -  3:00 pm</SText>
                <SText fontSize={9}>4:00 pm  -  5:00 pm</SText>
            </SView>
            <SView col={"xs-6"} center>
                <SView height={127} width={127} center style={{ borderRadius: 15, overflow: "hidden" }}>
                    <SImage src={require('../../Assets/img/entrenador1.jpg')} width={"100%"} height={"100%"}
                        style={{
                            resizeMode: 'cover',
                        }}
                    />
                </SView>
                <SText fontSize={17} center>Fabiana Santistevan</SText>
                <SHr height={5} />
                <SText fontSize={9}>2:00 pm  -  3:00 pm</SText>
                <SText fontSize={9}>4:00 pm  -  5:00 pm</SText>
            </SView>
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
                        <SText fontSize={17} color={STheme.color.text}>ENTRENADORES</SText>
                    </SView>
                    <SHr height={60} />
                    {this.render_with_data()}

                    <SHr height={30} />
                </Container>
                <SHr height={40} />
                <SView col={"xs-12"} center>
                    <SText fontSize={21} color={STheme.color.text}>UBICACIÓN</SText>
                </SView>
                <SHr height={20} />
                <Mapa height={300} />
                <SHr height={50} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(detalle);