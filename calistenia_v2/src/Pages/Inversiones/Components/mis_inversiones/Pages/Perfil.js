import { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SLoad, SMath, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';

import fondo_inversion from '../../fondo_inversion';
import fondo_inversion_usuario from '../../fondo_inversion_usuario';
import ListaGanancias from '../Components/listaGanancias';

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_ventas: 0
    };
    this.key_fondo_inversion = SNavigation.getParam("key");
    this.key_usuario = SNavigation.getParam("key_usuario");
  }

  getDetalle() {
    var data_fondo_inversion = fondo_inversion.Actions.getByKey(this.key_fondo_inversion, this.props);
    var data_inversion_usuario = fondo_inversion_usuario.Actions.filtrar({
      key_fondo_inversion: this.key_fondo_inversion,
      key_usuario_inversionista: this.key_usuario ?? this.props.state.usuarioReducer.usuarioLog.key
    }, this.props);
    if (!data_fondo_inversion) return null;
    if (!data_inversion_usuario) return null;
    return data_inversion_usuario.map((item) => {
      return <>
        <SHr height={8} />
        <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} card center row>
          <SHr />
          <SView col={"xs-4"} center>
            <SText bold>Bs. {SMath.formatMoney(item.inversion)}</SText>
            <SText color={STheme.color.lightGray}>Inversion</SText>
          </SView>
          <SView col={"xs-4"} center>
            <SText bold>Bs. {(item.comision)}</SText>
            <SText color={STheme.color.lightGray}>Comision</SText>
          </SView>
          <SView col={"xs-4"} center>
            <SText bold>{SMath.formatMoney((item.inversion / data_fondo_inversion.precio_accion))}</SText>
            <SText color={STheme.color.lightGray}># acciones</SText>
          </SView>
          <SHr />
          <SView col={"xs-6"} center>
            {!item.fecha_aprobacion ? <SIcon name={"Alert"} width={30} /> : <SText bold fontSize={18}>Bs. {SMath.formatMoney((item.inversion / data_fondo_inversion.precio_accion) * item.comision * this.state.total_ventas ?? 0)}</SText>}
            <SText color={STheme.color.lightGray} >{item.fecha_aprobacion ? `Ganancia actual` : "Esperando aprobacion..."}</SText>
          </SView>
          <SHr />
          <SText color={STheme.color.lightGray} style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 110,
          }} center fontSize={12}>{new SDate(item.fecha_on).toString("dd/MM/yyyy hh:mm")}</SText>
          <SHr />
        </SView>
      </>
    })
  }
  getSceneData() {
    var data = fondo_inversion.Actions.getByKey(this.key_fondo_inversion, this.props);
    var montoi = fondo_inversion_usuario.Actions.getMontoInvertido(this.key_fondo_inversion, this.props);
    if (!data) return <SLoad />
    if (!montoi) return <SLoad />
    return <SView col={"xs-12"} center>
      <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center card>
        <SView col={"xs-11"} center>
          <SHr />
          <SText fontSize={18} bold>{data.descripcion}</SText>
          <SHr />
          <SText fontSize={14} color={STheme.color.lightGray}>{data.observacion}</SText>
          <SHr />
          <SHr />
          <SHr />
          {/* <SView row col={"xs-11"}>
                        <SView center col={"xs-12"}>
                            <SText fontSize={14} bold >{`( Bs. ${SMath.formatMoney(montoi.monto)} / Bs. ${SMath.formatMoney(data.monto_maximo)} )`}</SText>
                            <SText fontSize={12} color={STheme.color.lightGray}>{"Monto recaudado"} </SText>

                        </SView>
                        <SHr />
                        <SView center col={"xs-12"}>
                            <SText fontSize={14} bold>{`Bs. ${SMath.formatMoney(data.monto_maximo - montoi.monto)}`}</SText>
                            <SText fontSize={12} color={STheme.color.lightGray}>{"Monto disponible"} </SText>

                        </SView>
                        <SHr />
                        <SView center col={"xs-6"}>
                            <SText fontSize={14} bold>Bs. {SMath.formatMoney(data["precio_accion"])}</SText>
                            <SText fontSize={12} color={STheme.color.lightGray}>Precio de la accion </SText>
                        </SView>
                        <SView center col={"xs-6"}>
                            <SView row center>
                                <SIcon name={"Egreso"} width={14} />
                                <SView width={8} />
                                <SText fontSize={14} bold>{`( ${data["cantidad_acciones"] - montoi.cantidad} / ${data["cantidad_acciones"]} )`}</SText>
                            </SView>
                            <SText fontSize={12} color={STheme.color.lightGray}>Disponibles</SText>
                        </SView>
                    </SView> */}
          <SHr />
          {/* <SHr /> */}
          {/* <SHr /> */}
          {/* <SView row center>
                        <SIcon name={"Ingreso"} width={14} />
                        <SView width={8} />
                        <SText fontSize={16} bold>{`( ${parseFloat(montoi["monto"] / data["precio_accion"]).toFixed(1)} / ${data["cantidad_acciones"]} )`}</SText>
                    </SView> */}
          {/* <SText fontSize={12} color={STheme.color.lightGray}>Acciones vendidas</SText> */}
          <SHr />
          {/* <SText>{JSON.stringify(montoi)}</SText> */}
        </SView>
      </SView>
    </SView>
  }
  render() {
    return (
      <SPage title={'Perfil'}>
        <SView col={"xs-12"} center>
          {this.getSceneData()}
          {this.getDetalle()}
          <SHr />
          <SHr />
          <ListaGanancias key_fondo_inversion={this.key_fondo_inversion} onChangeTotal={(total) => {
            this.setState({ total_ventas: total });
          }} />
        </SView>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(Perfil);