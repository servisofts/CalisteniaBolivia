import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SDate, SIcon, SLoad, SNavigation, SPage, STable2, SText, SView } from 'servisofts-component';
import Sucursal from '../../Sucursal';
import Actions from '../Actions';


class EstadoFinanciero extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.fecha_inicio = SNavigation.getParam("fecha_inicio", new SDate().toString("yyyy-MM-dd"));
        this.fecha_fin = SNavigation.getParam("fecha_fin", new SDate().toString("yyyy-MM-dd"));
        this.key_sucursal = SNavigation.getParam("key_sucursal", "");
        // this.props.state.reporteReducer.data = null;
    }

    getLista() {
        var movimientos = Actions.getEstadoFinanciero(this.fecha_inicio, this.fecha_fin, this.key_sucursal, this.props)
        if (!movimientos) return <SLoad />
        return <STable2
            header={[
                { key: "fecha_venta", label: "fecha", width: 100, order: "desc", type: "" },
                // { key: "monto_paquetes", label: "monto_paquetes", width: 140, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Paquete"} width={12} height={12} />), },
                { key: "efectivo", label: "efectivo", width: 140, sumar:true, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Money"} width={12} height={12} />), },
                { key: "transferencia", label: "Transferencia", width: 140, sumar:true,render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Tranfer"} width={12} height={12} />), },
                { key: "cheque", label: "cheque", width: 140, sumar:true,render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Cheque"} width={12} height={12} />), },
                { key: "tarjeta", label: "tarjeta", width: 140, sumar:true,render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Card"} width={12} height={12} />), },
                { key: "total_pagado", label: "total_pagado", width: 140, sumar:true,render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Ingreso"} width={12} height={12} />), },
                { key: "egresos_banco", label: "egresos_banco", width: 140,sumar:true, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Egreso"} width={12} height={12} />), },
                { key: "egresos_caja", label: "egresos_caja", width: 140, sumar:true,render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Egreso"} width={12} height={12} />), },
                { key: "-", label: "Saldo", width: 140, sumar:true,render: (item) => { return item.efectivo + item.egresos_caja }, icon: (<SIcon name={"Ingreso"} width={12} height={12} />) },

            ]}
            limit={30}
            data={movimientos}
        />
    }
    render() {
        return (
            <SPage title={"Estado Financiero"} disableScroll>
                {this.getLista()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EstadoFinanciero);