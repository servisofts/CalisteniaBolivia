import { Component } from 'react';
import { SLoad, SPage, STable2 } from 'servisofts-component';
import SSocket from 'servisofts-socket';

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Reporte Name",
      func: "reporte_montos_actuales_todas_las_cajas",
      params: null,
    };
  }
  componentDidMount() {
    this.getData();
  }

  getLista() {
    if (!this.state.data) return <SLoad type='skeleton' col={"xs-12"} height />
    return <STable2
      limit={30}
      data={this.state.data}
      cellStyle={{
        fontSize: 14,
        height: 30,
      }}
      header={[
        { key: "index", label: "#" },
        { key: "descripcion", label: "Descripcion", width: 150 },
        { key: "monto", label: "Monto", width: 100, },
        { key: "key", label: "Key", width: 100, cellStyle: { fontSize: 8 } },
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