import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SImage, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import dispositivo from '..';
import Sucursal from '../../../../../Pages/Sucursal';
import punto_venta from '../../punto_venta';
import BtnSincronizar from './BtnSincronizar';
import BtnTestConnection from './BtnTestConnection';
import SSocket from 'servisofts-socket';

class DeviceItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    // return <SView height={150} center width={100} style={{
    //     borderWidth: 1,
    //     borderColor: STheme.color.card,
    //     borderRadius: 5,
    // }} row>
    //     <SView col={"xs-12"} center height={"50"} >
    //         <SText fontSize={16}>{obj.descripcion}</SText>
    //     </SView>
    //     <SView height={50} center col={"xs-6"} style={{
    //         borderWidth: 1,
    //         borderColor: STheme.color.card,
    //         borderRadius: 5,
    //     }} onPress={() => {
    //         Parent.Actions.abrir(obj, 1, this.props);
    //     }}>
    //         <SText>{"<"}</SText>
    //     </SView>
    //     <SView height={50} center col={"xs-6"} style={{
    //         borderWidth: 1,
    //         borderColor: STheme.color.card,
    //         borderRadius: 5,
    //     }} onPress={() => {
    //         Parent.Actions.abrir(obj, 2, this.props);
    //     }}>
    //         <SText>{">"}</SText>
    //     </SView>
    //     <SView col={"xs-12"} center height={"50"} onPress={() => {
    //         SNavigation.navigate("dispositivo_historico", { key: obj.key });
    //     }} >
    //         <SText>Eventos</SText>
    //     </SView>

    //     <SHr height={1} color={STheme.color.card} />


    // </SView>

    render() {
        var obj = this.props.obj;
        var pv_obj = punto_venta.Actions.getByKey(obj.key_punto_venta, this.props);
        if (!pv_obj) return <SLoad />
        var sucs = Sucursal.Actions.getAll(this.props);
        if (!sucs) return <SLoad />
        var suc = Object.values(sucs).find(o => o.key == pv_obj.key_sucursal);


        return (
            <SView col={"xs-12"} backgroundColor={STheme.color.card} style={{
                borderRadius: 4,
            }} center onPress={this.props.onPress}>
                <SHr />
                <SView col={"xs-11"} >
                    <SView col={"xs-12"} row center>
                        <SView width={50} height={50} center >
                            <SImage src={SSocket.api.root + "sucursal/" + pv_obj.key_sucursal} />
                        </SView>
                        <SView width={8} />
                        <SView flex>
                            <SText color={STheme.color.lightGray}>{suc?.descripcion ?? "Sin sucursal"}</SText>

                        </SView>
                    </SView>
                    <SHr />

                    <SText fontSize={18}>{obj.descripcion}</SText>
                    <SHr />
                    <SText color={STheme.color.lightGray}>{obj.ip}</SText>
                    <SText color={STheme.color.lightGray} fontSize={10}>{obj.mac}</SText>
                    <SHr />
                    <SHr height={1} color={STheme.color.card} />
                    <SHr />

                    <SHr />
                    <SText color={STheme.color.lightGray}># Usuarios:{"\t"}<SText bold>{obj.usuarios}</SText></SText>
                    <SHr />
                    {/* <SText color={STheme.color.lightGray}>Last Event:{"\t"}{new SDate(obj.ultimo_evento).toString('yyyy-MONTH-dd  hh:mm')}</SText> */}
                    <SText color={STheme.color.lightGray} fontSize={12}>Sincronizado por última vez el {new SDate(obj.ultima_modificacion).toString('dd de MONTH del yyyy a las hh:mm.')}</SText>

                    <SHr />
                    <SHr height={1} color={STheme.color.card} />
                    <SHr />
                    <BtnTestConnection dispositivo={obj} />
                    <SHr />
                    <SHr height={1} color={STheme.color.card} />
                    <BtnSincronizar dispositivo={obj} key_sucursal={suc?.key ?? ""} />
                    <SHr height={1} color={STheme.color.card} />

                    <SView col={"xs-12"} center onPress={() => {
                        SNavigation.navigate("dispositivo/usuarios", { key: obj.key })
                    }}>
                        <SHr />
                        <SView col={"xs-12"} height center row>
                            <SIcon name={"Eyes"} fill={STheme.color.lightGray} height={18} width={18} />
                            <SView width={8} />
                            <SText color={STheme.color.lightGray}>Ver usuarios</SText>
                        </SView>
                        <SHr />
                    </SView>
                    <SHr height={1} color={STheme.color.card} />
                    <SView col={"xs-12"} center onPress={() => {
                        SNavigation.navigate("dispositivo_historico", { key: obj.key })
                    }}>
                        <SHr />
                        <SView col={"xs-12"} height center row>
                            <SIcon name={"Eyes"} fill={STheme.color.lightGray} height={18} width={18} />
                            <SView width={8} />
                            <SText color={STheme.color.lightGray}>Ver eventos</SText>
                        </SView>
                        <SHr />
                    </SView>
                    <SHr height={1} color={STheme.color.card} />

                    <SHr />
                </SView>
                <SHr />
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(DeviceItem);