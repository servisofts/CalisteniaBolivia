import { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SPage } from 'servisofts-component';
import SSocket from 'servisofts-socket';






class lista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Reporte Name",
      func: "get_ventas_por_sucursal_all",
      params: null,
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
    }).then(resp => {
      this.setState({ loading: false, data: resp.data });
    }).catch(e => {
      this.setState({ loading: false, error: e });
    })
  }
  // toStringInversionista(fondo_key, precioXaccion, inicio, fin) {
  //   var datax = fondo_inversion_usuario.Actions.getAll(this.props);
  //   if (!datax) return <SLoad />
  //   var usuarios = Model.usuario.Action.getAll();
  //   if (!usuarios) return <SLoad />
  //   return Object.keys(datax).map(keys => {
  //     const obj = datax[keys];
  //     if (obj.key_fondo_inversion != fondo_key) return;
  //     return <SView col={"xs-12"} center row>
  //       <SText color={"red"} >{"socio "
  //         + usuarios[obj.key_usuario_inversionista].Nombres + " "
  //         + usuarios[obj.key_usuario_inversionista].Apellidos + " "
  //         + "Inversion " + SMath.formatMoney(obj.inversion) + " "
  //         + "comision " + SMath.formatMoney(obj.comision) + " Bs "
  //         + "# acciones " + SMath.formatMoney(obj.inversion / precioXaccion) + " Bs"
  //         + "paquetes " + numeros + " "
  //         + "ganancia " + SMath.formatMoney((obj.inversion / precioXaccion) * 1) + " Bs"
  //         + "\n"
  //       }</SText>
  //     </SView>
  //   })
  // }

  toString() {

    // console.log("mucho ", this.state.data);
    if (!this.state.data) return <SLoad />
    console.log("mucho ", this.state.data);


    // return Object.keys(this.state.data).map(keys => {
    //   const obj = this.state.data[keys];
    //   if (obj.estado != 1) return;
    //   return <>
    //     <SView col={"xs-5"} border={"cyan"} center row>
    //       <SText>{"Suc. " + obj.descripcion + "\n"
    //         // + "Direccion " + obj.observacion + "\n"
    //         // + "Fondo " + SMath.formatMoney(obj.monto_maximo) + " Bs \n"
    //         // + "Duracion " + obj.cantidad_meses + " Meses \n"
    //         // + "Acciones " + obj.cantidad_acciones + "\n"
    //         // + "socios/paquetes " + numeros + "\n"
    //         // + "Precio x Acciones " + SMath.formatMoney(obj.precio_accion) + " Bs \n"
    //       }
    //       </SText>
    //       <SHr height={1} color={STheme.color.card} />
    //       <SHr height={4} />
    //       {/* {this.toStringInversionista(obj.key, obj.precio_accion, obj.fecha_inicio, obj.fecha_fin)} */}
    //       <SHr height={4} />
    //     </SView>
    //   </>
    // })
  }

  render() {
    return (
      <SPage title={'lista'} center>

        {this.toString()}
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(lista);
