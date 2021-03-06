import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SText, SLoad, SDate, SView, SHr, SMath, STheme, SIcon, SButtom, SNavigation } from 'servisofts-component';
import fondo_inversion from '../../fondo_inversion';
import fondo_inversion_usuario from '../../fondo_inversion_usuario';
class lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getItem(data = { key, descripcion, observacion, fecha_inicio, fecha_fin, estado, cantidad_acciones, precio_accion, monto_maximo }) {
        var montoInvertido = 0;
        if (data.inversiones) {
            data.inversiones.map((inv) => {
                if (!inv.fecha_aprobacion) return;
                montoInvertido += inv.inversion;
            })
        }

        return <>
            <SHr height={16} />
            <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} card center>
                <SHr />
                <SText fontSize={18} col={"xs-11"} bold>{data.descripcion}</SText>
                <SHr />
                <SText fontSize={14} col={"xs-11"} color={STheme.color.lightGray}>{data.observacion}</SText>
                <SHr />
                <SHr />
                <SHr />
                <SHr />
                <SView row col={"xs-11"}>
                    <SView center col={"xs-12"}>
                        <SText fontSize={16} bold>Bs. {SMath.formatMoney(montoInvertido)}</SText>
                        <SText fontSize={12} color={STheme.color.lightGray}>Monto invertido</SText>
                    </SView>
                    <SHr />
                    <SView center col={"xs-6"}>
                        <SText fontSize={16} bold>Bs. {SMath.formatMoney(data["precio_accion"])}</SText>
                        <SText fontSize={12} color={STheme.color.lightGray}>Precio de la accion </SText>
                    </SView>
                    <SView center col={"xs-6"}>
                        <SText fontSize={16} bold>{parseFloat(montoInvertido / data.precio_accion).toFixed(1)} </SText>
                        <SText fontSize={12} color={STheme.color.lightGray}># Acciones:</SText>
                    </SView>
                </SView>
                <SHr />
                <SHr />
                <SHr />
                <SView row col={"xs-11"}>
                    <SView center col={"xs-6"}>
                        <SText fontSize={12} color={STheme.color.lightGray}>Inicia:</SText>
                        <SText fontSize={12} color={STheme.color.lightGray}>{new SDate(data.fecha_inicio).toString("dd de MONTH, yyyy")} </SText>
                    </SView>
                    <SView center col={"xs-6"}>
                        <SText fontSize={12} color={STheme.color.lightGray}>Termina:</SText>
                        <SText fontSize={12} color={STheme.color.lightGray}>{new SDate(data.fecha_fin).toString("dd de MONTH, yyyy")} </SText>
                    </SView>
                </SView>
                <SHr />
                <SHr />
                <SHr />
                <SHr />
                <SView style={{
                    width: 140,
                    height: 35,
                }} card center onPress={() => {
                    SNavigation.navigate("mis_inversiones/perfil", { key: data.key });
                }} row>
                    <SIcon name={"Money"} width={20} />
                    <SView width={16} />
                    <SText bold fontSize={11}>VER</SText>
                </SView>
                <SHr />
            </SView>
        </>
    }

    getDisponibles() {
        var data_inversiones = fondo_inversion_usuario.Actions.getMisInversiones(this.props.state.usuarioReducer.usuarioLog.key, this.props);
        var data = fondo_inversion.Actions.getAll(this.props);
        if (!data) return <SLoad />
        if (!data_inversiones) return <SLoad />

        var lista = Object.keys(data).filter(itm => {
            var obj = data[itm];
            var listaInver = data_inversiones.find(itm => itm.key_fondo_inversion == obj.key);
            return (obj.estado == 1) && listaInver != null;
        })

        return lista.map(key => {
            var obj = data[key];
            var listaInver = data_inversiones.filter(itm => itm.key_fondo_inversion == obj.key);
            obj["inversiones"] = listaInver;
            return this.getItem(obj);
        })
    }

    render() {
        return (
            <SPage title={'Mis Inversiones'}>
                <SView col={"xs-12"} center>
                    {this.getDisponibles()}
                    <SView height={50} />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(lista);