import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Pedido, Restaurante, TopBar, Sucursal } from '../../Components';
import Model from '../../Model';
import SSocket from 'servisofts-socket'
import BtnSend from './components/BtnSend';
import BtnSend2 from './components/BtnSend2';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    clearData() {
        Model.pedido.Action.CLEAR();
        Model.horario.Action.CLEAR();
        Model.pack.Action.CLEAR();
        Model.restaurante.Action.CLEAR();
        Model.favorito.Action.CLEAR();
        Model.publicacion.Action.CLEAR();
    }

    render_with_data() {
        var sucursales = Model.sucursal.Action.getAll();
        if (!sucursales) return <SLoad />

        return <SList
            buscador={"true"}
            center
            space={14}
            // data={Object.values(sucursales)}
            data={sucursales}
            // order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(data) => {
                return <Sucursal.Card image={1} datas={data} root={'/paquete/membresia'} />
            }}
        />

    }
    navBar() {
        return <TopBar type={"home"} />
    }

    render() {

        return (
            <SPage
                // navBar={this.navBar()}
                // footer={this.footer()}
                // footer={this.footer2()}
                onRefresh={this.clearData}
            >
                <Container >
                    <SHr height={15} />
                    <SView center >
                        <SIcon name={"logowhite"} fill={STheme.color.text} />
                    </SView>
                    <SHr height={35} />
                    <SView center col={"xs-10"} >
                        <SText center font="Oswald-Bold" fontSize={22}
                            style={{
                                textTransform: "uppercase"
                            }}>¿Has asistido a nuestras sucursales antes? Si es así, puedes recuperar tu cuenta aquí</SText>
                    </SView>
                    <SHr height={35} />
                    <BtnSend2 >Recuperar cuenta</BtnSend2>
                    <SHr height={35} />
                    <SView center  col={"xs-10"}>
                        <SText fontSize={12} center>
                        Si eres nuevo en nuestras sucursales, por favor crea una nueva cuenta AQUÍ
                        </SText>
                    </SView>
                    <SHr height={35} />
                </Container>
                {/* {this.footer2()} */}

            </SPage>

        );
    }

    footer2() {
        return <SView>
            <SView center style={{
                position: 'absolute',
                overflow: 'hidden',
                zIndex:-999999,
                display: 'inline-block',
                bottom: -0,
                right: 0,
                // width:"100%"
            }}>
                <SIcon name={"Footer"} fill={STheme.color.text} />
            </SView>
        </SView>
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);