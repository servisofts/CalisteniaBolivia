import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SPage, SView } from 'servisofts-component';
import MonthBetween from '../../../Components/MonthBetween';
import CajasActivas from './dbItems/CajasActivas';
import ClientesActivos from './dbItems/ClientesActivos';
import EntrenamientosActivos from './dbItems/EntrenamientosActivos';
import GraficoAsistencia from './dbItems/GraficoAsistencia';
import GraficoIngresos from './dbItems/GraficoIngresos/index';
import GraficoPaquetesVendidos from './dbItems/GraficoPaquetesVendidos';
import SucursalesDetalle from './dbItems/SucursalesDetalle';

export default class index extends Component {
    constructor(props) {
        super(props);
         var fechaInicio = new SDate();
        fechaInicio.setDay(1);
        this.state = {
            fechaInicio: fechaInicio.toString("yyyy-MM-dd"),
            fechaFin: new SDate().toString("yyyy-MM-dd")    
        };
    }

    render() {
        return (
            <SPage title={"DashBoard"}>
                <SView col={"xs-12"} row center>

                    <ClientesActivos />
                    <CajasActivas />
                    <EntrenamientosActivos />
                    <SHr height={36} />
                    <SucursalesDetalle />
                    <SHr height={36} />
                    <MonthBetween
                        fecha_inicio={this.state.fechaInicio}
                        fecha_fin={this.state.fechaFin}
                        onChange={(fechaInicio, fechaFin) => {
                            this.setState({ fechaInicio, fechaFin })
                        }} />
                    <SHr height={36} />

                    <GraficoPaquetesVendidos fechaInicio={this.state.fechaInicio} fechaFin={this.state.fechaFin} />
                    <SHr height={36} />
                    <GraficoIngresos fechaInicio={this.state.fechaInicio} fechaFin={this.state.fechaFin} />
                    <SHr height={36} />
                    <GraficoAsistencia fechaInicio={this.state.fechaInicio} fechaFin={this.state.fechaFin}/>
                    <SHr height={100} />
                </SView>
            </SPage>
        );
    }
}
