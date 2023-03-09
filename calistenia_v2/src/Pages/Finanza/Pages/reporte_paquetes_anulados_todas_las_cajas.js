import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SLoad, SMath, SPage, STable2 } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../../Model';

class reporte_paquetes_anulados_todas_las_cajas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Reporte Name",
      func: "reporte_paquetes_anulados",
      params: ["'2023-01-01'", "'2024-01-01'"]
    };
  }
  componentDidMount() {
    this.getData();
  }

  getUsuarioNombre(key) {
    // if (!data.data) return;
    // if (!data.data.key_usuario) return;
    var usuarios = Model.usuario.Action.getAll();
    if (!usuarios) return;
    // var usr = usuarios[data.data.key_usuario];
    var usr = usuarios[key];
    if (!usr) return;
    let aux = usr.Nombres + " " + usr.Apellidos
    return aux;
  }


  getLista() {


    var usuarios = Model.usuario.Action.getAll();

    if (!usuarios) return <SLoad />

    if (!this.state.data) return <SLoad type='skeleton' col={"xs-12"} height />
    return <STable2
      limit={30}
      data={this.state.data}
      cellStyle={{
        fontSize: 12,
        height: 30,
      }}
      header={[
        { key: "index", label: "#" },
        { key: "sucursal", label: "Sucursal", width: 120 },

        { key: "fecha_on", label: "Fecha ON", order: "desc", peso: 1, width: 120, render: (item) => { return new SDate(item).toString("yyyy-MM-dd hh:mm") } },

        { key: "key_usuario", label: "Cliente", width: 250, render: (item) => { return `${usuarios[item]?.Nombres} ${usuarios[item]?.Apellidos}`.toUpperCase() } },




        // { key: "key_usuario", label: "Cliente", width: 200, render: (item) => { return this.getUsuarioNombre(item) } },

        {
          key: "-a", label: "Paquete", width: 150, render: (item) => { return item.paquete.descripcion }
        },
        { key: "-d", label: "Motivo", width: 100, render: (item) => { return item.paquete.motivo } },
        // { key: "-b", label: "Dias", width: 50, render: (item) => { return item.paquete.dias } },
        { key: "-c", label: "Monto", width: 70, render: (item) => { return SMath.formatMoney(item.paquete.precio) } },
        { key: "fecha_inicio", label: "Fecha INICIO", width: 120, render: (item) => { return new SDate(item).toString("yyyy-MM-dd hh:mm") } },
        { key: "fecha_fin", label: "Fecha FIN", width: 120, render: (item) => { return new SDate(item).toString("yyyy-MM-dd hh:mm") } },

        // { key: "key", label: "Cajero", width: 250, render: (item) => { return this.getUsuarioNombre(item) } },

        // { key: "key", label: "Key", width: 100, cellStyle: { fontSize: 8 } },

        { key: "key_cajero", label: "Cajero", width: 250, render: (a) => { return `${usuarios[a]?.Nombres} ${usuarios[a]?.Apellidos}`.toUpperCase() } },

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
export default connect(initStates)(reporte_paquetes_anulados_todas_las_cajas);