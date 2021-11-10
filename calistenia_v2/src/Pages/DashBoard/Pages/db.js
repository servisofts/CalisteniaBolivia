import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SView } from 'servisofts-component';
import CajasActivas from './dbItems/CajasActivas';
import ClientesActivos from './dbItems/ClientesActivos';
import EntrenamientosActivos from './dbItems/EntrenamientosActivos';
import GraficoAsistencia from './dbItems/GraficoAsistencia';
import GraficoIngresos from './dbItems/GraficoIngresos/index';
import SucursalesDetalle from './dbItems/SucursalesDetalle';

export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                    <GraficoIngresos />
                    <SHr height={36} />
                    <GraficoAsistencia />
                    <SHr height={100} />
                </SView>
            </SPage>
        );
    }
}
