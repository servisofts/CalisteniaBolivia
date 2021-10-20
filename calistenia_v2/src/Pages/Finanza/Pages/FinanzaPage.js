import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable, SText, SView } from 'servisofts-component';
import BotonesPaginas from '../../../Components/BotonesPaginas';

class FinanzaPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
            {this.getItem({ title: "Reporte de bancos", icon: "Money", url: "ReporteBancos" })}
            {this.getItem({ title: "Cajas activas", icon: "Caja", url: "CajasAbiertas" })}
            {/* {this.getItem({ title: "Cajas historico", icon: "Caja", url: "CajasPage" })} */}
            {this.getItem({ title: "Cajas historico", icon: "Caja", url: "CajasPage" })}
            {this.getItem({
                title: "Reporte Asistencias", icon: "Entrenamiento", onPress: () => {
                    SPopup.dateBetween("Reporte de asistencia", (evt) => {
                        // alert(JSON.stringify(evt));
                        SNavigation.navigate("ReporteAsistencia", evt);
                    });
                }
            })}
            {this.getItem({
                title: "Paquetes vendidos", icon: "Paquete", onPress: () => {
                    SPopup.dateBetween("Paquetes vendidos", (evt) => {
                        // alert(JSON.stringify(evt));
                        SNavigation.navigate("PaquetesVendidos", evt);
                    });
                }
            })}
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