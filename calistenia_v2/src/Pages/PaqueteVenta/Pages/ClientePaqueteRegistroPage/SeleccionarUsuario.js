
import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { View, Text, Button, TouchableOpacity, ScrollView, Linking, Platform, ActivityIndicator } from 'react-native';
import Buscador from '../../../../Components/Buscador';
import { SView, SOrdenador, SImage, SDate, SScrollView2, SText, SPage, SIcon, STheme, SHr, SInput, SButtom, SLoad, SPopup } from 'servisofts-component';
import SSocket from 'servisofts-socket'
import Sucursal from '../../../Sucursal';
import Usuario from '../../../Usuario';
import Billetera from '../../../Billetera';
import Model from '../../../../Model';
class SeleccionarUsuario extends Component {
  static navigationOptions = {
    title: "Lista de usuario.",
    headerShown: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        curPage: 1,
      }
    };
    // SSNavigation.setProps(props);

  }
  componentDidMount() {

  }
  pagination = (listaKeys) => {
    var pageLimit = 10
    if (!listaKeys) {
      return [];
    }
    if (listaKeys.length <= 0) {
      return [];
    }

    var tamanho = listaKeys.length;
    var nroBotones = Math.ceil(tamanho / pageLimit);
    if (this.state.pagination.curPage > nroBotones) {
      this.state.pagination.curPage = nroBotones;
    }
    var actual = pageLimit * (this.state.pagination.curPage - 1);

    // console.log(actual);
    // console.log(actual + pageLimit);
    return listaKeys.slice(0, actual + pageLimit);
  }
  getSucursal(key_sucursal) {
    var data = Sucursal.Actions.getAll(this.props);
    if (!data) return <View />
    var obj = data[key_sucursal]
    if (!obj) return <View />
    return <SView>
      <SText>Sucursal: {obj.descripcion}</SText>
    </SView>
  }
  getUsuario(key_usuario) {
    var data = Model.usuario.Action.getAll();
    if (!data) return <View />
    var obj = data[key_usuario]
    return <SView>
      <SText>Admin: {obj.Nombres}</SText>
    </SView>
  }
  render() {

    const getLista = () => {
      if (this.state.codigo) {
        var codigoData = Billetera.Actions.getByCodigo(this.state.codigo, this.props);
        if (!codigoData) return <SLoad />
        if (!codigoData.codigo) return <SView col={"xs-12"} center>
          <SText>{`( ${this.state.codigo} ) codigo no econtrado`}</SText>
          <SHr />
          <SButtom type="outline" onPress={() => {
            this.setState({ codigo: null });
          }}>Reintentar</SButtom>
        </SView>
        return <SView col={"xs-12"} center>
          <SText>{`( ${this.state.codigo} )`}</SText>
          <SHr />
          <SText fontSize={18}>{` Monto: Bs. ${codigoData.monto}`}</SText>
          {/* <SText>{`${JSON.stringify(codigoData)}`}</SText> */}
          <SHr />
          <SText>{` Fecha: ${new SDate(codigoData.fecha).toString("yyyy-MM-dd hh:mm")}`}</SText>
          <SHr />
          <SHr />
          <SHr />
          <SButtom type="outline" onPress={() => {
            this.props.onChange(codigoData);
          }}>COBRAR</SButtom>
        </SView>
      }

      return <SView col={"xs-12"} height={200} center>
        <SText fontSize={16}>{"Busca por el codigo de la tranferencia!"}</SText>
        <SView col={"xs-12 md-7 xl-5"} row center>
          <SInput customStyle={"calistenia"} label={"Codigo"} col={"xs-12"} ref={(ref) => { this.inputBilletera = ref }} />
          <SHr />
          <SButtom type="outline" onPress={() => {
            var codigo = this.inputBilletera.getValue();
            Billetera.Actions.getByCodigo(codigo, this.props);
            this.setState({ codigo: codigo });
          }}>Buscar</SButtom>
        </SView>
      </SView>
    }
    return (<>
      <SView col={"xs-12"} style={{
        height: 600,
        maxHeight: "90%",
      }} withoutFeedback>
        <View style={{
          width: "100%",
          flex: 1,
          borderRadius: 8,
          overflow: "hidden",
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center"
        }}>
          {SPage.backgroundComponent}
          <SView height={8} />
          <SHr />
          <View style={{
            flex: 1,
            width: "100%",
          }}>
            <SScrollView2
              disableHorizontal
              style={{ width: "100%" }}
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
              <View style={{
                width: "100%",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}>
                {getLista()}
                <SView height={50}></SView>
              </View>
            </SScrollView2>
          </View>
        </View>
      </SView>
    </>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(SeleccionarUsuario);