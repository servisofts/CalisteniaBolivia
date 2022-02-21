import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SPage, SText, SView, SLoad, SPopup } from 'servisofts-component';
import fondo_inversion from '../../fondo_inversion';
import fondo_inversion_sucursal from '../../fondo_inversion_sucursal';
import Finanza from '../../../../Finanza';
import PopInscritos from './PopInscritos';
class listaGanancias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total_ventas: 0,
        };
    }

    getDias(data, paquetes_vendidos, data_fondo_inversion_sucursal) {
        var fecha_inicio = new SDate(data.fecha_inicio);
        var fecha_fin = new SDate(data.fecha_fin);
        var dias = fecha_fin.diff(fecha_inicio, "days");
        var filtar_sucursales = Object.values(paquetes_vendidos).filter(paquete_venta => {
            return data_fondo_inversion_sucursal.find(fis => fis.key_sucursal == paquete_venta.caja.key_sucursal);
        })
        fecha_inicio.addDay(-1);
        let ahora = new SDate();
        var total = 0;
        let COMPONENT = Array(dias + 1).fill(0).map((j, i) => {
            fecha_inicio.addDay(1);
            var ventas_del_dia = filtar_sucursales.filter(paquete_venta => {
                return new SDate(paquete_venta.fecha_on).toString("yyyy-MM-dd") == fecha_inicio.toString("yyyy-MM-dd");
            })
            if (ahora.isBefore(fecha_inicio)) {
                return null;
            }
            let cantidad = ventas_del_dia.length
            total += cantidad;

            return <SView>
                <SHr />
                <SHr />
                <SView col={"xs-12"} row>
                    <SView width={100} center>
                        <SText> {fecha_inicio.toString("yyyy, MON dd")}</SText>
                    </SView>
                    <SView flex center>
                        <SView height={8} col={"xs-12"} card></SView>
                    </SView>
                    <SView width={80} center onPress={() => {
                        SPopup.open({
                            key: "Inscritos",
                            title: "Inscritos",
                            content: <PopInscritos ventas_del_dia={ventas_del_dia} fecha={fecha_inicio.toString("yyyy, MONTH dd")} />
                        })
                    }}>
                        <SText> {cantidad}</SText>
                    </SView>
                </SView>

            </SView>
        })
        if (this.state.total_ventas != total) {
            if (this.props.onChangeTotal) {
                this.props.onChangeTotal(total);
            }
            this.setState({ total_ventas: total })
        }
        return COMPONENT;
    }
    getFondo() {
        var data = fondo_inversion.Actions.getByKey(this.props.key_fondo_inversion, this.props);
        var sucursales = fondo_inversion_sucursal.Actions.getByKeyFondoInversion(this.props.key_fondo_inversion, this.props);
        if (!data) return <SLoad />
        if (!sucursales) return <SLoad />

        var paquetes_vendidos = Finanza.Actions.getPaquetesVendidos({
            fecha_desde: new SDate(data.fecha_inicio).toString("yyyy-MM-dd"),
            fecha_hasta: new SDate(data.fecha_fin).toString("yyyy-MM-dd")
        }, this.props);
        if (!paquetes_vendidos) return <SLoad />

        return <SView col={"xs-12"} >
            {this.getDias(data, paquetes_vendidos, sucursales)}
        </SView>
    }

    render() {
        var data = fondo_inversion.Actions.getByKey(this.props.key_fondo_inversion, this.props);
        if (!data) return <SLoad />
        var fecha_inicio = new SDate(data.fecha_inicio);
        if (new SDate().isBefore(fecha_inicio)) return null;
        return (
            <SView col={"xs-12 md-8 xl-4"}>
                <SHr />
                <SHr />
                <SView row>
                    <SView col={"xs-3"} center>
                        <SText fontSize={16}>Fecha</SText>
                    </SView>
                    <SView flex center />
                    <SView col={"xs-3"} center>
                        <SText bold fontSize={18}># {this.state.total_ventas}</SText>
                    </SView>
                </SView>
                {this.getFondo()}
                <SHr />
                <SHr />
                <SHr />
                <SHr />
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(listaGanancias);