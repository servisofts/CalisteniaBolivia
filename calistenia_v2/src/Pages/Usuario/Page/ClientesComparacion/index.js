import { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { ExportExcel, SDate, SHr, SImage, SInput, SList, SLoad, SNavigation, SPage, STheme, SView } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import BarraSuperior from '../../../../Components/BarraSuperior';
import Container from '../../../../Components/Container';
import Model from '../../../../Model';

class ClientesComparacion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        curPage: 1,
      },
      title: "Reporte Name",
      func: "_get_cliente_llamarlos",
      // params: ["'2023-01-01'", "'2023-03-01'"],
      parametros: {
        "inicio": new SDate().addMonth(-2).setDay(1).toString("yyyy-MM-dd"),
        "fin": new SDate().toString("yyyy-MM-dd"),
        "cantidad": 1,
        "dias": 0,
      },
      ...this.state,
    };
  }

  componentDidMount() {
    this.getData();
    this.getCalcularDias();
  }

  getData() {
    this.setState({ loading: "cargando", data: null });
    SSocket.sendPromise({
      component: "reporte",
      type: "execute_function",
      func: this.state.func,
      // params: this.state.params,
      params: ["'" + this.state.parametros.inicio + "'", "'" + this.state.parametros.fin + "'"],
      ...this.params
    })
      .then((resp) => {
        this.setState({ loading: false, data: resp.data });
      })
      .catch((e) => {
        this.setState({ loading: false, error: e });
      });
  }
  getCalcularDias() {
    var fini = new Date(this.state.parametros.inicio);
    var ffin = new Date(this.state.parametros.fin);
    var diferenciaEnMilisegundos = ffin - fini;
    var dias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);
    this.state.parametros.dias = dias;
    this.setState({ ...this.state })
  }

  valido_CI(ci) {
    return <Text style={{ fontSize: 16, color: (ci.length < 7 ? "red" : STheme.color.text), }}>{"CI: " + ci}</Text>
  }
  valido_dias_veces(dias, veces) {
    return <Text center style={{
      color: STheme.color.text, position: "absolute", right: 0,
    }}>{"veces (" + veces + ")\n"} {"dias (" + dias + ")"}</Text>
  }
  // valido_dias(dias) {
  //   return <Text center style={{
  //     color: STheme.color.text, position: "absolute", right: 0,
  //   }}>{"dias (" + dias + ")"}</Text>
  // }
  valido_Telefono(telefono) {
    return <Text style={{
      color: (telefono.length < 8
        || telefono.charAt(0) !== "7"
        && telefono.charAt(0) !== "6"
        && telefono.charAt(0) !== "+"
        ? "red" : STheme.color.text),
    }}>{"Telefono: " + telefono}</Text>
  }
  valido_Correo(correo) {
    return <Text style={{ color: (correo.length < 12 ? "red" : STheme.color.text), }}>{"Correo: " + correo}</Text>
  }

  getParametros() {
    return <>
      <SView col={"xs-12"} center row border={"transparent"}>
        <SView col={"xs-12"} height={40} center row border={"transparent"} >
          <SInput flex type={"date"} customStyle={"calistenia"} defaultValue={this.state.parametros.inicio.toString("dd-MM-yyyy")} style={{ width: "100%", height: "100%", borderRadius: 4, borderColor: "#666" }}
            onChangeText={(val) => {
              if (this.state.parametros.inicio != val) {
                this.state.parametros.inicio = val;
                this.getData();
                // this.getCalcularDias();
                //this.setState({ ...this.state });
              }
              // console.log("fecha inicio ", val);
            }}
          />
          <SView height width={20} />
          <SInput flex type={"date"} customStyle={"calistenia"} defaultValue={this.state.parametros.fin.toString("dd-MM-yyyy")} style={{ width: "100%", height: "100%", borderRadius: 4, borderColor: "#666" }}
            onChangeText={(val) => {
              if (this.state.parametros.fin != val) {
                this.state.parametros.fin = val;
                this.getData();
                // this.getCalcularDias();

              }
            }}
          />
          {/* <SView height width={20} /> */}
          {/* <SInput flex type={"number"} customStyle={"calistenia"} defaultValue={this.state.parametros.cantidad ?? 0} placeholder={"cantidad inscripto"} style={{ width: "100%", height: "100%", borderRadius: 4, borderColor: "#666" }}
            onChangeText={(val) => {
              // if (val.length < 2) return;
              // validar solo que sea maximo 3 caracteres
              this.state.parametros.cantidad = val;
              this.setState({ ...this.state })
            }}
          /> */}
        </SView>
      </SView >
      <SView col={"xs-12"} height={4} />

    </>
  }







  getItem2(_data, usuario) {
    return <SView col={"xs-12"} height={60} center>
      <SView col={"xs-12"} center row border={"#6664"} height onPress={() => {
        SNavigation.navigate("ClientePerfilPage", { key: usuario.key });
      }} >
        <View style={{ flexDirection: "row", height: "100%", width: "100%", alignItems: "center" }}>
          <View style={{
            width: 40, height: 40, marginRight: 8, justifyContent: "center", alignItems: "center", backgroundColor: STheme.color.card, borderRadius: 100, overflow: "hidden"
          }}>
            <SImage src={SSocket.api.root + "usuario/" + usuario?.key + `?date=${new Date().getTime() / 500}`} />
          </View>
          <View row style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ fontSize: 14, color: STheme.color.text }}>{usuario.Nombres + " " + usuario.Apellidos}   </Text>
            <Text style={{ fontSize: 12, color: STheme.color.text }}>{this.valido_Telefono(usuario?.Telefono)}</Text>
            <Text style={{ fontSize: 12, color: STheme.color.text }}>{this.valido_Correo(usuario?.Correo)} </Text>
            {/* <Text style={{ fontSize: 16, color: STheme.color.text }}>{usuario.Nombres + " " + usuario.Nombres} {this.valido_CI(usuario.CI)} {this.valido_Telefono(usuario?.Telefono)} {this.valido_Correo(usuario?.Correo)} {this.valido_veces(_data?.veces)}</Text> */}
          </View>
        </View>
      </SView>
    </SView>

    // })

  }
  getLista() {
    if (!this.state.data) return <SLoad />

    var usuarios = Model.usuario.Action.getAll();
    if (!usuarios) return <SLoad />
    let data = this.state.data.map(obj => {
      obj.usuario = usuarios[obj?.key_usuario]
      return obj;
    })
    // var fini = new Date(this.state.parametros.inicio);
    // var ffin = new Date(this.state.parametros.fin);
    // var diferenciaEnMilisegundos = ffin - fini;
    // var dias = diferenciaEnMilisegundos / (1000 * 60 * 60 * 24);

    // Mostrar resultado
    // console.log("La diferencia en días es: " + dias);
    return <>
      {/* <SText> asddas {fini} </SText> */}
      {/* <SText> dias {this.state.parametros.dias} </SText> */}
      <ExportExcel
        header={[
          { key: "indice", label: "Nro", width: 40 },
          { key: "nombres", label: "Nombres", width: 200 },
          { key: "telefono", label: "Telefono", width: 90 },
          { key: "correo", label: "Correo", width: 150 },
          { key: "cumpleaños", label: "Cumpleaños", width: 80 },
          { key: "veces", label: "Veces", width: 40 },
        ]}
        getDataProcesada={() => {
          var daFinal = {};
          let cant = 0;
          Object.values(data).map((obj, i) => {
            // if (obj.veces != this.state.parametros.cantidad) return;
            var toInsert = {
              indice: cant + 1,
              key_usuario: obj?.key_usuario,
              nombres: obj?.usuario.Nombres + " " + obj?.usuario.Apellidos,
              ci: obj?.usuario?.CI,
              correo: obj?.usuario?.Correo,
              cumpleaños: obj?.usuario["Fecha nacimiento"],
              telefono: obj?.usuario?.Telefono,
              veces: obj?.veces
            }
            cant++;
            daFinal[i] = toInsert
          })
          return daFinal
        }}
      />

      <SList data={data} space={8}
        limit={7}
        buscador
        filter={obj => {
          // if (obj.veces == this.state.parametros.cantidad) return true;
          // return false;

          // if (obj.dias_totales < this.state.parametros.dias) return true;
          // return false;

          return true;
        }}
        render={obj => {
          return this.getItem2(obj, obj.usuario)
        }}
      />
    </>
  }

  render() {


    return (
      <SPage hidden header={<BarraSuperior title={"Clientes que no se volvieron a inscribir"} navigation={this.props.navigation} goBack={() => { SNavigation.goBack(); }} />}>
        <Container>
          {this.getParametros()}
          <SHr height={10} />
          {this.getLista()}
          <SHr height={10} />
        </Container>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ClientesComparacion);