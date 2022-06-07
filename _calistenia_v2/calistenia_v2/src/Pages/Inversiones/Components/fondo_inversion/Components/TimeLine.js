import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SLoad, SMath, SOrdenador, SPage, SText, STheme, SView } from 'servisofts-component';
import Parent from "..";
import Item from '../../../../Servicio/Page/Item';
import fondo_inversion_preventa from '../../fondo_inversion_preventa';
class TimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monto_actual: 0,
            formatoF: "dd de MON, yyyy"
        };
    }

    line({ size = 50 }) {
        return <SView style={{
            width: 1, height: size
        }} backgroundColor={STheme.color.lightGray}></SView>
    }
    nodo({ backgroundColor = STheme.color.card }) {
        return <SView style={{
            width: 18, height: 18, borderRadius: 30, borderWidth: 1, borderColor: STheme.color.card, backgroundColor: backgroundColor,
        }}>

        </SView>
    }

    nodoConDetalle({ fecha, monto, backgroundColor }) {
        let space = 8;
        return <SView row center col={"xs-12"}>
            <SView flex style={{
                alignItems: "flex-end",
            }}> <SText color={STheme.color.lightGray}>{fecha}</SText></SView>
            <SView width={space} />
            {this.nodo({ backgroundColor })}
            <SView width={space} />
            <SView flex center style={{
                alignItems: "flex-start",
            }}> <SText fontSize={16}>{monto}</SText></SView>
        </SView>
    }
    getNodosPreVenta() {
        var fipd = fondo_inversion_preventa.Actions.getAll(this.props);
        if (!fipd) return <SLoad />

        var time = 0;
        var prev_date = null;
        var curTime = new SDate();
        var list = new SOrdenador([{ key: "fecha", order: "asc" }]).ordernarObject(fipd)
        list = list.filter(key => ((fipd[key].key_fondo_inversion == this.props.key_fondo_inversion) && (fipd[key].estado == 1)));
        list.push("fecha_inicio");
        // list.push("fecha_fin");
        let monto_actual = 0;
        const LIST_ITEM = list.map((key) => {
            var itm = fipd[key];
            if (key == "fecha_inicio") {
                itm = {
                    key: "fecha_inicio",
                    fecha: this.data.fecha_inicio,
                    monto: 0
                }
            }
            if (key == "fecha_fin") {
                itm = {
                    key: "fecha_fin",
                    fecha: this.data.fecha_fin,
                    monto: 0
                }
            }
            var sdate = new SDate(new Date(itm["fecha"]));
            let size = 50;
            if (prev_date) {
                var diff = sdate.diff(prev_date);
                if (diff > 0) {
                    size = diff * 4;
                }
            }
            let isBefore = false;
            if (sdate.isBefore(curTime)) {
                isBefore = true;
                monto_actual = itm["monto"];
            }
            let monto = itm["monto"];
            if (key == "fecha_inicio") {
                monto = "Inicio";
            } else if (key == "fecha_fin") {
                monto = "Fin";
            } else {
                monto = "Bs. " + parseFloat(itm["monto"]).toFixed(2);
            }
            prev_date = sdate;
            return <>
                {this.line({ size: size })}
                {this.nodoConDetalle({ fecha: sdate.toString(this.state.formatoF), monto: monto, backgroundColor: isBefore ? STheme.color.lightGray : null })}
            </>
        })
        if (this.state.monto_actual != monto_actual) {
            if(this.props.onChangeComision){
                this.props.onChangeComision(monto_actual);
            }
            this.setState({ monto_actual: monto_actual });
        }
        return LIST_ITEM
    }
    getMontoActual() {
        return <SView card style={{
            width: 130,
            height: 50,
        }} center>
            <SView row center>
                <SText fontSize={18} bold>Bs. {SMath.formatMoney(this.state.monto_actual)}</SText>
                <SView width={8} />
                <SIcon name={"Egreso"} width={14} />
            </SView>
            <SText fontSize={10} col={"xs-12"} center>C / Pv</SText>
        </SView>
    }
    render() {
        var data = Parent.Actions.getByKey(this.props.key_fondo_inversion, this.props);
        if (!data) return <SLoad />
        this.data = data;
        return (
            <SView col={"xs-12"} center>
                {/* {this.nodoConDetalle({ fecha: "Fecha", monto: "Monto", backgroundColor: STheme.color.lightGray })} */}
                {this.getMontoActual()}
                {this.getNodosPreVenta()}


            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TimeLine);