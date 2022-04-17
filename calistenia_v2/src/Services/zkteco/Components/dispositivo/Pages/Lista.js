import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from ".."
import SSocket from 'servisofts-socket';
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_punto_venta = SNavigation.getParam("key_punto_venta");
    }

    getLista() {
        var data = Parent.Actions.getAllByKeyPuntoVenta(this.key_punto_venta, this.props);
        if (!data) return <SLoad />;
        return data.map((obj) => {
            return <SView height={150} center width={100} style={{
                borderWidth: 1,
                borderColor: "#fff",
                borderRadius: 5,
            }} row>
                <SView col={"xs-12"} center height={"50"} >
                    <SText fontSize={16}>{obj.descripcion}</SText>
                </SView>
                <SView height={50} center col={"xs-6"} style={{
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 5,
                }} onPress={() => {
                    Parent.Actions.abrir(obj, 1, this.props);
                }}>
                    <SText>{"<"}</SText>
                </SView>
                <SView height={50} center col={"xs-6"} style={{
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 5,
                }} onPress={() => {
                    Parent.Actions.abrir(obj, 2, this.props);
                }}>
                    <SText>{">"}</SText>
                </SView>
                <SView col={"xs-12"} center height={"50"} onPress={() => {
                    SNavigation.navigate("dispositivo_historico", { key: obj.key });
                }} >
                    <SText>Eventos</SText>
                </SView>

            </SView>
        })
    }

    render() {
        return (
            <SPage title={'Lista de ' + Parent.component} disableScroll>
                <SHr />
                <SView col={"xs-12"} center row>
                    {this.getLista()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);