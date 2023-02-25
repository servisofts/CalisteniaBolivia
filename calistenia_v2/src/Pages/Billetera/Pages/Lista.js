import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SImage, SLoad, SNavigation, SPage, SScrollView2, SText, SView } from 'servisofts-component';
import FloatButtom from '../../../Components/FloatButtom';
import BancoItem from '../../Banco/Pages/BancoItem';
import CuentaBancoItem from '../../Banco/Pages/CuentaBancoItem';
import Parent from "../index";
import SSocket from 'servisofts-socket'
import Usuario from '../../Usuario';
import Model from '../../../Model';
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_banco = SNavigation.getParam("key_banco");
        this.key_cuenta_banco = SNavigation.getParam("key_cuenta_banco");
    }
    getLita() {
        var data = Parent.Actions.getAll({
            key_cuenta_banco: this.key_cuenta_banco,
        }, this.props);
        var usuarios = Model.usuario.Action.getAll();
        if (!usuarios) return <SLoad />
        if (!data) return <SLoad />
        return Object.keys(data).map((key, index) => {
            var obj = data[key];
            if (obj.estado != 1) return null;
            var usr = usuarios[obj.key_usuario];
            if (!usr) usr = {};
            return <><SView col={"xs-11 md-7 xl-6"} card row onPress={() => {
                Parent.Actions._getReducer(this.props).estado = "";
                SNavigation.navigate("billetera/registro", { key: key, key_banco: this.key_banco, key_cuenta_banco: this.key_cuenta_banco });
            }}>
                <SView width={8} height />
                <SView height width={50} center>
                    <SView style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        overflow: "hidden",
                    }}>
                        <SImage src={SSocket.api.root + "usuario/" + obj.key_usuario} />
                    </SView>
                    <SText color={"#999"} fontSize={10}>{`${usr.Nombres ? usr.Nombres : ""}`}</SText>
                </SView>
                <SView width={8} height />
                <SView flex>
                    <SHr />
                    <SText color={"#999"}>{`${new SDate(obj.fecha).toString("yyyy-MM-dd")}`}</SText>
                    <SHr />
                    <SText fontSize={16}>{`${obj.codigo}`}</SText>
                    <SHr />
                    <SText color={"#999"}>{`${obj.descripcion ? obj.descripcion : "--"}`}</SText>
                    <SHr />
                </SView>
                <SView height center>
                    <SText fontSize={16}>{`Bs. ${obj.monto}`}</SText>
                </SView>
                <SView width={8} height />
            </SView>
                <SHr height={16} />
            </>
        })
    }
    render() {
        return (
            <SPage title={'Billetera'} disableScroll center>
                <SHr />
                <BancoItem key_banco={this.key_banco} />
                <SView col={"xs-11 md-7 xl-6"} center>
                    <CuentaBancoItem key_banco={this.key_banco} key_cuenta_banco={this.key_cuenta_banco} />
                </SView>
                <SView col={"xs-12"} center>
                    <SHr />
                    <SText fontSize={20}>Movimientos de billetera</SText>
                </SView>
                <SScrollView2 disableHorizontal>
                    <SView col={"xs-12"} center>
                        <SHr height={50} />
                        {this.getLita()}
                    </SView>
                </SScrollView2>
                <FloatButtom onPress={() => {
                    SNavigation.navigate("billetera/registro", { key_banco: this.key_banco, key_cuenta_banco: this.key_cuenta_banco });
                }} />
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);