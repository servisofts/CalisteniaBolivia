import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SText, SView } from 'servisofts-component';
import SSRolesPermisos from '../../../../SSRolesPermisos';
import Usuario from '../../../Usuario';

class ClientesActivos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getContent() {
        var clientesActivos = Usuario.Actions.getAllClientesActivos(this.props);
        var clientesRol = SSRolesPermisos.Events.getUsuarioRol("d16d800e-5b8d-48ae-8fcb-99392abdf61f", this.props)
        if (!clientesActivos) return <SLoad />
        if (!clientesRol) return <SLoad />
        return <SView center row height>
            <SView col={"xs-12"} center >
                <SText fontSize={10}>{`Clientes activos`}</SText>
            </SView>
            <SView col={"xs-4"} height={50}>
                <SIcon name={"Usuarios_cliente"} />
            </SView>
            <SView col={"xs-8"} center>
                <SText bold>{`( ${Object.keys(clientesActivos).length} / ${Object.keys(clientesRol).length} )`}</SText>
            </SView>
        </SView>
    }
    render() {
        return (
            <SView col={"xs-11 sm-6 md-4 xl-3"} height={100} style={{
                padding: 8,
            }}>
                <SView height card center>
                    {this.getContent()}
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ClientesActivos);