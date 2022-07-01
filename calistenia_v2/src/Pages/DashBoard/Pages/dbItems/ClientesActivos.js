import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SText, SView, SNavigation, SHr } from 'servisofts-component';
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
        var clientesActivosNoBecados = Object.values(clientesActivos).filter(i => sucursal_usuario.Actions.isActive(i.caja.key_sucursal, this.props) && i.paquete.precio > 0);
        var becados =  Object.values(clientesActivos).filter(o => o.paquete.precio == 0)
        return <SView center height col={"xs-12"}>
            <SView col={"xs-12"} center >
                <SText fontSize={10}>{`Clientes registrados ( ${Object.keys(clientesRol).length} )`}</SText>
            </SView>
            <SHr height={4} />
            <SView col={"xs-12"} row>
                <SView col={"xs-3"} height={30} onPress={() => {
                    SNavigation.navigate("ClientesPage", { nobecados: true });
                }}>
                    <SIcon name={"Usuarios_cliente"} />
                </SView>
                <SView col={"xs-4"} center>
                    <SText fontSize={12}>{`Activos`}</SText>
                </SView>
                <SView col={"xs-5"} center>
                    <SText bold fontSize={12}>{` ${clientesActivosNoBecados.length} `}</SText>
                </SView>
            </SView>
            <SHr height={4} />
            <SView col={"xs-12"} row>
                <SView col={"xs-3"} height={30} onPress={() => {
                    SNavigation.navigate("ClientesPage", { becados: true });
                }}>
                    <SIcon name={"Usuarios_proveedor"} />
                </SView>
                <SView col={"xs-4"} center>
                    <SText fontSize={12}>{`Becados`}</SText>
                </SView>
                <SView col={"xs-5"} center>
                    <SText bold fontSize={12}>{` ${becados.length} `}</SText>
                </SView>
            </SView>
        </SView >
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