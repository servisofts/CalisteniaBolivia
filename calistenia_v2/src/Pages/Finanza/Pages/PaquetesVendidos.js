import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SLoad, SNavigation, SPage, STable2, SText } from 'servisofts-component';
import sucursal_usuario from '../../sucursal_usuario';
import Usuario from '../../Usuario';
import Actions from '../Actions';


class PaquetesVendidos extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }
  componentDidMount() {

  }

  getDetallePago(data) {
    switch (data.key_tipo_pago) {
      case "1":
        return `Número de serie: ${data["Número de serie"]}`;
      case "3":
        return `Banco: ${data["Banco"]}\nCodigo: ${data["Código"]} `;
      case "2":
        return `Nombre: ${data["Nombre"]}\nBanco: ${data["Banco"]}\nCodigo: ${data["Código"]} `;
      case "4":
        return `Beneficiario: ${data["Beneficiario"]}\nBanco: ${data["Banco"]}\nCodigo: ${data["Código"]} `;
    }
    return data.key_tipo_pago
  }
  getLista() {

    var data = Actions.getPaquetesVendidosAll({
      fecha_desde: this.fecha_inicio,
      fecha_hasta: this.fecha_fin
    }, this.props)
    var usuarios = Usuario.Actions.getAll(this.props);
    var arr_f = sucursal_usuario.Actions.getActive(this.props);
    if (!arr_f) return <SLoad />
    if (!data) return <SLoad />
    if (!usuarios) return <SLoad />
    // return <SText>{JSON.stringify(movimientos)}</SText>

    // tarea1
    return <STable2
      header={[
        { key: "index", label: "#", width: 40 },
        { key: "sucursal", label: "Sucursal", width: 100 },
        { key: "fecha_on", label: "Fecha de registro", width: 120, order: "asc", render: (item) => { return new SDate(item).toString("yyyy-MM-dd hh:mm") } },
        {
          key: "usuarios", label: "Cliente", width: 250, render: (item) => { return item.map((key_usr) => { return `${usuarios[key_usr]?.Nombres} ${usuarios[key_usr]?.Apellidos}`.toUpperCase() }) },
          component: (arr) => { return <SText fontSize={11}>{arr.join(", ")}</SText> }
        },
        { key: "usuarios-cantidad", label: "# Cli.", sumar: true, width: 80, center: true, render: (item) => { return item.length; } },
        // { key: "tipo_pago", label: "Tipo Pago", width: 150 },
        // {
        //     key: "caja_movimiento/data", label: "Detalle", width: 350, render: (item) => {
        //         return this.getDetallePago(item)
        //     }
        // },
        { key: "paquete", label: "Paquete", width: 100 },
        { key: "observacion", label: "Motivo", width: 180 },
        { key: "total", label: "Monto", sumar: true, width: 70 },
        { key: "key_cajero", label: "Cajero", width: 250, render: (item) => { return `${usuarios[item]?.Nombres} ${usuarios[item]?.Apellidos}`.toUpperCase() } },
      ]}
      filter={(item) => { return sucursal_usuario.Actions.isActive(item.key_sucursal, this.props) }}
      limit={100}
      data={data}
    />
  }
  render() {
    this.fecha_inicio = SNavigation.getParam("fecha_inicio", new SDate().toString("yyyy-MM-dd"));
    this.fecha_fin = SNavigation.getParam("fecha_fin", new SDate().toString("yyyy-MM-dd"));
    return (
      <SPage title={`Paquetes Vendidos (${this.fecha_inicio} / ${this.fecha_fin}) `} disableScroll>
        {/* <SText>{JSON.stringify(movimientos, "\n", "\t")}</SText> */}
        {this.getLista()}
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(PaquetesVendidos);