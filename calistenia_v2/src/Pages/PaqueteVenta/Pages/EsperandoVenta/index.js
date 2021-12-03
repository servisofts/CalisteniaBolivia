import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SPage, SView, SText, SHr, SNavigation, SThread, SButtom, SScrollView2 } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Recibo from '../../Component/Recibo';

class EsperandoVenta extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
    }
    getRecibo() {
        var reducer = this.props.state.paqueteVentaReducer;
        var key = SNavigation.getParam("key");
        var recibo = reducer.recibo[key];
        if (!recibo) {
            if (reducer.estado == "cargando") return this.isLoad();
            recibo = reducer.lastRegister;
            SSocket.send({
                component: "paqueteVenta",
                type: "getRecibo",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
                key: key
            });
            return this.isLoad();
        }
        return <SView center col={"xs-12"} center flex>
            <SHr />
            <Recibo key_paquete_venta={key} />
            <SHr />
            <SView center>
                <SButtom props={{
                    type: "danger"
                }} onPress={() => {
                    SNavigation.replace("inicio");
                }}>Ir a inicio</SButtom>
            </SView>
            <SHr height={100}/>

        </SView>
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
        this.validate();
        return (
            <SPage hidden disableScroll>
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