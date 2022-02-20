import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SInput, SLoad, SMath, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import Parent from '..';
import fondo_inversion_usuario from '../../fondo_inversion_usuario';
class Comprar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compra_minima: 10,
        };
        this._ref = {}
    }

    getInputs() {
        var data = Parent.Actions.getByKey(this.props.key_fondo_inversion, this.props);
        var montoi = fondo_inversion_usuario.Actions.getMontoInvertido(this.props.key_fondo_inversion, this.props);
        if (!data) return <SLoad />
        if (!montoi) return <SLoad />
        this.montoi = montoi;
        return <SView width={200} center>
            <SInput ref={ref => this._ref["monto"] = ref} isRequired={true} type={"money"} label={"Monto"} customStyle={"calistenia"} defaultValue={SMath.formatMoney(data.precio_accion)}
                onChangeText={(value) => {
                    if (parseFloat(data.monto_maximo) < parseFloat(value) + parseFloat(montoi.monto)) {
                        return parseFloat(data.monto_maximo - montoi.monto).toFixed(2);
                    }
                }}
            />
        </SView>
    }
    getDetalleFondo() {
        var data = Parent.Actions.getByKey(this.props.key_fondo_inversion, this.props);
        if (!data) return <SLoad />

        return <SView col={"xs-11"} center>
            <SText fontSize={18} bold>{data.descripcion}</SText>
            <SHr />
            <SText fontSize={14} color={STheme.color.lightGray}>{data.observacion}</SText>
            <SHr />
            <SHr />
            <SText fontSize={18} bold>Bs. {SMath.formatMoney(data.precio_accion)}</SText>
            <SText fontSize={14} color={STheme.color.lightGray}>{"Precio de la accion"}</SText>
            <SHr />
            <SHr />
        </SView>
    }
    render() {
        return (
            <SView col={"xs-11 md-6"} height={400} backgroundColor={STheme.color.background} style={{
                borderRadius: 10,
                overflow: 'hidden',
            }} withoutFeedback>
                {SPage.backgroundComponent}
                <SView col={"xs-12"} flex center>
                    {this.getDetalleFondo()}
                    {this.getInputs()}
                    <SHr />
                    <SHr />
                    <SButtom type={"danger"} onPress={() => {
                        if (this._ref["monto"].verify()) {
                            var monto = this._ref["monto"].getValue();
                            monto = parseFloat(monto.replace(/,/g, ''));
                            if (monto < this.state.compra_minima) {
                                SPopup.alert("La compra minima es de Bs. " + SMath.formatMoney(this.state.compra_minima));
                                return;
                            }
                            if (!this.props.state.usuarioReducer.usuarioLog.key) {
                                SPopup.alert("Tiene que iniciar session con un usuario para realizar la compra.");
                                return;
                            }
                            SPopup.confirm({
                                title: "Confirmar compra",
                                message: "¿Esta seguro de realizar la compra?",
                                onPress: () => {
                                    fondo_inversion_usuario.Actions.registro({
                                        key_usuario_inversionista: this.props.state.usuarioReducer.usuarioLog.key,
                                        key_fondo_inversion: this.props.key_fondo_inversion,
                                        inversion: monto,
                                    }, this.props)
                                }
                            })
                        }

                    }}>ACEPTAR</SButtom>
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Comprar);