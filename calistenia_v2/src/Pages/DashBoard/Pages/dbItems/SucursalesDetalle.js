import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SImage, SLoad, SText, STheme, SView } from 'servisofts-component';
import SSRolesPermisos from '../../../../SSRolesPermisos';
import Caja from '../../../Caja';
import Entrenamiento from '../../../Entrenamiento';
import Sucursal from '../../../Sucursal';
import Usuario from '../../../Usuario';
import SSocket from 'servisofts-socket'

class SucursalesDetalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLista() {
        var sucursales = Sucursal.Actions.getAll(this.props);
        var clientesActivos = Usuario.Actions.getAllClientesActivos(this.props);
        var cajas = Caja.Actions.getActivas(this.props);
        var entrenamientos = Entrenamiento.Actions.getAll(this.props);
        if (!entrenamientos) return <SLoad />
        if (!sucursales) return <SLoad />;
        if (!clientesActivos) return <SLoad />;
        if (!cajas) return <SLoad />
        return Object.keys(sucursales).map((key, index) => {
            var sucursal = sucursales[key];
            var cantidad = 0;
            var monto = 0;
            Object.keys(clientesActivos).map((key_cli) => {
                var cliente = clientesActivos[key_cli];
                if (cliente["caja"].key_sucursal == key) {
                    // monto += cliente["paquete"].precio;
                    cantidad++;
                }
            })
            var cantidad_caja = 0;
            Object.keys(cajas).map((key_caja) => {
                var caja = cajas[key_caja];
                if (caja.key_sucursal == key) {
                    cantidad_caja++;
                }
            })
            var cantidad_entrenamiento = 0;
            Object.keys(entrenamientos).map((key_entre) => {
                var entrenamiento = entrenamientos[key_entre];
                if (entrenamiento.key_sucursal == key) {
                    if (entrenamiento.estado == 1) {
                        cantidad_entrenamiento++;
                    }
                }
            })
            return <SView col={"xs-11 md-6 xl-3"} key={index} height={180} style={{
                padding: 4,
            }}>
                <SView center col={"xs-12"} height card style={{
                    padding: 4,
                }}>
                    <SView center col={"xs-12"} height={65} center>
                        <SView width={45} height={45}>
                            <SImage src={SSocket.api.root + "sucursal_" + key} />
                        </SView>
                        <SView flex>
                            <SText center fontSize={12} bold>{sucursal.descripcion}</SText>
                        </SView>
                    </SView>
                    <SView center col={"xs-12"} row style={{
                        padding: 4,
                    }}>
                        <SView col={"xs-12"} height={80} card row center>
                            <SView col={"xs-4"} height center>
                                <SView width={40} height={40} center>
                                    <SIcon name="Usuarios_cliente" />
                                    <SView center style={{
                                        position: "absolute",
                                        width: 30,
                                        height: 30,
                                        backgroundColor: STheme.color.background + "99",
                                        borderRadius: 8
                                    }}>
                                        <SText center fontSize={18} bold>{cantidad}</SText>
                                    </SView>
                                </SView>
                                <SText center fontSize={10}>{'Clientes'}</SText>
                                {/* <SText center fontSize={10}>{`Bs. ${monto.toLocaleString('de-DE')}`}</SText> */}
                            </SView>
                            <SView col={"xs-4"} height center>
                                <SView width={40} height={40} center>
                                    <SIcon name="Caja" />
                                    <SView center style={{
                                        position: "absolute",
                                        width: 30,
                                        height: 30,
                                        backgroundColor: STheme.color.background + "99",
                                        borderRadius: 8
                                    }}>
                                        <SText center fontSize={18} bold>{cantidad_caja}</SText>
                                    </SView>
                                </SView>
                                <SText center fontSize={10}>{'Cajas'}</SText>
                                <SText center fontSize={10}>{" "}</SText>
                            </SView>
                            <SView col={"xs-4"} center>
                                <SView width={40} height={40} center>
                                    <SIcon name="Entrenamiento" />
                                    <SView center style={{
                                        position: "absolute",
                                        width: 30,
                                        height: 30,
                                        backgroundColor: STheme.color.background + "99",
                                        borderRadius: 8
                                    }}>
                                        <SText center fontSize={18} bold>{cantidad_entrenamiento}</SText>
                                        
                                    </SView>
                                </SView>
                                <SText center fontSize={10}>{'Entrenando'}</SText>
                                <SText center fontSize={10}>{" "}</SText>
                            </SView>

                        </SView>
                    </SView>
                </SView>
            </SView>
        })
    }
    getContent() {
        var sucursales = Sucursal.Actions.getAll(this.props);
        var clientesActivos = Usuario.Actions.getAllClientesActivos(this.props);
        if (!sucursales) return <SLoad />;
        if (!clientesActivos) return <SLoad />;
        return <SView col={"xs-12"} center row>
            <SView col={"xs-12"} center >
                <SText fontSize={10}>{`Sucursales`}</SText>
            </SView>
            <SView col={"xs-12"} center row style={{
                // justifyContent: "space-between"
            }} >
                {this.getLista()}
            </SView>
        </SView>
    }
    render() {
        return (
            <SView col={"xs-12"} style={{
                padding: 8,
            }}>
                <SView col={"xs-12"} height center row>
                    {this.getContent()}
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SucursalesDetalle);