import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable, SText, STheme, SView } from 'servisofts-component';
import BotonesPaginas from '../../../Components/BotonesPaginas';
import Sucursal from '../../Sucursal';

class FinanzaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getItemFecha({ title, icon, url, onPress }) {
        return this.getItem({
            title: title, icon: icon, onPress: () => {
                SPopup.dateBetween(title, (evt) => {
                    // alert(JSON.stringify(evt));
                    SNavigation.navigate(url, evt);
                });
            }
        })
    }
    getItemFechaSucursal({ title, icon, url, onPress }) {
        return this.getItem({
            title: title, icon: icon, onPress: () => {
                SPopup.dateBetween(title, (evt) => {
                    // alert(JSON.stringify(evt));
                    SNavigation.navigate(url, evt);
                });
            }
        })
    }
    getItem({ title, icon, url, onPress }) {
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
            {this.getItem({ title: "Cajas activas", icon: "Caja", url: "CajasAbiertas" })}
            {/* {this.getItem({ title: "Cajas historico", icon: "Caja", url: "CajasPage" })} */}
            {this.getItem({ title: "Cajas historico", icon: "Caja", url: "CajasPage" })}
            {this.getItem({ title: "Usuarios", icon: "Usuarios_all", url: "UsuariosTabla" })}
            {this.getItem({
                title: "Reporte Asistencias", icon: "Entrenamiento", onPress: () => {
                    SPopup.dateBetween("Reporte de asistencia", (evt) => {
                        // alert(JSON.stringify(evt));
                        SNavigation.navigate("ReporteAsistencia", evt);
                    });
                }
            })}
            {this.getItemFecha({ title: "Paquetes vendidos", icon: "Paquete", url: "PaquetesVendidos" })}
            {this.getItemFecha({ title: "Ingresos & egresos manuales", icon: "Traspaso", url: "IngresosEgresos" })}
            {this.getItemFecha({ title: "Reporte de bancos", icon: "Card", url: "ReporteBancos" })}
            {this.getItemFechaSucursal({ title: "Estado financiero", icon: "Money", url: "EstadoFinancieroSelect" })}
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