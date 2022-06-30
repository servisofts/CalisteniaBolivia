import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SScrollView2, SText, SView } from 'servisofts-component';
import LogoAnimado from '../CargaPage/LogoAnimado';
import Sucursal from '../Sucursal';
import Usuario from '../Usuario';
import SSocket from 'servisofts-socket'
class Presentacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getListaSucursales() {
        var sucursales = Sucursal.Actions.getAll(this.props);
        if (!sucursales) return <SLoad />
        return <SList data={sucursales}
            filter={(obj) => {
                if (obj.descripcion.indexOf("Becados") > 0) return false;
                return true;
            }}
            render={(obj) => {
                return <SView col={"xs-12"} height={300} style={{
                    borderWidth: 1,
                    borderColor: "#222",
                    borderRadius: 4,
                }} >
                    <SView col={"xs-12"} center>
                        <SView col={"xs-11"} height={200} center>
                            <SImage src={SSocket.api.root + "sucursal_" + obj.key}
                                style={{
                                    resizeMode: "cover"
                                }}
                            />
                        </SView>
                        <SText color={"#fff"} font={"Roboto"} fontSize={18}>{obj.descripcion}</SText>

                    </SView>
                </SView>
            }} />

    }
    render() {

        return (
            <SView col={"xs-12"} flex onPress={() => {
                SNavigation.navigate("login")
            }}>
                <SScrollView2 disableHorizontal>
                    <SView center col={"xs-12"}>
                        <SView col={"xs-12 sm-10 md-8 lg-6 xl-4"}>
                            {this.getListaSucursales()}
                        </SView>
                    </SView>
                </SScrollView2>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Presentacion);