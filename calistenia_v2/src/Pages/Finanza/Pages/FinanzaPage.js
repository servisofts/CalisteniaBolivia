import { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SNavigation, SPage, SPopup, SText, SView } from 'servisofts-component';
import { SSRolesPermisosValidate } from '../../../SSRolesPermisos';

class FinanzaPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  getItemFecha({ title, icon, url, onPress, permiso }) {
    if (permiso) {
      if (!SSRolesPermisosValidate({ page: "FinanzaPage", permiso: permiso })) {
        return null;
      }
    }
    return this.getItem({
      title: title, icon: icon, onPress: () => {
        SPopup.dateBetween(title, (evt) => {
          // alert(JSON.stringify(evt));
          SNavigation.navigate(url, evt);
        });
      }
    })
  }
  getItemFechaSucursal({ title, icon, url, onPress, permiso }) {
    if (permiso) {
      if (!SSRolesPermisosValidate({ page: "FinanzaPage", permiso: permiso })) {
        return null;
      }
    }
    return this.getItem({
      title: title, icon: icon, onPress: () => {
        SPopup.dateBetween(title, (evt) => {
          // alert(JSON.stringify(evt));
          SNavigation.navigate(url, evt);
        });
      }
    })
  }
  getItem({ title, icon, url, onPress, permiso }) {
    if (permiso) {
      if (!SSRolesPermisosValidate({ page: "FinanzaPage", permiso: permiso })) {
        return null;
      }
    }

    return <SView col={"xs-3 sm-2.5 md-2 lg-1.5 xl-1.3"} colSquare style={{
      padding: 4,
    }}
    >
      <SView col={"xs-12"} height center>
        <SView col={"xs-7"} colSquare onPress={() => {
          if (onPress) {
            onPress();
            return;
          }
          SNavigation.navigate(url);
        }} >
          <SIcon name={icon} />
        </SView>
        <SHr />
        <SView center height={16}>
          <SText center fontSize={12}>{title}</SText>
        </SView>
      </SView>
    </SView>
  }
  getLista() {
    return <>
      {this.getItem({ title: "Cajas activas", icon: "Caja", url: "CajasAbiertas", permiso: "CajasAbiertas" })}
      {/* {this.getItem({ title: "Cajas historico", icon: "Caja", url: "CajasPage" })} */}
      {this.getItem({ title: "Cajas historico", icon: "Caja", url: "CajasPage", permiso: "CajasPage" })}
      {this.getItem({ title: "Usuarios", icon: "Usuarios_all", url: "UsuariosTabla", permiso: "UsuariosTabla" })}
      {this.getItem({
        title: "Reporte Asistencias", icon: "Entrenamiento", permiso: "ReporteAsistencia", onPress: () => {
          SPopup.dateBetween("Reporte de asistencia", (evt) => {
            // alert(JSON.stringify(evt));
            SNavigation.navigate("ReporteAsistencia", evt);
          });
        }
      })}
      {this.getItemFecha({ title: "Paquetes vendidos", icon: "Paquete", url: "PaquetesVendidos", permiso: "PaquetesVendidos" })}
      {this.getItemFecha({ title: "Ingresos & egresos manuales", icon: "Traspaso", url: "IngresosEgresos", permiso: "IngresosEgresos" })}
      {this.getItemFecha({ title: "Reporte de bancos", icon: "Card", url: "ReporteBancos", permiso: "ReporteBancos" })}
      {this.getItemFechaSucursal({ title: "Estado financiero", icon: "Money", url: "EstadoFinancieroSelect", permiso: "EstadoFinancieroSelect" })}
      {this.getItemFecha({ title: "Prorroga", icon: "Ajustes", url: "ReporteProrroga", permiso: "ReporteProrroga" })}
      {this.getItem({ title: "Montos actuales en cajas", icon: "Ajustes", url: "reporte_montos_actuales_todas_las_cajas" })}
      {this.getItem({ title: "Anulados", icon: "Ajustes", url: "reporte_paquetes_anulados_todas_las_cajas" })}
      {this.getItem({ title: "Montos actuales en cajas", icon: "Ajustes", url: "reporte_montos_actuales_todas_las_cajas" })}
      {this.getItemFecha({ title: "Reporte movimientos banco", icon: "Ajustes", url: "reporte_movimientos_banco" })}
      {this.getItemFecha({ title: "Reporte movimientos caja", icon: "Ajustes", url: "reporte_movimientos_caja" })}
      {/* {this.getItemFecha({ title: "Ingresos", icon: "Ingreso", url: "Ingreso" })} */}
    </>
  }
  render() {
    return (
      <SPage title={"Finanzas"}>
        <SView col={"xs-12"} row>
          {this.getLista()}
        </SView>
      </SPage>
    );
  }
}
const initStates = (state) => {
  return { state }
};
export default connect(initStates)(FinanzaPage);