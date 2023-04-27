import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SInput, SNavigation, SPage, SText, SView } from 'servisofts-component';

const socios = 0;

class registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        "nro": {
          label: "Nro Prestamo",
          value: null,
          type: "text",
          col: "xs-11.8",
          isRequired: true,
        },
        "descripcion": {
          label: "Prestamista",
          value: null,
          type: "text",
          col: "xs-11.8",
          isRequired: true,
        },


        "monto_prestamo": {
          label: "Monto",
          value: null,
          type: "money",
          isRequired: true,
        },
        "porcentaje": {
          label: "porcentaje interes",
          value: null,
          type: "money",
          isRequired: true,
        },
        "inicio prestamo": {
          label: "Fecha de inicio",
          value: null,
          type: "date",
          isRequired: true,
        },
        "fin prestamo": {
          label: "Fecha de fin",
          value: null,
          type: "date",
          isRequired: true,
        },
        "estado": {
          label: "Estado",
          value: null,
          type: "text",
          col: "xs-11.8",
          isRequired: true,
        },
        "tasa_interes": {
          label: "Tasa de interes",
          value: null,
          type: "text",
          col: "xs-11.8",
          isRequired: true,
        },
      }
    };
    this.key = SNavigation.getParam("key");
    this._ref = {};

  }



  calcular(key) {
    var inputs = this.state.inputs;
    if (key == "cantidad_meses" || key == "fecha_inicio") {
      if (inputs["fecha_inicio"].value) {
        var fecha_inicio = new SDate(inputs["fecha_inicio"].value);
        if (inputs["cantidad_meses"].value) {
          fecha_inicio.addMonth(parseInt(inputs["cantidad_meses"].value));
          inputs["fecha_fin"].value = fecha_inicio.toString("yyyy-MM-dd");
        } else {
          inputs["fecha_fin"].value = fecha_inicio.toString("yyyy-MM-dd");
        }
      }
    } else {
      if (inputs["fecha_inicio"].value && inputs["fecha_fin"].value) {
        var cantodad_meses = new SDate(inputs["fecha_inicio"].value).diff(new SDate(inputs["fecha_fin"].value));
        inputs["cantidad_meses"].value = parseInt(Math.round(cantodad_meses / 30));
      }
    }

    if (inputs["monto_maximo"].value) {
      if (inputs["precio_accion"].value && key == "precio_accion") {
        inputs["cantidad_acciones"].value = parseFloat(inputs["monto_maximo"].value / inputs["precio_accion"].value).toFixed(2);
      }
      if (inputs["cantidad_acciones"].value && key == "cantidad_acciones") {
        inputs["precio_accion"].value = parseFloat(inputs["monto_maximo"].value / inputs["cantidad_acciones"].value).toFixed(2);
      }
    }

    this.setState({ inputs: { ...this.state.inputs } });
  }


  getInputs() {
    if (this.key) {
      var data = Parent.Actions.getByKey(this.key, this.props);
      if (!data) return <SLoad />
      this.data = data;
      if (!this.state.isLoad) {
        this.state.inputs.cantidad_acciones.value = data.cantidad_acciones;
        this.state.inputs.precio_accion.value = data.precio_accion;
        this.state.inputs.monto_maximo.value = data.monto_maximo;
        this.state.inputs.fecha_inicio.value = new SDate(data.fecha_inicio).toString("yyyy-MM-dd");
        this.state.inputs.fecha_fin.value = new SDate(data.fecha_fin).toString("yyyy-MM-dd");
        this.state.inputs.cantidad_meses.value = data.cantidad_meses;
        this.state.inputs.observacion.value = data.observacion;
        this.state.inputs.descripcion.value = data.descripcion;

        // this.state.inputs.tasa_interes.value = this.state.inputs.monto_prestamo.value / 2;

        // monto_prestamo
        // porcentaje
        // tasa_interes


        this.setState({ isLoad: true });
      }
    }
    return Object.keys(this.state.inputs).map((key) => {
      var obj = this.state.inputs[key];
      return <SView col={obj.col ?? "xs-6"} center>
        <SInput ref={(r) => this._ref[key] = r} customStyle={"calistenia"} col={"xs-11"} {...obj} onChangeText={(val) => {
          this.state.inputs[key].value = val;
          this.setState({ inputs: { ...this.state.inputs } });
          // this.calcular(key);
        }} />
      </SView>
    })
  }

  render() {

    return (
      <SPage title={'lista'} center>
        <SText>Registrar</SText>
        <SHr height={24} color={"transparent"}></SHr>
        <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"} center row style={{
          // paddingStart: 10,
          // paddingEnd: 10,
          // paddingTop: 0,
          // paddingBottom: 0,
        }}>
          {this.getInputs()}
        </SView>

        <SHr height={50} color={"transparent"}></SHr>
      </SPage >
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(registro);
