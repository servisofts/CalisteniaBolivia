import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SIcon, SLoad, SMath, SNavigation, SPage, STable2, SText } from 'servisofts-component';
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
  // alvaro
  getLista() {
    var movimientos = Actions.getEstadoFinanciero(this.fecha_inicio, this.fecha_fin, this.key_sucursal, this.props)
    if (!movimientos) return <SLoad />
    return <STable2
      header={[
        // tarea1 ✅ ✅ ✅
        { key: "fecha_venta", label: "Fecha", width: 120, order: "asc", type: "", center: true, },
        // { key: "monto_paquetes", label: "monto_paquetes", width: 140, render: (item) => { return item ? item : "0" }, icon: (<SIcon name={"Paquete"} width={12} height={12} />), },
        { key: "efectivo", label: "Efectivo", width: 120, center: true, sumar: true, renderTotal: (t) => SMath.formatMoney(t, 0), render: (item) => { return item ? SMath.formatMoney(item) : "0" }, icon: (<SIcon name={"Money"} width={12} height={12} />), },
        { key: "transferencia", label: "Transferencia", width: 140, center: true, sumar: true, render: (item) => { return item ? SMath.formatMoney(item) : "0" }, icon: (<SIcon name={"Tranfer"} width={12} height={12} />), },
        { key: "cheque", label: "Cheque", width: 60, center: true, sumar: true, render: (item) => { return item ? SMath.formatMoney(item) : "0" }, icon: (<SIcon name={"Cheque"} width={12} height={12} />), },
        { key: "tarjeta", label: "Tarjeta", width: 140, center: true, sumar: true, render: (item) => { return item ? SMath.formatMoney(item) : "0" }, icon: (<SIcon name={"Card"} width={12} height={12} />), },
        { key: "total_pagado", label: "Total pagado", width: 140, center: true, sumar: true, render: (item) => { return item ? SMath.formatMoney(item) : "0" }, icon: (<SIcon name={"Ingreso"} width={12} height={12} />), },
        { key: "egresos_banco", label: "Egresos banco", width: 100, sumar: true, center: true, render: (item) => { return item ? SMath.formatMoney(item) : "0" }, icon: (<SIcon name={"Egreso"} width={12} height={12} />), },
        { key: "egresos_caja", label: "Egresos caja", width: 120, center: true, sumar: true, render: (item) => { return item ? SMath.formatMoney(item) : "0" }, icon: (<SIcon name={"Egreso"} width={12} height={12} />), },
        { key: "-", label: "Saldo", width: 140, sumar: true, center: true, render: (item) => { return SMath.formatMoney(item.efectivo + item.egresos_caja) }, icon: (<SIcon name={"Ingreso"} width={12} height={12} />) },

      ]}
      limit={30}
      data={movimientos}
    />
  }
  render() {
    return (
      <SPage title={"Estado Financieroaa"} disableScroll>
        {this.getLista()}
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(EstadoFinanciero);