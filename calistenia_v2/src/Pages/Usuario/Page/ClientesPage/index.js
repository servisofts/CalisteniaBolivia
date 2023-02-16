import { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { ExportExcel, SButtom, SDate, SImage, SLoad, SNavigation, SOrdenador, SPage, SScrollView2, SText, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Usuario from '../..';
import Buscador from '../../../../Components/Buscador';
import Model from '../../../../Model';
import Sucursal from '../../../Sucursal';
import sucursal_usuario from '../../../sucursal_usuario';
import Paquete_Item from './Paquete_Item';
import SucursalSelect from './SucursalSelect';

class ClientesPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      key_sucursal: SNavigation.getParam("key_sucursal", ""),
      soloBecados: SNavigation.getParam("becados", false),
      soloNoBecados: SNavigation.getParam("nobecados", false),
      pagination: {
        curPage: 1,
      }
    };


  }
  componentDidMount() {
    // var object = {
    //   service: "usuario",
    //   component: "usuario",
    //   version: "2.0",
    //   type: "getAll",
    //   estado: "cargando",
    //   cabecera: "registro_administrador",
    //   key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
    // }
    // SSocket.send(object);

  }
  pagination = (listaKeys) => {
    if (!listaKeys) {
      return [];
    }
    if (listaKeys.length <= 0) {
      return [];
    }
    var pageLimit = 20
    var tamanho = listaKeys.length;
    var nroBotones = Math.ceil(tamanho / pageLimit);
    if (this.state.pagination.curPage > nroBotones) {
      this.state.pagination.curPage = nroBotones;
    }
    var actual = pageLimit * (this.state.pagination.curPage - 1);
    return listaKeys.slice(0, actual + pageLimit);
  }
  getRecuperar(data, isRecuperar) {
    if (!isRecuperar) {
      return <View />
    }
    if (data.estado != 0) {
      return <View />
    }
    return <SButtom
      props={{
        type: "danger",
        variant: "confirm"
      }}
      onPress={() => {
        Usuario.Actions.editar({
          ...data,
          estado: 1,
        }, this.props)
      }} >Recuperar</SButtom>
  }
  getSucursal(key_sucursal) {
    var data = Sucursal.Actions.getByKey(key_sucursal, this.props);
    if (!data) return <View />
    return <SView>
      <SText>Sucursal: {data.descripcion}</SText>
    </SView>
  }
  getUsuario(key_usuario) {
    var data = Model.usuario.Action.getByKey(key_usuario);
    if (!data) return <View />
    return <SView>
      <SText>Admin: {data.Nombres}</SText>
    </SView>
  }


  getMotivo(motivo) {
    if (!motivo) return "";
    return <SText color="green">Motivo: {motivo}</SText>
  }

  render() {

    const getLista = () => {
      var data = Model.usuario.Action.getAll();
      // var data = Usuario.Actions.getAll(this.props);
      var ClientesActivos = Usuario.Actions.getAllClientesActivos(this.props);
      if (!data) return <SLoad />
      if (!ClientesActivos) return <SLoad />
      if (!this.state.buscador) {
        return <View />
      }
      this.usuarios = data;

      var objFinal = {};
      Object.keys(ClientesActivos).map((key) => {
        if (this.state.key_sucursal) {
          if (this.state.key_sucursal != ClientesActivos[key]["caja"].key_sucursal) {
            return null
          }
        }
        if (ClientesActivos[key]["paquete"].precio == 0 && this.state.soloNoBecados) {
          return;
        }
        if (ClientesActivos[key]["paquete"].precio > 0 && this.state.soloBecados) {
          return;
        }

        var ca = ClientesActivos[key];
        var now = new SDate();
        if (!(new SDate(ca.fecha_inicio, "yyyy-MM-dd").isBefore(now) && new SDate(ca.fecha_fin, "yyyy-MM-dd").isAfter(now))) {
          return;
        }

        if (!sucursal_usuario.Actions.isActive(ClientesActivos[key]["caja"].key_sucursal, this.props)) return null;
        objFinal[key] = {
          ...data[ClientesActivos[key]?.key_usuario],
          vijencia: ClientesActivos[key],
          fecha_inicio: ClientesActivos[key].fecha_on,
          fecha_fin: ClientesActivos[key].fecha_fin,
          key: key,
        };
      });

      // var isRecuperar = SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "recuperar_eliminado" });

      this.finalData = objFinal;
      return this.pagination(
        new SOrdenador([
          { key: "Peso", order: "desc", peso: 4 },
          // { key: "fecha_fin", order: "asc", peso: 3 },
        ]).ordernarObject(
          this.state.buscador.buscar(objFinal)
        )
      ).map((key) => {
        // alvaro
        var obj = data[ClientesActivos[key]?.key_usuario];
        if (!obj) return null;
        var vijencia = objFinal[key]["vijencia"];
        // if (!vijencia) return null;

        // console.log("chaval ", vijencia?.paquete?.observacion)
        return <TouchableOpacity style={{
          width: "90%",
          maxWidth: 600,
          padding: 4,
          height: 100,
          margin: 4,
          borderRadius: 10,
          backgroundColor: STheme.color.card,
        }} onPress={() => {
          SNavigation.navigate("ClientePerfilPage", {
            key: obj.key
          })
        }}>
          <View style={{
            flex: 1,
            justifyContent: "center"
          }}>
            <View style={{
              flexDirection: "row",
              height: "100%",
              width: "100%",
              alignItems: "center"
            }}>
              <View style={{
                width: 40,
                height: 40,
                marginRight: 8,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: STheme.color.card,
                borderRadius: 100,
                overflow: "hidden"
              }}>
                <SImage src={SSocket.api.root + "usuario/" + key} />
              </View>
              <View style={{
                flex: 1,
                justifyContent: "center"
              }}>
                <Text style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: STheme.color.text,
                  textTransform: "uppercase",
                  textDecorationLine: (obj.estado == 0 ? "line-through" : "none"),
                }}>{obj["Nombres"] + " " + obj["Apellidos"] + " "}{this.getMotivo(vijencia?.motivo ?? "")} </Text>

                {/* <Text style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: STheme.color.text,
                  textTransform: "uppercase",
                  textDecorationLine: (obj.estado == 0 ? "line-through" : "none"),
                }}>{obj["Nombres"] + " " + obj["Apellidos"] + " " + (vijencia?.motivo ?? "")} </Text> */}

                {this.getSucursal(vijencia["caja"].key_sucursal)}
                {this.getUsuario(vijencia["caja"].key_usuario)}


                <Text style={{ fontSize: 10, color: STheme.color.text, }}>{vijencia.paquete.nombre}</Text>
              </View>
              <SView center>
                <View style={{
                  width: 40,
                  height: 40,
                  marginRight: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: STheme.color.card,
                  borderRadius: 100,
                  overflow: "hidden"
                }}>
                  <SImage src={SSocket.api.root + "paquete/" + vijencia.paquete.key} />
                </View>
                <Text style={{ fontSize: 10, color: STheme.color.text, textTransform: "lowercase" }}>{vijencia.paquete.descripcion}</Text>
              </SView>
            </View>

          </View>
          <Paquete_Item data={vijencia} paquete={vijencia.paquete} />
        </TouchableOpacity>
      })
    }

    return (
      <SPage disableScroll title={"Clientes"}>
        <Buscador placeholder={"Buscar por CI, Nombres, Apellidos, Correo, Telefono o Motivo."} ref={(ref) => {
          if (!this.state.buscador) this.setState({ buscador: ref });
        }} repaint={() => { this.setState({ ...this.state }) }}
        />
        <SView col={"xs-12"} center>

          {/* tarea10 ✅ ✅ ✅ */}
          <ExportExcel
            header={[
              { key: "key", label: "key", width: 100 },
              { key: "cliente_ci", label: "CI", width: 100 },
              { key: "cliente_nombre", label: "Cliente", width: 250 },
              { key: "cliente_telefono", label: "Telefono", width: 250 },
              { key: "paquete", label: "Paquete", width: 200 },
              { key: "motivo", label: "Motivo", width: 100 },
              { key: "paquete_precio", label: "Precio", width: 100 },
              { key: "fecha_inicio", label: "Fecha inicio", width: 100 },
              { key: "fecha_fin", label: "Fecha fin", width: 100 },
            ]}
            getDataProcesada={() => {
              var daFinal = {};
              Object.values(this.finalData).map((obj, i) => {
                // var usr = this.usuarios[obj.key];
                if (!obj?.estado || obj?.estado <= 0) return;
                var toInsert = {
                  key: obj.key,
                  cliente_ci: obj?.CI,
                  cliente_nombre: obj?.Nombres + " " + obj?.Apellidos,
                  cliente_telefono: obj?.Telefono,
                  motivo: obj?.vijencia?.motivo,
                  paquete: obj?.vijencia?.paquete?.descripcion,
                  paquete_precio: obj?.vijencia?.paquete?.precio,
                  fecha_inicio: obj?.vijencia?.fecha_inicio,
                  fecha_fin: obj?.vijencia?.fecha_fin,
                }
                daFinal[i] = toInsert
              })
              return daFinal
            }}
          />
        </SView>

        <View style={{
          flex: 1,
          width: "100%",
        }}>
          <SScrollView2
            disableHorizontal
            onScroll={(evt) => {
              var evn = evt.nativeEvent;
              var posy = evn.contentOffset.y + evn.layoutMeasurement.height;
              var heigth = evn.contentSize.height;
              if (heigth - posy <= 0) {
                this.state.pagination.curPage += 1;
                this.setState({ ...this.state })
              }
            }}
          >
            <SView col={"xs-12"} center>
              <SucursalSelect key_sucursal={this.state.key_sucursal}
                sucursal={this.state.sucursal} setSucursal={(suc) => {
                  // SStorage.setItem("sucursal", suc.key)
                  this.setState({ sucursal: suc, key_sucursal: suc.key });
                }} />
              {getLista()}
            </SView>
          </SScrollView2>
          {/* <FloatButtom esconder={!SSRolesPermisosValidate({ page: "UsuarioPage", permiso: "crear" })} onPress={() => {
            SNavigation.navigate("registro")
          }} /> */}
        </View>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ClientesPage);