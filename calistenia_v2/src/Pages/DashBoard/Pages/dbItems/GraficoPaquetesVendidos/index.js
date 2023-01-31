import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SImage, SLoad, SText, SView } from 'servisofts-component';

import SSocket from 'servisofts-socket'
import Sucursal from '../../../../Sucursal';
import sucursal_usuario from '../../../../sucursal_usuario';
import Grafico from './Grafico';

class GraficoPaquetesVendidos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: {}
        };
    }
    getSucursales() {
        var sucursales = Sucursal.Actions.getAll(this.props);
        if (!sucursales) return <SLoad />
        return Object.keys(sucursales).map((key) => {
            var obj = sucursales[key];
            if (!sucursal_usuario.Actions.isActive(key, this.props)) {
                return null;
            }
            return <SView col={"xs-12"} height={50} style={{ padding: 2, }} onPress={() => {
                if (this.state.select[key]) {
                    delete this.state.select[key];
                } else {
                    this.state.select[key] = true;
                }
                this.setState({ select: { ...this.state.select } });
            }}>
                <SView flex center card row style={{ overflow: 'hidden', }}>
                    <SView col={"xs-10 sm-4"} height center backgroundColor={!this.state.select[key] ? null : `${obj.color}66`}>
                        <SImage src={SSocket.api.root + "sucursal/" + key} style={{
                            width: '80%',
                            height: '80%',
                        }} />
                    </SView>
                    <SView flex height backgroundColor={!this.state.select[key] ? null : `${obj.color}66`} style={{
                        overflow: 'hidden',
                    }} center>
                        <SText col={"xs-0 sm-12"} fontSize={12} style={{
                            overflow: 'hidden',
                        }}>{obj.descripcion}</SText>
                    </SView>
                    <SView width={8} height backgroundColor={`${obj.color}ff`} />
                </SView>
            </SView>
        })
    }
    render() {
        return (
            <SView col={"xs-12"} row  >
                <SView col={"xs-12"} center >
                    <SText fontSize={16}>{`Cantidad de paquetes vendidos`}</SText>
                </SView>
                <SView
                    col={"xs-2 xl-1"} row style={{
                        minHeight: 300,
                    }}>
                    {this.getSucursales()}
                </SView>
                <SView
                    col={"xs-10 xl-11"}
                    flex>
                    <Grafico
                        fechaInicio={this.props.fechaInicio} fechaFin={this.props.fechaFin}
                        select={this.state.select} setSucursal={(key) => {
                            if (this.state.select[key]) {
                                delete this.state.select[key];
                            } else {
                                this.state.select[key] = true;
                            }
                            this.setState({ select: { ...this.state.select } });
                        }} />
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(GraficoPaquetesVendidos);