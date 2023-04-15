import { Component } from "react";
import { connect } from "react-redux";
import { SDate, SHr, SLoad, SPage, STable2, SText, SView } from "servisofts-component";
import SSocket from "servisofts-socket";

class ClientesComparacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Reporte Name",
      func: "_get_cliente_fecha_inicio",
      // params: "2023-03-01",
      // params: ["'" + pk + "'"],
      params: ["'2023-03-01'"],
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ loading: "cargando", data: null });
    SSocket.sendPromise({
      component: "reporte",
      type: "execute_function",
      func: this.state.func,
      params: this.state.params,
    })
      .then((resp) => {
        this.setState({ loading: false, data: resp.data });
      })
      .catch((e) => {
        this.setState({ loading: false, error: e });
      });
  }

  getLista() {
    if (!this.state.data) return <SLoad />;

    var dias = [];

    var fecha = new SDate("2023-03-01", "yyyy-MM-dd");
    var fecha_limit = new SDate("2023-05-01", "yyyy-MM-dd");

    while (fecha.isBefore(fecha_limit)) {
      dias.push({
        width: 20,
        key: "-" + fecha.toString("yyyy-MM-dd"),
        label: fecha.toString("MM/dd"), space: 0,
        render: (a) => {
          return false;
        },
        component: (a) => {
          if (!a) return null
          return <SView col={"xs-12"} height backgroundColor={"#f00"} />
        }
      })
      fecha.addDay(1)
    }

    return (
      <STable2
        limit={30}
        data={this.state.data}
        cellStyle={{
          fontSize: 12,
          height: 20,
        }}
        header={[
          { key: "index", label: "#", },
          ...dias
          // { width: 80, key: "key_usuario" },
          // { width: 100, key: "numero_cuenta" },
        ]}
      />
    );
  }

  render() {
    return (
      <SPage title={"lista"} center disableScroll>
        <SText>comparacion</SText>
        <SHr height={24} color={"transparent"}></SHr>

        {this.getLista()}

        <SHr height={50} color={"transparent"}></SHr>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state };
};
export default connect(initStates)(ClientesComparacion);
