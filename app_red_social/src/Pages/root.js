import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Pedido, Restaurante, TopBar, Sucursal } from '../Components';
import Model from '../Model';
import SSocket from 'servisofts-socket'
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    clearData(resolv) {
        Model.sucursal.Action.CLEAR();
    }
    render_with_data() {
        var sucursales = Model.sucursal.Action.getAll();
        if (!sucursales) return <SLoad />

        return <SList
            // buscador={"true"}
            center
            space={20}
            data={sucursales}
            // order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(data) => {
                // return <SText>Hola</SText>
                return <Sucursal.Card image={1} datas={data} root={'/sucursal/detalle'} />
            }}
        />

    }
    navBar() {
        return <TopBar type={"home"} />
    }

    render() {

        return (
            <SPage
                navBar={this.navBar()}
                footer={this.footer()}
                onRefresh={this.clearData}
            >
                <Container>
                    {/* <SHr height={15} /> */}
                    {/* <SView col={"xs-12"} height={100} center style={{ borderWidth: 2, borderColor: STheme.color.secondary, borderRadius: 21 }}>
                        <SHr height={10} />
                        <SIcon name='logowhite' fill={STheme.color.text} width={200} />
                        <SHr height={10} />
                    </SView> */}
                    {/* <SHr height={15} /> */}
                    {this.render_with_data()}
                </Container>
            </SPage>
        );
    }

    footer() {
        return <BottomNavigator url={"/root"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);