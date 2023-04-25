import { Component } from 'react';
import { Text } from 'react-native';

import { ExportExcel, SDate, SHr, SIcon, SImage, SInput, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import { connect } from 'servisofts-page';
import SSocket from 'servisofts-socket';
import Container from '../../Components/Container';
import Model from '../../Model';

const today = new Date();
const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
const ultimoDia = lastDayOfMonth.getFullYear() + "-" + (lastDayOfMonth.getMonth() + 1) + "-" + lastDayOfMonth.getDate();


class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Cumpleaños",
      ano: 2023,
      fecha_inicio: "2013-01-01",
      fecha_fin: "2023-12-31",

      mes: new SDate().getMonth(),
      func: "_get_cliente_fecha_veces_inscripto",
      parametros: {
        "inicio": new SDate().toString("yyyy-MM-dd"),
        "fin": new SDate(ultimoDia).toString("yyyy-MM-dd"),
        "cantidad": 1,
      },
      ...this.state,

    }
  }
  componentDidMount() {
    this.getData();
  }

  getData() {
    var _from = new SDate("2013-01-01").toString("yyyy-MM-dd");
    var _to = new SDate().toString("yyyy-MM-dd");

    this.setState({ loading: "cargando", data: null });
    SSocket.sendPromise({
      component: "reporte",
      type: "execute_function",
      func: this.state.func,
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
    return <SText style={{ fontSize: 16, color: (ci.length < 7 ? "red" : STheme.color.text), }}>{"CI: " + ci}</SText>
  }
  valido_veces(numero) {
    return <SText center style={{
      color: STheme.color.text, position: "absolute", right: 0,
    }}>{"veces (" + numero + ")"}</SText>
  }

  valido_Cumpleaños(Cumpleaños) {



    let mes = new SDate(Cumpleaños, "yyyy-MM-dd").getMonth();
    let mesActual = new SDate().getMonth();



    var mensaje = "";
    if (mes === mesActual) {
      mensaje = "🎂📆" + Cumpleaños;
    } else {
      mensaje = "" + Cumpleaños;
    }
    return <Text style={{ fontSize: 14, color: (mes === mesActual ? "green" : STheme.color.text), position: "absolute", right: 0, }}>{mensaje}</Text>
  }


  valido_Telefono(telefono) {
    return <SText style={{
      color: (telefono.length < 8
        || telefono.charAt(0) !== "7"
        && telefono.charAt(0) !== "6"
        && telefono.charAt(0) !== "+"
        ? "red" : STheme.color.text),
    }}>{"Telefono: " + telefono}</SText>
  }
  valido_Correo(correo) {
    return <SText style={{ color: (correo.length < 12 ? "red" : STheme.color.text), }}>{"Correo: " + correo}</SText>
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
              }
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



  getItem(_data, usuario) {
    return <SView col={"xs-12"} height={60} center>
      <SView col={"xs-12"} center row border={"#6664"} height onPress={() => {
        SNavigation.navigate("ClientePerfilPage", { key: usuario.key });
      }} >
        <SView style={{ flexDirection: "row", height: "100%", width: "100%", alignItems: "center" }}>
          <SView style={{
            width: 40, height: 40, marginRight: 8, justifyContent: "center", alignItems: "center", backgroundColor: STheme.color.card, borderRadius: 100, overflow: "hidden"
          }}>
            <SImage src={SSocket.api.root + "usuario/" + usuario?.key + `?date=${new Date().getTime() / 500}`} />
          </SView>
          <SView style={{ flex: 1, }}>

            <SText col={"xs-12"} style={{ fontSize: 14, color: STheme.color.text }}>{usuario.Nombres + " " + usuario.Apellidos}  {this.valido_Cumpleaños(usuario["Fecha nacimiento"])}</SText>

            <SText style={{ fontSize: 12, color: STheme.color.text }}>{this.valido_Telefono(usuario?.Telefono)}</SText>
            <SText style={{ fontSize: 12, color: STheme.color.text }}>{this.valido_Correo(usuario?.Correo)} </SText>

          </SView>
        </SView>
      </SView>
    </SView >


  }

  loadData() {
    if (!this.state.data) return <SLoad />

    var usuarios = Model.usuario.Action.getAll();
    if (!usuarios) return <SLoad />





    let data = this.state.data.map(obj => {
      obj.usuario = usuarios[obj?.key_usuario];
      return obj;
    })
    let year = new SDate().toString("yyyy");

    data.sort((a, b) => {
      let fc = new SDate(a?.usuario["Fecha nacimiento"], "yyyy-MM-dd").setYear(year);
      let fc2 = new SDate(b?.usuario["Fecha nacimiento"], "yyyy-MM-dd").setYear(year);
      return fc.getTime() - fc2.getTime()
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


            let _mes = new SDate().getMonth();


            let fecha_inicio = new SDate(this.state.parametros.inicio, "yyyy-MM-dd").setYear(year);
            let fecha_fin = new SDate(this.state.parametros.fin, "yyyy-MM-dd").setYear(year);
            let fc = new SDate(obj.usuario["Fecha nacimiento"], "yyyy-MM-dd").setYear(year)

            if (fc.getMonth() != _mes) return;
            if (fc < fecha_inicio) return;


            var toInsert = {
              indice: cant + 1,
              key_usuario: obj?.key_usuario,
              nombres: obj?.usuario.Nombres + " " + obj?.usuario.Apellidos,
              ci: obj?.usuario?.CI,
              correo: obj?.usuario?.Correo,
              cumpleaños: obj?.usuario["Fecha nacimiento"],
              telefono: obj?.usuario?.Telefono,
            }

            cant++;
            daFinal[i] = toInsert



          })
          return daFinal
        }}
      />

      <SList data={data} space={8}
        limit={10}
        buscador
        filter={obj => {
          let year = new SDate().toString("yyyy");
          let fecha_inicio = new SDate(this.state.parametros.inicio, "yyyy-MM-dd").setYear(year);
          let fecha_fin = new SDate(this.state.parametros.fin, "yyyy-MM-dd").setYear(year);
          let fc = new SDate(obj.usuario["Fecha nacimiento"], "yyyy-MM-dd").setYear(year)
          if (fc.isAfter(fecha_inicio) && fc.isBefore(fecha_fin)) return true;
          return false;
        }}
        render={obj => {

          return this.getItem(obj, obj.usuario)
        }}
      />
    </>
  }

  template() {
    return <>
      <SView col={"xs-2.5 sm-1 md-3.5  "} center border={"transparent"} style={{ position: "absolute", top: 35, left: 0, }}><SIcon name="HbHeaderLeft1" style={{ width: "100%" }} /></SView>
      <SView col={"xs-2.5 sm-1 md-3"} center border={"transparent"} style={{ position: "absolute", top: 35, right: 0, }}><SIcon name="HbHeaderRight1" style={{ width: "100%" }} /></SView>
      <SView col={"xs-2.5 sm-1 md-2  "} center style={{ position: "absolute", bottom: 0, left: 0, }}><SIcon name="HbFooterLeft1" style={{ width: "100%" }} /></SView>
      <SView col={"xs-2.5 sm-1 md-2  "} center style={{ position: "absolute", bottom: 0, right: 0, }}><SIcon name="HbFooterRight1" style={{ width: "100%" }} /></SView>
    </>
  }
  render() {
    let aux = new SDate().toString("dd MONTH");

    return <>
      <SPage title={this.state.title} center backgroundColor={"transparent"}>

        <Container>
          <SText fontSize={36} font={"Roboto"} bold color={STheme.color.text} center>Cumpleañeros{"\n" + aux + " 🥳"}</SText>
          <SHr height={40} />
          {this.getParametros()}
          {this.loadData()}
        </Container>
      </SPage>
      {this.template()}

    </>
  }
}
export default connect(index);