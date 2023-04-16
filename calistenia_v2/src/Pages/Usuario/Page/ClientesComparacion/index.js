import { Component } from "react";
import { connect } from "react-redux";
import { SDate, SHr, SInput, SLoad, SPage, SText } from "servisofts-component";
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

      parametros: {

        // asi se tiene la fecha para clientes activos
        // "inicio": new SDate().addMonth(-1).toString("dd-MM-yyyy"),
        // "fin": new SDate().toString("dd-MM-yyyy"),

        // asi es para tener la banca que solo muestre de este mes
        // "inicio": new SDate().addMonth(-1).setDay(1).toString("dd-MM-yyyy"),
        // "fin": new SDate().toString("dd-MM-yyyy"),


        // asi es para tener la banca antes de 2 meses para comparacion
        // "inicio": new SDate().addMonth(-2).setDay(1).toString("dd-MM-yyyy"),
        // "fin": new SDate().toString("dd-MM-yyyy"),

        // asi para tener el ultimo dia del mes anterior
        // "inicio": new SDate().addMonth(-2).setDay(1).toString("dd-MM-yyyy"),
        // "fin": new SDate().addMonth(-1).setDay(-1).toString("dd-MM-yyyy"),

        // para que solo el mes y desordenado
        // "inicio": new SDate().addMonth(-2).setDay(1).toString("MONTH-dd"),
        // "fin": new SDate().toString("MM-yyyy"),

        "inicio": new SDate().addMonth(-2).setDay(1).toString("dd-MM-yyyy"),
        "fin": new SDate().toString("dd-MM-yyyy"),
        "cantidad": 0,
      },
      ...this.state,

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

  getParametros() {

    return (
      <>
        {/* <SInput ref={ref => this.setState(parametros.inicio) = ref} col={"xs-3"} type={"date"} customStyle={"calistenia"} */}
        <SInput col={"xs-3"} type={"date"} customStyle={"calistenia"}
          defaultValue={this.state.parametros.inicio.toString("dd-MM-yyyy")} placeholder={"fecha inicio"}
          onChangeText={(val) => {
            this.state.parametros.inicio = val;
            this.setState({ ...this.state })
          }}


        />
        <SInput ref={ref => this._fechaFin = ref} col={"xs-3"} type={"date"} customStyle={"calistenia"}
          defaultValue={this.state.parametros.fin.toString("dd-MM-yyyy")} placeholder={"fecha fin"}
          onChangeText={(val) => {
            this.state.parametros.inicio = val;
            this.setState({ ...this.state })
          }}

        />
        <SInput ref={ref => this._cantidadIncriptos = ref} col={"xs-3"} type={"number"} customStyle={"calistenia"}
          defaultValue={this.state.parametros.cantidad ?? 0} placeholder={"cantidad inscripto"}
          onChangeText={(val) => {
            // if (val.length < 2) return;
            this.state.parametros.cantidad = val;
            this.setState({ ...this.state })
          }}
        />

      </>
    );
  }


  getDataParametros() {
    let fini = this.state.parametros.inicio;
    let ffin = this.state.parametros.fin;
    let cinscpt = this.state.parametros.cantidad ?? 0;
    console.log("inicio " + fini + "fin " + ffin + " cant" + cinscpt)
    return (
      <>
        <SText col={"xs-11"} color={"red"}>{fini}</SText>
        <SText col={"xs-11"} color={"cyan"}>{ffin}</SText>
        <SText col={"xs-11"} color={"blue"}>{cinscpt}</SText>
      </>
    );
  }

  getBtnOk() {
    return <SText onPress={() => { this.getDataParametros() }}> boton</SText >
  }

  getLista() {
    if (!this.state.data) return <SLoad />;

    // var dias = [];

    // var fecha = new SDate("2023-03-01", "yyyy-MM-dd");
    // var fecha_limit = new SDate("2023-05-01", "yyyy-MM-dd");

    // while (fecha.isBefore(fecha_limit)) {
    //   dias.push({
    //     width: 20,
    //     key: "-" + fecha.toString("yyyy-MM-dd"),
    //     label: fecha.toString("MM/dd"), space: 0,
    //     render: (a) => {
    //       return false;
    //     },
    //     component: (a) => {
    //       if (!a) return null
    //       return <SView col={"xs-12"} height backgroundColor={"#f00"} />
    //     }
    //   })
    //   fecha.addDay(1)
    // }

    return (
      <>
        <svg width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="20" x2="20" y2="0" stroke="red" />
          <line x1="0" y1="0" x2="20" y2="20" stroke="red" />
        </svg>
      </>
    );
  }

  render() {
    this.getDataParametros();
    return (
      <SPage title={"lista"} center disableScroll>
        <SText>comparacion</SText>
        <SHr height={24} color={"transparent"}></SHr>

        {this.getParametros()}
        {this.getDataParametros()}
        {this.getBtnOk()}
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
