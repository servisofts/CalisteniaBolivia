import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SForm, SLoad, SNavigation, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import Paquete from '../..';
import BarraSuperior from '../../../../Components/BarraSuperior';
import FotoPerfilComponent from '../../../../Components/FotoPerfilComponent';
import Sucursal_paquete from '../../../sucursal_paquete';
import ServicioDePaquete from '../ServicioDePaquete';

class Registro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicios: {}
    };
    this.key_paquete = SNavigation.getParam("key");
    props.state.paqueteReducer.estado = ""
  }
  getForm() {

    return <SForm
      ref={(ref) => { this.form = ref }}
      col={"xs-12"}
      row
      props={{
        col: "xs-12",
        dir: "row",
      }}
      style={{
        justifyContent: "space-between",
      }}
      inputProps={{
        customStyle: "calistenia",
        col: "xs-12"
      }}
      // Alvaro: se agregao Estado motivo
      // tare2 la liberia tiene que actualizar
      inputs={{
        descripcion: { label: 'Descripcion', type: 'text', isRequired: true, defaultValue: this.data.descripcion },
        precio: { label: 'Precio', type: 'money', isRequired: true, defaultValue: parseFloat(this.data.precio || 0).toFixed(2) || null, col: "xs-5.5" },
        dias: { label: 'Cantidad de dias', type: 'number', isRequired: true, defaultValue: this.data.dias, col: "xs-5.5" },
        participantes: { label: 'Participantes', type: 'number', isRequired: true, defaultValue: this.data.participantes, col: "xs-12" },
        requiere_motivo: { label: <SText bold width={150} >Estado Motivo</SText>, type: 'checkBox', isRequired: false, defaultValue: this.data.requiere_motivo },
      }}
      onSubmit={(data) => {
        var serviciosSelec = Object.keys(this.state.servicios);
        if (this.key_paquete) {
          Paquete.Actions.editar({
            ...this.data,
            ...data
          }, serviciosSelec, this.props);

          console.log("hola ", data);
        } else {
          // if (serviciosSelec.length <= 0) {
          //     alert("Debe activar almenos 1 servicio");
          //     return;
          // }
          Paquete.Actions.registro(data, serviciosSelec, this.props);
        }
      }}
    >

    </SForm>
  }
  getEliminar(data) {
    if (!this.key_paquete) return <SView />
    var serviciosSelec = Object.keys(this.state.servicios);
    return <> <SButtom props={{
      type: "danger",
      variant: "confirm"
    }}
      onPress={() => {
        Paquete.Actions.editar({
          ...data,
          estado: (data.estado == 1 ? 0 : 1),
        }, serviciosSelec, this.props);
      }}
    >{data.estado == 1 ? "Eliminar" : "Recuperar"}</SButtom>
      <SView col={"xs-1"} />
    </>
  }
  getPerfil() {
    var data = {}
    if (this.key_paquete) {
      data = Paquete.Actions.getByKey(this.key_paquete, this.props);
      if (!data) return <SLoad />
    }
    this.data = data;
    return (<><SView center col={"xs-10 md-8 lg-6 xl-4"}>
      {!this.key_paquete ? <SView /> : <SView style={{
        width: 150,
        height: 150,
      }}><FotoPerfilComponent data={data} component={"paquete"} />
      </SView>}
      {this.getForm()}
      {/* <SView height={32} /> */}
    </SView>
      {/* <ServicioDePaquete keyPaquete={data.key} onChange={(resp) => {
                this.setState({ servicios: resp });
            }} /> */}
      <Sucursal_paquete.Components.Select key_paquete={this.key_paquete} />
      <SView col={"xs-11"} row center>
        {this.getEliminar(data)}
        <SButtom props={{
          type: "outline"
        }}
          onPress={() => {
            this.form.submit();
          }}
        >{(this.key_paquete ? "Editar" : "Crear")}</SButtom>
      </SView>
    </>)
  }
  render() {
    if (this.props.state.paqueteReducer.estado == "exito" && this.props.state.paqueteReducer.type == "registro") {
      this.props.state.paqueteReducer.estado = ""
      SNavigation.goBack();
    }
    if (this.props.state.paqueteReducer.estado == "exito" && this.props.state.paqueteReducer.type == "editar") {
      this.props.state.paqueteReducer.estado = ""
      SNavigation.goBack();
    }
    return (
      <SPage hidden disableScroll>
        <BarraSuperior title={(this.key_paquete ? "Perfil de" : "Registro de") + " paquete"} goBack={() => {
          SNavigation.goBack();
        }} />
        <SScrollView2 disableHorizontal>
          <SView center col={"xs-12"}>
            {this.getPerfil()}
          </SView>
          <SView height={32} />
        </SScrollView2>

      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Registro);