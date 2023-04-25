import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SButtom, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import { BottomNavigator, Container, NavBar, Pedido, Restaurante, TopBar, Sucursal, Publicacion } from '../Components';
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
        Model.publicacion.Action.CLEAR();
    }
    render_with_data() {
        var sucursales = Model.sucursal.Action.getAll();
        if (!sucursales) return <SLoad />

        return <SList
            // buscador={"true"}
            center
            space={14}
            data={sucursales}
            // order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(data) => {
                // return <SText>Hola</SText>
                return <Sucursal.Card image={1} datas={data} root={'/sucursal/detalle'} />
            }}
        />

    }
    banner() {
        return <>
            <SView col={"xs-12 sm-10 md-8 lg-8 xl-11 xxl-11"}
                backgroundColor={STheme.color.primary}
            >
                <SView col={"xs-12"} height={470}>
                    <SImage src={require('../Assets/img/banner1.png')} style={{ resizeMode: 'cover' }} />
                </SView>
                <SHr height={20} />
                <SView col={"xs-12"} height={470}>
                    <SImage src={require('../Assets/img/banner2.png')} style={{ resizeMode: 'cover' }} />
                </SView>

            </SView>
        </>
    }
    navBar() {
        return <TopBar type={"home"} />
    }


    renderLogo() {
        return <>
            <SHr height={15} />
            <SView col={"xs-12"} height={100} center style={{ borderWidth: 2, borderColor: STheme.color.secondary, borderRadius: 21 }}>
                <SHr height={10} />
                <SIcon name='logowhite' fill={STheme.color.text} width={200} />
                <SHr height={10} />
            </SView>
            <SHr height={15} />
        </>
    }

    renderPublicaciones() {
        const propsParentItem = {
            col: "xs-12",
            height: 100,
            card: true
        }
        let publicaciones = Model.publicacion.Action.getAll();
        if (!publicaciones) return <SLoad />
        return <SList
            data={publicaciones}
            order={[{ key: "fecha_on", order: "desc" }]}
            space={30}
            render={(a) => {
                // let user = Model.usuario.Action.getByKey(a.key_usuario);
                // if (!user) return <SLoad/>
                // console.log(user);
                return <Publicacion.Card data={a}  />
            }}
        />
    }
    render() {

        return (
            <SPage
                navBar={this.navBar()}
                footer={this.footer()}
                onRefresh={this.clearData}
            >
                <Container>
                    {this.renderLogo()}
                    {this.renderPublicaciones()}
                    {/* {this.render_with_data()} */}
                    {/* {this.banner()} */}
                    <SHr height={35} />
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