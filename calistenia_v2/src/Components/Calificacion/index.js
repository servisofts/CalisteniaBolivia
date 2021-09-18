import React, { Component } from 'react';
import { SImage, SText, STheme, SView, SIcon, SNavigation } from 'servisofts-component';
// import ComponentPadre from '../../Pages/Ajustes/Pages/PalabraRestringida/index';
// import parserHtml from "html-react-parser"


export default class Calificacion extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }
    getStart(numero) {
        return (
            <SView
                style={{
                }}
                center
            >
                <SIcon name={"Sun"} width={30} height={30} fill={STheme.color.secondary} />
                <SText style={{
                    color: "#000",
                    textAlign: "center",
                    height: "100%",
                }}>
                    ( {numero} / 5 )
                </SText>
            </SView>)
    }
    getExtra(calificacion_extra) {
        if (!calificacion_extra) {
            return <div />
        }
        var list = calificacion_extra.map((obj) => {
            var src = "";
            switch (obj.descripcion) {
                case "excelente":
                    src = "Usuarios_cliente";
                    break;
                case "precio":
                    src = "Usuarios_ventas";
                    break;
                case "tiempo":
                    src = "Usuarios_proveedor";
                    break;
            }
            return <SText style={{
                color: "#000",
                textAlign: "center"
            }}>

                <SIcon name={src} width={50} height={50} />
            </SText>
        })
        return list;
    }
    getCalificacion(datos) {
        var calificacion = [];
        if (!datos.data.calificacion) return
        datos.data.calificacion.map((obj) => {
            if (obj.key_usuario == datos.key_usuario) {
                calificacion.push(obj);
            }
        })
        return (
            <>
                <SView style={{
                    margin: 10,
                    // height: "100%",
                    background: "#fff",
                    borderRadius: 10,
                    textAlign: "center"
                }}>
                    <SText style={{
                        color: "#000",
                        textAlign: "center"
                    }}>{datos.title}</SText>
                    {calificacion.map((obj) => {
                        return (
                            <SView>
                                {this.getStart(obj.calificacion)}
                                {this.getExtra(obj.calificacion_extra)}
                            </SView>
                        )
                    })}
                </SView>
            </>
        )
    }



    render() {
        if (!this.props.keySelectM) return;
        var data = this.props.props.state.glupReducer.perfil[this.props.keySelectM];
        if (!data) return;
        return (

            <>
                <SView
                    col="xs-12 md-6 xl-6"
                    height={100}
                    style={{
                        padding: 5
                    }}
                >
                    {this.getCalificacion({
                        title: "PEPE",
                        key_usuario: data.key_usuario,
                        data: data
                    })}
                </SView>

                {(data.oferta_aceptada) ?
                    <SView
                        col="xs-12 md-6 xl-6"
                        height={100}
                        style={{
                            padding: 5
                        }}
                    >
                        {
                            this.getCalificacion({
                                title: "GLUPER",
                                key_usuario: data.oferta_aceptada.key_usuario,
                                data: data
                            })}
                    </SView>
                    : ""}

            </>
        );
    }
}
