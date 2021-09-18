import React, { Component } from 'react';
import { SImage, SText, STheme, SView, SIcon, SNavigation,SLoad } from 'servisofts-component';
import ComponentPadre from '../../Pages/Ajustes/Pages/PalabraRestringida/index';
// import parserHtml from "html-react-parser"
import ComponentGlup from '../../Pages/Glup/index';


export default class Conflicto extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    getMotivo_cancelacion() {
        var pepe = "";
        var gluper = "";
        var data = ComponentGlup.getAllHistorial(this.props.props);
        if (!data) return <SLoad />
        var objGLup = data[this.props.keySelectM]
        // console.log(objGLup.key_usuario)
        if (!objGLup.motivos_cancelacion) {
            return <div>NO EXISTE CANCELACION</div>
        }
        var key_gluper = "";
        if (objGLup.oferta_aceptada) {
            key_gluper = objGLup.oferta_aceptada.key_usuario;
        }
        var codigoPepe = "";
        var codigoGluper = "";
        Object.keys(objGLup.motivos_cancelacion).map((key) => {
            var obj = objGLup.motivos_cancelacion[key];
            if (objGLup.key_usuario == obj.key_usuario) {
                pepe = obj.motivo.descripcion;
                codigoPepe = obj.motivo.codigo;
            }
            if (key_gluper == obj.key_usuario) {
                gluper = obj.motivo.descripcion;
                codigoGluper = obj.motivo.codigo;
            }
        })

        return (
            <SView >
                <SView xs={6} style={{
                    textAlign: "center",
                }} center>
                    <SView style={{
                        width: 300,
                        height: 200,
                        background: "#fff",
                        borderRadius: 20,
                        display: "inline-block"
                    }}>
                        <SView style={{
                            // background: "#ccc",
                            textAlign: "center",
                            color: "#000",
                            fontWeight: "bold",
                            margin: 4,
                        }}>
                            PEPE
                    </SView>
                        <SView container>
                            <SView xs={12} style={{
                                textAlign: "center",
                            }}>
                                <SView style={{
                                    color: "#000",
                                    width: 100,
                                    height: 100,
                                    borderRadius: 100,
                                    display: "inline-block",
                                    border: "5px solid #33DBF7",
                                    color: "#33DBF7",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    padding: 10,
                                    fontSize: 50,
                                }}>
                                    {codigoPepe}
                                </SView>
                                <SView style={{
                                    color: "#000",
                                    fontSize: 16,
                                    padding: 10,
                                    fontWeight: "bold",
                                    margin: 4,
                                }}>
                                    {pepe}
                                </SView>
                            </SView>
                        </SView>
                    </SView>
                </SView>

                <SView xs={6} style={{
                    textAlign: "center",
                }} center>
                    <SView style={{
                        width: 300,
                        height: 200,
                        display: "inline-block",
                        background: "#fff",
                        borderRadius: 20
                    }}>
                        <SView style={{
                            // background: "#ccc",
                            textAlign: "center",
                            color: "#000",
                            fontWeight: "bold",
                            margin: 4,
                        }}>
                            GLUPER
            </SView>
                        <SView >
                            <SView xs={12} justify={"center"} style={{
                                textAlign: "center",
                            }}>
                                <SView style={{
                                    color: "#000",
                                    width: 100,
                                    height: 100,
                                    borderRadius: 100,
                                    display: "inline-block",
                                    border: "5px solid #33DBF7",
                                    color: "#33DBF7",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                    padding: 10,
                                    fontSize: 50,
                                }}>
                                    {codigoGluper}
                                </SView>
                                <SView style={{
                                    color: "#000",
                                    fontSize: 16,
                                    padding: 10,
                                    fontWeight: "bold",
                                    margin: 4,
                                }}>
                                    {gluper}
                                </SView>
                            </SView>
                        </SView>
                    </SView>
                </SView>
            </SView>
        )
    }
  
    render() {
        if (!this.props.keySelectM) return;
        var data = this.props.props.state.glupReducer.perfil[this.props.keySelectM];
        if (!data) return;
        return (

            <>
             {this.getMotivo_cancelacion()}
                <SView
                    col="xs-12 md-6 xl-6"
                    height={100}
                    style={{
                        padding: 5
                    }}
                >
                    aaa
                </SView>

                
                    <SView
                        col="xs-12 md-6 xl-6"
                        height={100}
                        style={{
                            padding: 5
                        }}
                    >
                        bbbb
                    </SView>
                 

            </>
        );
    }
}
