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


    clearData() {
        Model.pedido.Action.CLEAR();
        Model.horario.Action.CLEAR();
        Model.pack.Action.CLEAR();
        Model.restaurante.Action.CLEAR();
        Model.favorito.Action.CLEAR();
        Model.publicacion.Action.CLEAR();
    }
    // loadData() {
    //     this.restaurantes = Model.restaurante.Action.getAllFilters();
    //     this.pedidos_en_curso = Model.pedido.Action.getEnCurso();
    //     if (!this.restaurantes) return null;
    //     // if (!this.pedidos_en_curso) return null;
    //     return true;
    // }

    // render_list_recomendados() {
    //     if (!this.loadData()) return <SLoad />
    //     return <SView col={"xs-12"} height={195}>
    //         <SScrollView2>
    //             <SList horizontal center initSpace={8}
    //                 data={this.restaurantes}
    //                 limit={5}
    //                 render={(obj) => {
    //                     return <Restaurante.Card data={obj} onPress={(data) => {
    //                         SNavigation.navigate("/restaurante", { pk: data.key })
    //                     }} />
    //                 }}
    //             />
    //         </SScrollView2>
    //     </SView>
    // }
    // render_list_cerca() {
    //     if (!this.loadData()) return <SLoad />
    //     return <SView col={"xs-12"} height={195}>
    //         <SScrollView2>
    //             <SList horizontal center initSpace={8}
    //                 data={this.restaurantes}
    //                 limit={5}
    //                 order={[{ key: "distancia", order: "asc", peso: 1 }]}
    //                 render={(obj) => {
    //                     return <Restaurante.Card data={obj} onPress={(data) => {
    //                         SNavigation.navigate("/restaurante", { pk: data.key })
    //                     }} />
    //                 }}
    //             />
    //         </SScrollView2>
    //     </SView>
    // }
    // render_pedidos_en_curso() {
    //     if (!this.pedidos_en_curso) return null;
    //     if (!this.pedidos_en_curso.length) return null;
    //     return <SView col={"xs-12"} height={195}>
    //         <SHr height={20} />
    //         <SText style={{ paddingLeft: 4, fontSize: 18 }} bold>{"Pedidos en curso"}</SText>
    //         <SHr />
    //         <SScrollView2>
    //             <SList horizontal center initSpace={8}
    //                 data={this.pedidos_en_curso}
    //                 limit={5}
    //                 render={(obj) => {
    //                     return <Pedido.Card data={obj} onPress={(data) => {
    //                         SNavigation.navigate("/pedido", { pk: data.key })
    //                     }} />
    //                 }}
    //             />
    //         </SScrollView2>
    //     </SView>
    // }

    // render_novedades() {
    //     var novedades = Model.novedades.Action.getAll();
    //     if (!novedades) return null
    //     return <SView col={"xs-12"} height={195}>
    //         <SScrollView2>
    //             <SList
    //                 horizontal
    //                 initSpace={8}
    //                 data={novedades}
    //                 render={(data) => {
    //                     return <SView card width={318} height={150} style={{
    //                         overflow: "hidden"
    //                     }}>
    //                         <SImage src={SSocket.api.root + "novedades/" + data.key} style={{
    //                             resizeMode: "cover"
    //                         }} />
    //                     </SView>
    //                 }}
    //             />
    //         </SScrollView2>
    //     </SView>
    // }
    render_with_data() {
        var sucursales = Model.sucursal.Action.getAll();
        if (!sucursales) return <SLoad />

        return <SList
            buscador={"true"}
            center
            space={5}
            data={Object.values(sucursales)}
            // order={[{ key: "fecha_on", order: "desc", peso: 1, }]}
            render={(data) => {
                return <Sucursal.Card image={1} datas={data}  />
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
                    <SHr height={15} />
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