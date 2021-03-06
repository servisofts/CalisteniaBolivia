import React, { Component } from 'react'
import { Text, View, Platform } from 'react-native'
import { SHr, SIcon, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component'
import MisRoles from './MisRoles'
import MisSucursales from './MisSucursales'
import PerfilUsuario from './PerfilUsuario'
// import xlsx from 'xlsx-color'
// var RNFS = require('react-native-fs');
export default class AjustesPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props)
        this.state = {
            text: 'Ajustes'
        }
    }


    getOptions({ title, icon, url }, isLine) {
        return <SView col={"xs-12"} style={{
            height: 50,
            backgroundColor: STheme.color.card,
            // borderRadius: 4,
        }} center row onPress={() => {
            SNavigation.navigate(url)
            // this.exportXlsx();
        }}>
            <SView style={{
                width: 60,
            }} center>
                <SIcon name={icon} style={{
                    width: 35,
                    height: 35,
                }} />
            </SView>
            <SView flex style={{
                height: "100%",
                justifyContent: "center",
                borderBottomWidth: (!isLine ? 1 : 0),
                borderBottomColor: "#66666644",
                paddingStart: 4,
            }}>
                <SText style={{ fontSize: 14 }}>{title}</SText>
            </SView>
        </SView>
    }
    render() {
        return (
            <SPage
                title={"Ajustes"}
            >
                <SView col={"xs-12"} center>
                    <SView col={"xs-11 sm-9 md-7 lg-5 xl-4"} style={{
                        borderRadius: 6,
                        alignItems: "center"
                    }}>

                        <SView col={"xs-12"} style={{ height: 24 }} />
                        <SView style={{
                            width: "100%",
                            borderRadius: 8,
                            overflow: "hidden",
                        }}>
                            <PerfilUsuario navigation={this.props.navigation} />
                        </SView>
                        <SView col={"xs-12"} style={{ height: 24 }} />
                        <SView style={{
                            width: "100%",
                            borderRadius: 8,
                            overflow: "hidden",
                        }}>
                            {/* {this.getOptions({ title: "Manual de uso", icon: "Alert", url: "manual" })} */}
                            {/* {this.getOptions({ title: "Ajustes", icon: "Ajustes" })} */}
                            {/* {this.getOptions({ title: "Caja", icon: "Caja" }, true)} */}
                        </SView>
                    </SView>
                    <SHr />
                    <MisRoles />
                    <SHr />
                    <MisSucursales />
                </SView>
            </SPage>
        )
    }
}
