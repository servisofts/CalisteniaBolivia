import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SView } from 'servisofts-component';
import CajasActivas from './dbItems/CajasActivas';
import ClientesActivos from './dbItems/ClientesActivos';
import EntrenamientosActivos from './dbItems/EntrenamientosActivos';
import SucursalesDetalle from './dbItems/SucursalesDetalle';

class index extends Component {
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
                    <SHr height={36}/>
                    <SucursalesDetalle />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(index);