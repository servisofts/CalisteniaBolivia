import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';

import fondo_inversion from '../../fondo_inversion';
import fondo_inversion_usuario from '../../fondo_inversion_usuario';

class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_fondo_inversion = SNavigation.getParam("key");
    }

    getDetalle() {
        var data_fondo_inversion = fondo_inversion.Actions.getByKey(this.key_fondo_inversion, this.props);
        var data_inversion_usuario = fondo_inversion_usuario.Actions.filtrar({
            key_fondo_inversion: this.key_fondo_inversion,
            key_usuario_inversionista: this.props.state.usuarioReducer.usuarioLog.key
        }, this.props);
        if (!data_fondo_inversion) return null;
        if (!data_inversion_usuario) return null;
        return data_inversion_usuario.map((item) => {
            return <>
                <SHr height={16} />
                <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} card center row>
                    <SHr />
                    <SView col={"xs-6"} center>
                        <SText>{new SDate(item.fecha_on).toString("dd/MM/yyyy hh:mm")}</SText>
                    </SView>
                    <SView col={"xs-6"} center>
                        {!item.fecha_aprobacion ? <SIcon name={"Alert"} width={30} /> : null}
                        <SText>{item.fecha_aprobacion ? "Aprobado" : "Esperando aprobacion..."}</SText>
                    </SView>
                    <SHr />
                    <SHr />
                    <SHr />
                    <SView col={"xs-6"} center>
                        <SText bold>Bs. {SMath.formatMoney(item.inversion)}</SText>
                        <SText color={STheme.color.lightGray}>Inversion</SText>
                    </SView>
                    <SView col={"xs-6"} center>
                        <SText bold>Bs. {SMath.formatMoney(item.comision)}</SText>
                        <SText color={STheme.color.lightGray}>Comision</SText>
                    </SView>

                    <SHr />
                </SView>
            </>
        })
    }
    getSceneData() {
        var data = fondo_inversion.Actions.getByKey(this.key_fondo_inversion, this.props);
        var montoi = fondo_inversion_usuario.Actions.getMontoInvertido(this.key_fondo_inversion, this.props);
        if (!data) return <SLoad />
        if (!montoi) return <SLoad />
        return <SView col={"xs-12"} center>
            <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center card>
                <SView col={"xs-11"} center>
                    <SHr />
                    <SText fontSize={18} bold>{data.descripcion}</SText>
                    <SHr />
                    <SText fontSize={14} color={STheme.color.lightGray}>{data.observacion}</SText>
                    <SHr />
                    <SHr />
                    <SHr />
                    <SText fontSize={16} bold>Bs. {SMath.formatMoney(data["monto_maximo"])}</SText>
                    <SText fontSize={12} color={STheme.color.lightGray}>Monto maximo</SText>
                    <SHr />
                    <SHr />
                    <SHr />
                    <SText fontSize={18} bold>Bs. {SMath.formatMoney(data["precio_accion"])}</SText>
                    <SText fontSize={12} color={STheme.color.lightGray}>Precio de la accion </SText>
                    <SHr />
                    <SHr />
                    <SHr />
                    <SView row center>
                        <SIcon name={"Ingreso"} width={14} />
                        <SView width={8} />
                        <SText fontSize={16} bold>{`( ${parseFloat(montoi["monto"] / data["precio_accion"]).toFixed(1)} / ${data["cantidad_acciones"]} )`}</SText>
                    </SView>
                    <SText fontSize={12} color={STheme.color.lightGray}>Acciones vendidas</SText>
                    <SHr />
                    {/* <SText>{JSON.stringify(montoi)}</SText> */}
                </SView>
            </SView>
        </SView>
    }

    render() {
        return (
            <SPage title={'Perfil'} center>
                {this.getSceneData()}
                {this.getDetalle()}

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Perfil);