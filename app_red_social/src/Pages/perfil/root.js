import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SNavigation, SPage, SText, SView, STheme, SImage, SLoad, SButtom, SIcon, SWebView, STable2, SMath, SDate, SList, } from 'servisofts-component';
import { WebView } from 'react-native';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
import { AccentBar, Container, PButtom } from '../../Components';
import usuario_dato from '../../Model/tapeke/usuario_dato';


class index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderDataHeaderItem({ val, label }) {
        return <SView center col={"xs-4"}>
            <SText bold fontSize={16}>{val}</SText>
            <SText>{label}</SText>
        </SView>
    }
    renderDataHeader = () => {
        return <SView col={"xs-12"} row>
            {this.renderDataHeaderItem({ val: 0, label: "Publicaci..." })}
            {this.renderDataHeaderItem({ val: 0, label: "Seguidores" })}
            {this.renderDataHeaderItem({ val: 0, label: "Seguidos" })}
        </SView>
    }

    getPerfil() {
        var usuario = Model.usuario.Action.getUsuarioLog();
        if (!usuario) return <SLoad />

        return (<SView col={"xs-12"}>
            <SView col={"xs-12"} row center>
                <SView style={{
                    width: 80,
                    height: 80,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <SView style={{
                        width: "100%", height: "100%", backgroundColor: STheme.color.card, borderRadius: 100, overflow: "hidden",
                    }} border={STheme.color.card}>
                        <SImage src={SSocket.api.root + "usuario/" + usuario?.key + "?date=" + new Date().getTime()} style={{ resizeMode: 'cover', }} />
                    </SView>
                </SView>
                <SView width={8} />
                <SView flex center >
                    {this.renderDataHeader()}
                </SView>

            </SView>
            <SHr h={4} />
            <SView col={"xs-12"}>
                <SText bold fontSize={16}>{usuario["Nombres"] + " " + usuario["Apellidos"]}</SText>
                <SText fontSize={14}>{usuario["CI"]}</SText>
            </SView>
        </SView>
        )
    }
    renderMenu() {
        return <SView col={"xs-12"} row>
            <SView card padding={8} row width={130} center onPress={() => {
                SNavigation.navigate("/perfil/editar", { key: this.data.key });
            }}>
                <SText bold>Editar perfil</SText>
            </SView>
            <SView flex />
            <SView card padding={8} row width={130} center onPress={() => {
                Model.usuario.Action.unlogin();
                // SNavigation.navigate("/perfil/editar", { key: this.data.key });
            }}>
                <SText bold>Cerrar sesión</SText>
            </SView>
        </SView>
    }
    renderPublicaciones() {
        return <SView col={"xs-12"} row>
            <SView card padding={8} row width={130} center onPress={() => {
                SNavigation.navigate("/perfil/editar", { key: this.data.key });
            }}>
                <SText bold>Editar perfil</SText>
            </SView>
            <SView flex />
            <SView card padding={8} row width={130} center onPress={() => {
                Model.usuario.Action.unlogin();
                // SNavigation.navigate("/perfil/editar", { key: this.data.key });
            }}>
                <SText bold>Cerrar sesión</SText>
            </SView>
        </SView>
    }
    render() {
        return (<SPage onRefresh={() => {
            // Model.usuario.Action.CLEAR();
        }}>
            <Container>
                <SView col={"xs-12"}>
                    {this.getPerfil()}
                    <SHr />
                    <SHr />
                    {this.renderMenu()}
                    <SHr />
                    <SHr />
                    {this.renderPublicaciones()}
                </SView>
            </Container>
        </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);