import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import Parent from ".."
import FloatButtom from '../../../../../Components/FloatButtom';
import TimeLine from '../Components/TimeLine';
class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
        Parent.struct.fk.map((item) => {
            this[item] = SNavigation.getParam(item);
        })
    }

    getSceneData() {
        var data = Parent.Actions.getByKey(this.key, this.props);
        if (!data) return <SLoad />
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
                        <SText fontSize={16} bold>{`( 0 / ${data["cantidad_acciones"]} )`}</SText>
                    </SView>
                    <SText fontSize={12} color={STheme.color.lightGray}>Acciones vendidas</SText>
                    <SHr />
                </SView>
            </SView>
        </SView>
    }


    render() {
        return (
            <>
                <SPage title={'Perfil'}>
                    <SHr />
                    <SHr />
                    {this.getSceneData()}
                    <SHr />
                    <SHr />
                    <SHr />
                    <SHr />
                    <TimeLine key_fondo_inversion={this.key} />

                    <SHr height={50} />
                </SPage>
                <FloatButtom onPress={() => {
                    SNavigation.navigate("fondo_inversion_preventa/registro", { key_fondo_inversion: this.key });
                }} />
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Perfil);