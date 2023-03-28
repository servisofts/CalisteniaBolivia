import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import fondo_inversion from '../../fondo_inversion';
import fondo_inversion_usuario from '../../fondo_inversion_usuario';
class lista extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getItem(data = { key, descripcion, observacion, fecha_inicio, fecha_fin, estado, cantidad_acciones, precio_accion, monto_maximo }, montoi) {

    return <>
      <SHr height={16} />
      <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} card center>
        <SHr />
        <SText fontSize={18} col={"xs-11"} bold>{data.descripcion}</SText>
        <SHr />
        <SText fontSize={14} col={"xs-11"} color={STheme.color.lightGray}>{data.observacion}</SText>
        <SHr />
        <SHr />
        <SHr />
        <SHr />
        <SView row col={"xs-11"}>
          {/* <SView center col={"xs-12"}>
                        <SText fontSize={14} bold >{`( Bs. ${SMath.formatMoney(montoi.monto)} / Bs. ${SMath.formatMoney(data.monto_maximo)} )`}</SText>
                        <SText fontSize={12} color={STheme.color.lightGray}>{"Monto recaudado"} </SText>

                    </SView> */}
          <SHr />
          {/* <SView center col={"xs-12"}>
                        <SText fontSize={14} bold>{`Bs. ${SMath.formatMoney(data.monto_maximo - montoi.monto)}`}</SText>
                        <SText fontSize={12} color={STheme.color.lightGray}>{"Monto disponible"} </SText>

                    </SView> */}
          <SHr />
          <SView center col={"xs-12"}>
            <SText fontSize={14} bold>Bs. {SMath.formatMoney(data["precio_accion"])}</SText>
            <SText fontSize={12} color={STheme.color.lightGray}>Precio de la accion </SText>
          </SView>
          {/* <SView center col={"xs-6"}>
                        <SView row center>
                            <SIcon name={"Egreso"} width={14} />
                            <SView width={8} />
                            <SText fontSize={14} bold>{`( ${data["cantidad_acciones"] - montoi.cantidad} / ${data["cantidad_acciones"]} )`}</SText>
                        </SView>
                        <SText fontSize={12} color={STheme.color.lightGray}>Disponibles</SText>
                    </SView> */}
        </SView>
        <SHr />
        <SHr />
        <SHr />
        <SView row col={"xs-11"}>
          <SView center col={"xs-6"}>
            <SText fontSize={12} color={STheme.color.lightGray}>Inicia:</SText>
            <SText fontSize={12} color={STheme.color.lightGray}>{new SDate(data.fecha_inicio).toString("dd de MONTH, yyyy")} </SText>
          </SView>
          <SView center col={"xs-6"}>
            <SText fontSize={12} color={STheme.color.lightGray}>Termina:</SText>
            <SText fontSize={12} color={STheme.color.lightGray}>{new SDate(data.fecha_fin).toString("dd de MONTH, yyyy")} </SText>
          </SView>
        </SView>
        <SHr />

        <SHr />
        <SView style={{
          width: 140,
          height: 35,
        }} card center onPress={() => {
          SNavigation.navigate("fondo_inversion/perfil", { key: data.key });
        }} row>
          <SIcon name={"Carrito"} width={20} />
          <SView width={16} />
          <SText bold fontSize={11}>INVERTIR</SText>
        </SView>
        <SHr />
      </SView>
    </>
  }

  getDisponibles() {
    var data = fondo_inversion.Actions.getAll(this.props);
    if (!data) return <SLoad />
    var lista = Object.keys(data).filter(itm => {
      var obj = data[itm];

      return obj.estado == 1 && new SDate(obj.fecha_inicio).isAfter(new SDate());
    })
    return lista.map(key => {
      var montoi = fondo_inversion_usuario.Actions.getMontoInvertido(key, this.props);
      if (!montoi) return <SLoad />
      var obj = data[key];
      return this.getItem(obj, montoi);
    })
  }
  render() {
    return (
      <SPage title={'lista'} center>
        {/* {this.getDisponibles()} */}
        <SText>chaval</SText>
        <SView height={50} />
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(lista);