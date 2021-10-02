import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SIcon, SPage, SText, SView } from 'servisofts-component'
import PerfilUsuario from './PerfilUsuario'
import xlsx from  'xlsx-color'

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

    exportXlsx(){
        var xf = "./prueba.xlsx";
        var spreadsheet = xlsx.utils.book_new();
        var sheets = {
            "Hoja 1": [
              ["key", "Nombre", "Apellido", "Otro"],
              ["xxx", "Ruddy", "Paz", "que se yo"],
              ["xxx", "Ruddy", "Paz", "ni versasd"],
              ["xxx", "Ruddy", "Paz", "MD¡asd"],
              ["xxx", "Ruddy", "error2", "M2"],
            ]
          };
          
          for (var sheet of Object.keys(sheets)) {
            xlsx.utils.book_append_sheet(
              spreadsheet,
              xlsx.utils.aoa_to_sheet(sheets[sheet]),
              sheet
            );
          }
          
          var fill = {
              patternType: "solid",
              fgColor: { rgb: "FF0000" }
          };
          
          var font = {
              color : {
                  rgb : "FFFFFF"
              },
              bold : true
          };
          var border = {
              bottom : {
                  style : "thin",
                  color : {
                      theme : 5,
                      tint : "1",
                      rgb: "000000"
                  }
              }
          };
          
          spreadsheet.Sheets["Hoja 1"]["A1"].s = { fill, font, border };
          spreadsheet.Sheets["Hoja 1"]["B1"].s = { fill };
          spreadsheet.Sheets["Hoja 1"]["C1"].s = { fill };
          spreadsheet.Sheets["Hoja 1"]["D1"].s = { fill };
          
          
          xlsx.writeFile(spreadsheet, xf);
    }

    getOptions({ title, icon }, isLine) {
        return <SView col={"xs-12"} style={{
            height: 50,
            backgroundColor: "#66000066",
            // borderRadius: 4,
        }} center row onPress={() => {
            this.exportXlsx();
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
                <SView col={"xs-12"} center flex>
                    <SView col={"xs-11 sm-9 md-7 lg-5 xl-4"} style={{
                        // backgroundColor: "#66000022",
                        borderRadius: 6,
                        height: "100%",
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
                            {this.getOptions({ title: "Carrito", icon: "Carrito" })}
                            {this.getOptions({ title: "Ajustes", icon: "Ajustes" })}
                            {this.getOptions({ title: "Caja", icon: "Caja" }, true)}
                        </SView>
                    </SView>
                </SView>
            </SPage>
        )
    }
}
