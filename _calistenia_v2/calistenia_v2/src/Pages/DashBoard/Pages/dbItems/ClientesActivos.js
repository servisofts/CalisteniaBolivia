import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SText, SView, SNavigation } from 'servisofts-component';
import SSRolesPermisos from '../../../../SSRolesPermisos';
import sucursal_usuario from '../../../sucursal_usuario';
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
        var arr = sucursal_usuario.Actions.getActive(this.props);
        if (!clientesActivos) return <SLoad />
        if (!clientesRol) return <SLoad />
        if (!arr) return <SLoad />
        clientesActivos = Object.values(clientesActivos).filter(i => sucursal_usuario.Actions.isActive(i.caja.key_sucursal, this.props));
        return <SView center row height>
            <SView col={"xs-12"} center >
                <SText fontSize={10}>{`Clientes activos`}</SText>
            </SView>
            <SView col={"xs-4"} height={50} onPress={() => {
                SNavigation.navigate("ClientesPage");
            }}>
                <SIcon name={"Usuarios_cliente"} />
            </SView>
            <SView col={"xs-8"} center>
                <SText bold>{`( ${clientesActivos.length} / ${Object.keys(clientesRol).length} )`}</SText>
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