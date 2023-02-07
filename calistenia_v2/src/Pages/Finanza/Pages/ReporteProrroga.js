import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SView } from 'servisofts-component';
import prorroga from '../../prorroga';
import sucursal_usuario from '../../sucursal_usuario';
import Usuario from '../../Usuario';
import Actions from '../Actions';


class ReporteProrroga extends Component {
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

    var data = Actions.getReporteProrroga({
      fecha_desde: this.fecha_inicio,
      fecha_hasta: this.fecha_fin
    }, this.props)
    var usuarios = Usuario.Actions.getAll(this.props);
    var arr_f = sucursal_usuario.Actions.getActive(this.props);
    if (!arr_f) return <SLoad />
    if (!data) return <SLoad />
    if (!usuarios) return <SLoad />
    // return <SText>{JSON.stringify(movimientos)}</SText>
    return <STable2
      header={[
        { key: "index", label: "#", width: 40 },
        { key: "fecha_on", label: "Fecha de registro", width: 120, order: "asc", render: (item) => { return new SDate(item).toString("yyyy-MM-dd hh:mm") } },
        { key: "estado", label: "estado", width: 70, render: (a) => a == 1 ? "Activo" : "Anulado" },
        { key: "key_usuario_cliente", label: "Cliente", width: 250, render: (item) => { return `${usuarios[item]?.Nombres} ${usuarios[item]?.Apellidos}` } },
        { key: "paquete", label: "paquete", width: 120 },
        // { key: "fecha_inicio", label: "fecha_inicio", width: 120, center: true },
        { key: "fecha_fin", label: "fecha_fin", width: 120, center: true },
        { key: "descripcion", label: "descripcion", width: 250 },
        { key: "dias", label: "dias", width: 70 },
        { key: "sucursal", label: "sucursal", width: 120 },
        {
          key: "key_usuario_vendedor", label: "Administrador", width: 250, render: (item) => {
            if (!item) return "";
            return `${usuarios[item]?.Nombres} ${usuarios[item]?.Apellidos}`
          }
        },
        {
          key: "key-eliminar", label: "Eliminar", width: 70, center: true,
          component: (key) => {
            if (data[key].estado != 1) return "";
            return <SView width={35} height={35} onPress={() => {
              SPopup.confirm({
                title: "Eliminar", message: "¿Esta seguro de eliminar?", onPress: () => {
                  prorroga.Actions.anular(data[key], this.props)
                }
              })
            }}>
              <SIcon name={'Delete'} />
            </SView>
          }
        },


        // { key: "total", label: "Monto", sumar: true, width: 100 },

        // { key: "paquete", label: "Paquete", width: 150 },
        // { key: "key_cajero", label: "Cajero", width: 250, render: (item) => { return `${usuarios[item]?.Nombres} ${usuarios[item]?.Apellidos}`.toUpperCase() } },

        // { key: "", label: "Sucursal", width: 150 },
      ]}
      filter={(item) => {
        return sucursal_usuario.Actions.isActive(item.key_sucursal, this.props)
      }}
      limit={100}
      data={data}
    />
  }
  render() {
    this.fecha_inicio = SNavigation.getParam("fecha_inicio", new SDate().toString("yyyy-MM-dd"));
    this.fecha_fin = SNavigation.getParam("fecha_fin", new SDate().toString("yyyy-MM-dd"));
    return (
      <SPage title={`Prorrogas de paquete (${this.fecha_inicio} / ${this.fecha_fin}) `} disableScroll>
        {/* <SText>{JSON.stringify(movimientos, "\n", "\t")}</SText> */}
        {this.getLista()}
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ReporteProrroga);