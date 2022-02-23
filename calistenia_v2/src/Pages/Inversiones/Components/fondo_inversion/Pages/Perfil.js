import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SLoad, SMath, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import Parent from ".."
import FloatButtom from '../../../../../Components/FloatButtom';
import PopComprar from '../Components/PopComprar';
import TimeLine from '../Components/TimeLine';
import fondo_inversion_usuario from '../../fondo_inversion_usuario';
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
        var montoi = fondo_inversion_usuario.Actions.getMontoInvertido(this.key, this.props);
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
                    <SView row col={"xs-11"}>
                        <SView center col={"xs-12"}>
                            <SText fontSize={14} bold >{`( Bs. ${SMath.formatMoney(montoi.monto)} / Bs. ${SMath.formatMoney(data.monto_maximo)} )`}</SText>
                            <SText fontSize={12} color={STheme.color.lightGray}>{"Monto recaudado"} </SText>

                        </SView>
                        <SHr />
                        <SView center col={"xs-12"}>
                            <SText fontSize={14} bold>{`Bs. ${SMath.formatMoney(data.monto_maximo - montoi.monto)}`}</SText>
                            <SText fontSize={12} color={STheme.color.lightGray}>{"Monto disponible"} </SText>

                        </SView>
                        <SHr />
                        <SView center col={"xs-6"}>
                            <SText fontSize={14} bold>Bs. {SMath.formatMoney(data["precio_accion"])}</SText>
                            <SText fontSize={12} color={STheme.color.lightGray}>Precio de la accion </SText>
                        </SView>
                        <SView center col={"xs-6"}>
                            <SView row center>
                                <SIcon name={"Egreso"} width={14} />
                                <SView width={8} />
                                <SText fontSize={14} bold>{`( ${data["cantidad_acciones"] - montoi.cantidad} / ${data["cantidad_acciones"]} )`}</SText>
                            </SView>
                            <SText fontSize={12} color={STheme.color.lightGray}>Disponibles</SText>
                        </SView>
                    </SView>
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

    getButtomComprar() {
        if (!this.state.comision) {
            return <SView col={"xs-12"} center>
                <SIcon name={"Carrito"} width={30} />
                <SText>No existen preventas para esta día</SText>
            </SView>
        }
        return <SView col={"xs-12"} center>
            <SView style={{
                width: 200,
                height: 50,
            }} card center row onPress={() => {
                SPopup.open({
                    key: "popup_comprar",
                    content: <PopComprar key_fondo_inversion={this.key} />,

                })
            }}>
                <SIcon name={"Carrito"} width={30} />
                <SView width={16} />
                <SText bold fontSize={16}>COMPRAR</SText>
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
                    {this.getButtomComprar()}
                    <SHr />
                    <SHr />
                    <TimeLine key_fondo_inversion={this.key} onChangeComision={(monto) => {
                        this.setState({ comision: monto })
                    }} />

                    <SHr height={50} />
                </SPage>
                {/* <FloatButtom onPress={() => {
                    SNavigation.navigate("fondo_inversion_preventa/registro", { key_fondo_inversion: this.key });
                }} /> */}
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Perfil);