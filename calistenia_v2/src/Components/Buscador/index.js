import { Component } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SBuscador, SIcon, SInput, SMath, SText, STheme, SThread, SView } from 'servisofts-component';
// import STextImput from '../STextImput';

type Tprops = {
  repaint: Function,
  placeholder: String,
  contador: boolean,
  minLength: number,
}

export default class Buscador extends Component<Tprops> {
  static defaultProps = {
    minLength: -1,
  }
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      cantidad: 0,
    };
  }

  buscar_2(data) {
    if (typeof data != "object") {
      return Object.keys(data);
    }
    var arr = Object.values(data);
    arr = arr.filter((itm) => {
      return SBuscador.validate(itm, this.state.value);
    })
    this.setState({ cantidad: arr.length })

    var objFinal = {};
    arr.map(d => {
      objFinal[d.key] = d;
    })
    return objFinal;
  }
  buscar(data) {


    if (typeof data != "object") {
      return Object.keys(data);
    }
    var lista_keys = Object.keys(data);
    var val = this.state.value.trim() || "";
    if (val.length <= this.props.minLength) {
      return {}
    }
    // var arrPalabras = val.replaceAll(" ", "|");
    var arrPalabras = val.split(" ");
    var arr2 = [];
    var objFinal = {};
    lista_keys.map((key) => {
      var obj = data[key];
      var str = JSON.stringify(obj);
      var isValid = false;
      var peso = 0;
      for (let i = 0; i < arrPalabras.length; i++) {
        const txtTest = arrPalabras[i];
        var expreg = new RegExp(":.*?" + txtTest + ".*?(,|})", "i");
        var expreg2 = new RegExp("dato.:.*?" + txtTest + ".*?(,|})", "i");
        if (expreg.test(str) || expreg2.test(str)) {
          isValid = true;
          peso++;
        }
      }
      if (!this.state.verEliminados) {
        if (obj.estado == 0) {
          isValid = false;
        }
      }
      if (isValid) {
        arr2.push(key);
        if (!objFinal[key]) {
          objFinal[key] = data[key];
        }
        objFinal[key]["Peso"] = peso;
      }
    })
    // console.log(objFinal)
    this.setState({ cantidad: Object.keys(objFinal).length })
    return objFinal;
  }
  getVerEliminados = () => {
    if (!this.props.eliminados) {
      return <View />
    }
    return <TouchableOpacity
      onPress={() => {
        this.state.verEliminados = !this.state.verEliminados;
        this.props.repaint();
      }}
      style={{
        marginStart: 4,
        marginEnd: 4,
        width: 25,
        height: 25,
      }}>
      <SIcon name={(!this.state.verEliminados ? "NoDelete" : "Delete")} style={{
        width: 25,
        height: 25,
      }} />
    </TouchableOpacity>
  }
  render() {
    return (
      <SView col={"xs-12"} height={50} center>
        <View style={{
          width: "90%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",

        }}>
          <View style={{
            flex: 1,
            maxWidth: 600,
            height: 30,
            backgroundColor: STheme.color.card,
            justifyContent: "center",
            borderRadius: 8,
            alignItems: "center",
          }}>
            <SInput placeholder={this.props.placeholder ? this.props.placeholder : "Buscar..."} style={{
              width: "100%",
              color: STheme.color.text,
              padding: 4,
              paddingLeft: 8,
              paddingRigth: 8,
            }}
              // autoFocus={true}

              onChangeText={(txt) => {
                this.state.value = txt;
                new SThread(500, "onChangeBuscador", true).start(() => {
                  this.props.repaint();
                })
              }}
            />

          </View>
          {this.getVerEliminados()}

        </View>
        <SView style={{
          // alignItems: "flex-end",
          // width: "90%",
        }}>
          <SText style={{
            color: STheme.color.lightGray, fontSize: 10,

          }}>Resultado ({SMath.formatMoney(this.state.cantidad, 0)})</SText>
        </SView>
      </SView>
    );
  }
}
