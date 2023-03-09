import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SIcon, SLoad, SMath, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Model from '../../../Model';
import Sucursal from '../../Sucursal';

class index extends Component {
  constructor(props) {
    super(props);

    this.params = SNavigation.getAllParams();
    this.state = {
      title: "Reporte movimientos de banco",
      func: "reporte_movimientos_banco",
      params: [`'${this.params.fecha_inicio}'`, `'${this.params.fecha_fin}'`],
    };
  }
  componentDidMount() {
    this.getData();
  }

  getLista() {
    var usuarios = Model.usuario.Action.getAll();
    if (!this.state.data || !usuarios) return <SLoad type='skeleton' col={"xs-12"} height />
    return <STable2
      limit={30}
      data={this.state.data}
      cellStyle={{
        fontSize: 12,
        height: 30,
      }}
      header={[
        { key: "index", label: "#" },
        { key: "estado", label: "Estado", width: 50 },
        { key: "paquete_venta_usuario/estado", label: "Estado PV", width: 50, },
        { key: "fecha_on", label: "fecha", width: 100, render: f => new SDate(f).toString("yyyy-MM-dd hh:mm"), order: "desc" },
        { key: "monto", label: "Monto", width: 80, sumar: true, render: m => SMath.formatMoney(m, 2, ","), cellStyle: { textAlign: "end", } },
        { key: "moneda", label: "Moneda", width: 50, render: m => "BOB" },
        { key: "monto-tipo", label: "Tipo", width: 70, render: m => Math.round(m) == "0" ? "" : (m > 0 ? "INGRESO" : "EGRESO"), options: ["INGRESO", "EGRESO"], },
        {
          key: "caja_movimiento/key_tipo_pago", options: ["Efectivo", "Trasferencia", "Tarjeta", "Cheque"], label: "T. Pago", width: 80, render: (tp) => {
            switch (tp) {
              case "1": return "Efectivo"
              case "2": return "Transferencia"
              case "3": return "Tarjeta"
              case "4": return "Cheque"
            }
            return tp;
          }
        },
        { key: "caja_movimiento/descripcion", label: "Caja descripcion", width: 150 },
        { key: "banco", label: "Banco", width: 150 },
        { key: "cuenta_banco", label: "Cuenta", width: 150 },
        { key: "cuenta_banco_descripcion", label: "Cuenta", width: 150 },
        { key: "descripcion", label: "Descripcion", width: 150 },
        { key: "sucursal", label: "Sucursal", width: 100 },
        { key: "key_usuario", label: "Cajero", width: 200, render: key => !key ? "" : usuarios[key]?.Nombres + " " + usuarios[key]?.Apellidos },
        { key: "caja_movimiento/key_caja_tipo_movimiento", label: "Caja tipo movimiento", width: 50 },
        { key: "caja_movimiento/data/key_usuario", label: "Cliente", width: 200, render: key => !key ? "" : usuarios[key]?.Nombres + " " + usuarios[key]?.Apellidos },
        { key: "paquete_venta_usuario/fecha_inicio", label: "Inicio", width: 80, },
        { key: "paquete_venta_usuario/fecha_fin", label: "Fin", width: 80, },
        { key: "key", label: "Key", width: 300, cellStyle: { fontSize: 8 } },
      ]}
    />
  }
  getData() {
    this.setState({ loading: "cargando", data: null });
    SSocket.sendPromise({
      component: "reporte",
      type: "execute_function",
      func: this.state.func,
      params: this.state.params,
    }).then(resp => {
      this.setState({ loading: false, data: resp.data });
    }).catch(e => {
      this.setState({ loading: false, error: e });
    })
  }
  render() {
    return <SPage title={this.state.title} center disableScroll>
      {this.getLista()}
    </SPage>
  }
}

const initStates = (state) => {
  return { state }
};
export default connect(initStates)(index);