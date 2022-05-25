import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SPage, SView, SText, SHr, SNavigation, SThread, SButtom, SScrollView2, SPopup, SIcon, STheme } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Recibo from '../../Component/Recibo';

import jspdf from 'jspdf'
import Html2Canvas from 'html2canvas'

class EsperandoVenta extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key");
        this.key_paquete_venta_usuario = SNavigation.getParam("key_paquete_venta_usuario");
    }
    imprimir() {
        const input = document.getElementById('recibo');
        Html2Canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jspdf('p', 'mm', [canvas.width, canvas.height]);
                const imgWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const imgHeight = canvas.height * imgWidth / canvas.width;
                const heightLeft = imgHeight;
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save('recibo.pdf');
            });
    }
    validate = () => {
        var reducer = this.props.state.paqueteVentaReducer;
        if (reducer.estado == "exito" && reducer.type == "registro") {
            reducer.estado = "";
            var data = reducer.lastRegister;
            this.setState({
                data: data
            });
        }
        if (reducer.estado == "error" && reducer.type == "registro") {
            reducer.estado = "";
            this.setState({
                error: reducer.error
            });
        }
    }
    getButtom({ title, onPress, icon }) {
        return <SButtom type={"default"} style={{
            height: 70,
            backgroundColor: STheme.color.card,
            borderRadius: 8,
        }} onPress={onPress}>
            <SIcon name={icon} width={40} height={40} />
            <SHr height={4} />
            <SText secondary bold >{title}</SText>
        </SButtom>
    }
    getRecibo() {
        if (this.state.error) {
            if (this.state.error == "existe_venta") {
                return <SView col={"xs-12"} center>
                    <SHr />
                    <SHr />
                    <SText fontSize={22} bold>Ya existe una venta este día para este cliente.</SText>
                    <SHr />
                    <SHr />
                    <SButtom props={{
                        type: "danger"
                    }} onPress={() => {
                        SNavigation.replace("inicio");
                    }}>Ir a inicio</SButtom>
                </SView>
            }
            return <SText>{this.state.error}</SText>
        }
        if (SNavigation.getParam("loading")) {
            if (!this.state.data) return this.isLoad();
        }


        var reducer = this.props.state.paqueteVentaReducer;
        var key = this.key;

        return <SView center col={"xs-12"} flex>
            <SHr />
            <SHr />
            <SView row col={"xs-12"} center>
                <SView width={16} />
                {this.getButtom({ title: "IMPRIMIR", icon: "Ajustes", onPress: () => { this.imprimir() } })}
                <SView width={16} />

                {this.key_paquete_venta_usuario ? this.getButtom({
                    title: "PRORROGA", icon: "Profanity", onPress: () => {
                        SNavigation.navigate("prorroga/registro", { key_paquete_venta_usuario: this.key_paquete_venta_usuario })
                    }
                }) : null}
                <SView width={16} />
                {this.getButtom({
                    title: "SALIR", icon: "Salir", onPress: () => {
                        SPopup.confirm({
                            title: "¿Está seguro que desea ir al inicio?",
                            onPress: () => {
                                SNavigation.replace("inicio");
                            }
                        })
                    }
                })}
            </SView>
            <SHr />
            <SHr />
            <div id="recibo" style={{
                width: "100%"
            }}>
                <Recibo key_paquete_venta={key} />
            </div>


            <SHr height={100} />

        </SView>
    }
    hilo() {
        new SThread(10000, "venta", false).start(() => {
            if (!this.state.data && !this.state.error) {
                this.setState({ data: {} })
            }
        });
    }
    isLoad() {
        return <SView center>
            <SHr height={64} />
            <SText fontSize={20}>Estamos verificando la venta.</SText>
            <SHr height={64} />
            <SLoad />
            <SHr height={64} />
            <SText>Por favor aguardé sin recargar la ventana.</SText>
            <SHr />
        </SView>
    }
    render() {
        this.hilo();
        this.validate();
        var isLoad = SNavigation.getParam("loading", false);
        return (
            <SPage hidden={isLoad ? true : false} disableScroll >
                <SView col={"xs-12"} flex>
                    <SScrollView2 disableHorizontal>
                        <SView col={"xs-12"}>
                            {this.getRecibo()}
                        </SView>
                    </SScrollView2>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EsperandoVenta);