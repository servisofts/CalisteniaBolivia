import { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { ExportExcel, SDate, SHr, SImage, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';

import SSocket from 'servisofts-socket';
import BarraSuperior from '../../../../Components/BarraSuperior';
import Container from '../../../../Components/Container';
import Model from '../../../../Model';


class ClientesCumpleaño extends Component {

  constructor(props) {
    super(props);

    // const today = new Date();
    // const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    this.state = {
      pagination: {
        curPage: 1,
      },

      mes: new SDate().getMonth(),
      title: "Reporte Name",
      func: "_get_cliente_fecha_veces_inscripto",
      // params: ["'2023-01-01'", "'2023-03-01'"],
      parametros: {
        "inicio": new SDate().toString("yyyy-MM-dd"),
        // "inicio": new SDate("2013-01-01").toString("yyyy-MM-dd"),
        // "fin": new SDate().getMonth()
        "fin": new SDate(ultimoDia).toString("yyyy-MM-dd"),
        "cantidad": 1,
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
      // params: this.state.params,
      params: ["'" + _from + "'", "'" + _to + "'"],
      ...this.params
    })
      .then((resp) => {
        this.setState({ loading: false, data: resp.data });
      })
      .catch((e) => {
        this.setState({ loading: false, error: e });
      });
  }

  valido_CI(ci) {
    return <Text style={{ fontSize: 16, color: (ci.length < 7 ? "red" : STheme.color.text), }}>{"CI: " + ci}</Text>
  }
  valido_veces(numero) {
    return <Text center style={{
      color: STheme.color.text, position: "absolute", right: 0,
    }}>{"veces (" + numero + ")"}</Text>
  }

  valido_Cumpleaños(Cumpleaños) {


    var fecha = Cumpleaños;
    var fechaObj = new Date(fecha);
    var mes = fechaObj.getMonth() + 1;

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;

    // como obtengo mi mes con Sdate

    var mensaje = "";
    if (mes === mesActual) {
      mensaje = "🥳📆 " + fecha;
    } else {
      mensaje = "" + fecha;
    }

    return <Text style={{ fontSize: 16, color: (mes === mesActual ? "red" : STheme.color.text), position: "absolute", right: 0, }}>{mensaje}</Text>
  }


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
          <SInput flex type={""} customStyle={"calistenia"} defaultValue={this.state.parametros.inicio.toString("dd-MM-yyyy")} style={{ width: "100%", height: "100%", borderRadius: 4, borderColor: "#666" }}
            onChangeText={(val) => {
              if (this.state.parametros.inicio != val) {
                this.state.parametros.inicio = val;
                this.getData();
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
              }
            }}
          />
        </SView>
      </SView >

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
            <Text style={{ fontSize: 14, color: STheme.color.text }}>{usuario.Nombres + " " + usuario.Apellidos}  {this.valido_Cumpleaños(usuario["Fecha nacimiento"])}</Text>
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
      obj.usuario = usuarios[obj?.key_usuario];
      // mes_cumpleaños = usuarios[obj?.key_usuario]["Fecha nacimiento"];
      return obj;
    })

    return <>
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

            let captura1 = new SDate(obj.usuario["Fecha nacimiento"]).getMonth();
            if (captura1 != this.state.mes) return;


            var toInsert = {
              indice: cant + 1,
              key_usuario: obj?.key_usuario,
              nombres: obj?.usuario.Nombres + " " + obj?.usuario.Apellidos,
              ci: obj?.usuario?.CI,
              correo: obj?.usuario?.Correo,
              cumpleaños: obj?.usuario["Fecha nacimiento"],
              telefono: obj?.usuario?.Telefono,

              // veces: obj?.veces
            }

            cant++;
            daFinal[i] = toInsert

            // var daFinal = {};
            // let cant = 0;
            // Object.values(data)
            //   .filter((obj) => new SDate(obj.usuario["Fecha nacimiento"]).getMonth() === this.state.mes) // filtrar por mes
            //   .sort((a, b) => {
            //     const dayA = new SDate(a.usuario["Fecha nacimiento"]).getDate();
            //     const dayB = new SDate(b.usuario["Fecha nacimiento"]).getDate();
            //     return dayA - dayB;
            //   })
            //   .forEach((obj, i) => {
            //     var toInsert = {
            //       indice: cant + 1,
            //       key_usuario: obj?.key_usuario,
            //       nombres: obj?.usuario.Nombres + " " + obj?.usuario.Apellidos,
            //       ci: obj?.usuario?.CI,
            //       correo: obj?.usuario?.Correo,
            //       cumpleaños: obj?.usuario["Fecha nacimiento"],
            //       telefono: obj?.usuario?.Telefono,
            //       // veces: obj?.veces
            //     }
            //     cant++;
            //     daFinal[i] = toInsert
            //   })
            // return daFinal;

          })
          return daFinal
        }}
      />

      <SList data={data} space={8}
        limit={7}
        buscador
        order={[{ key: "usuario/Fecha nacimiento", order: "asc", peso: 1, }]}
        filter={obj => {


          let year = new SDate().toString("yyyy");
          let fecha_inicio = new SDate(this.state.parametros.inicio, "yyyy-MM-dd").setYear(year);
          let fecha_fin = new SDate(this.state.parametros.fin, "yyyy-MM-dd").setYear(year);
          let fc = new SDate(obj.usuario["Fecha nacimiento"], "yyyy-MM-dd").setYear(year)
          if (fc.isAfter(fecha_inicio) && fc.isBefore(fecha_fin)) return true;

          return false;
        }}
        render={obj => {
          return this.getItem2(obj, obj.usuario)
        }}
      />
    </>
  }

  render() {


    let aux = new SDate().toString("MONTH");


    return (
      <SPage hidden header={<BarraSuperior title={"Cumpleañeros del mes clientes"} navigation={this.props.navigation} goBack={() => { SNavigation.goBack(); }} />}>

        <SView center style={{ color: "blue", position: "absolute", top: 0, left: 0, }}><SIcon name="Hb_footer_left" style={{ width: 32, height: 32 }} /></SView>
        <SView center style={{ color: "blue", position: "absolute", top: 0, right: 0, }}><SIcon name="Hb_header_left" style={{ width: 32, height: 32 }} /></SView>


        {/* "Hb_cake": {Native: Hb_cake, Web: Hb_cakeW },
        "Hb_footer_left": {Native: Hb_footer_left, Web: Hb_footer_leftW },
        "Hb_footer_right": {Native: Hb_footer_right, Web: Hb_footer_rightW },
        "Hb_header_left": {Native: Hb_header_left, Web: Hb_header_leftW },
        "Hb_header_right": {Native: Hb_header_right, Web: Hb_header_rightW },
         */}

        <Container>
          <SText>Cumpleañero del messss</SText>
          <SText color={"red"}>Mes {this.state.mes}</SText>
          <SText color={"red"}>{aux}</SText>

          <SView center > <SIcon name="Hb_cake" style={{ width: 32, height: 32 }} /></SView>


          {this.getParametros()}
          <SHr height={10} />

          <SHr height={10} />
          <SHr height={10} />
          {this.getLista()}
          <SHr height={10} />
        </Container>

        <View style={{ flex: 1, height: "100%" }}> </View>


        <SView center style={{ color: "blue", position: "absolute", bottom: 0, left: 0, }}><SIcon name="Usuarios_proveedor" style={{ width: 32, height: 32 }} /></SView>
        <SView center style={{ color: "blue", position: "absolute", bottom: 0, right: 0, }}><SIcon name="Usuarios_proveedor" style={{ width: 32, height: 32 }} /> </SView>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(ClientesCumpleaño);