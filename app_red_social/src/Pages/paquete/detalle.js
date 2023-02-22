import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SForm, SHr, SNavigation, SPage, SPopup, SText, STheme, SView, SIcon, SLoad, SList, SImage } from 'servisofts-component';
import { AccentBar, BottomNavigator, BtnNavegar } from '../../Components';
import Container from '../../Components/Container';
import Model from '../../Model';
import SSocket from 'servisofts-socket';
import BtnSend from './components/BtnSend';



class detalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            envio: 0
        };
        this.params = SNavigation.getAllParams();
    }

    render_with_data() {
        var paquete = Model.paquete.Action.getByKey(this.params.pk);
        if (!paquete) return <SLoad />
        console.log(JSON.stringify(paquete) + " PPPP");
        var { key, descripcion, dias, precio, participantes } = paquete;

        return <SView col={"xs-12"} center>
            <SView
                height={105}
                col={"xs-12"}
                backgroundColor={STheme.color.darkGray}
                style={{
                    borderRadius: 10,
                    padding: 18
                }}
                row
            >
                <SView col={"xs-3"} row >
                    <SView style={{
                        width: 70,
                        height: 70,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 15,
                        overflow: "hidden"
                    }}>
                        <SImage enablePreview src={SSocket.api.root + "paquete/" + key} width={"100%"} height={"100%"}
                            style={{
                                resizeMode: 'cover',
                            }}
                        />
                    </SView>
                </SView>
                <SView col={"xs-9"} >
                    <SText color={STheme.color.text} fontSize={18} style={{ textTransform: "uppercase" }}>{descripcion}</SText>
                    <SText color={STheme.color.text} fontSize={12} >
                        Busca brindar un apoyo integral al cliente para que pueda mejorar sus habilidades y alcanzar sus metas de entrenamiento.
                    </SText>

                </SView>
            </SView>
            <SHr height={16} />
            <SView
                height={105}
                col={"xs-12"}
                backgroundColor={STheme.color.darkGray}
                style={{
                    borderRadius: 10,
                    padding: 18
                }}
                row
            >
                <SView col={"xs-5.8"} center >
                    <SText fontSize={14} >Días</SText>
                    <SView row>
                        <SIcon name='Pdia' width={35} />
                        <SView width={15} />
                        <SText fontSize={32} >{dias}</SText>
                    </SView>
                </SView>
                <SView style={{ borderBottomColor: 1, backgroundColor: STheme.color.lightGray }} width={2}></SView>
                <SView col={"xs-5.8"} center>
                    <SText fontSize={14} >Participantes</SText>
                    <SView row>
                        <SIcon name='Pmodel' width={35} />
                        <SView width={15} />
                        <SText fontSize={32} >{participantes}</SText>
                    </SView>
                </SView>
            </SView>
            <SHr height={16} />
            <SView
                height={105}
                col={"xs-12"}
                backgroundColor={STheme.color.darkGray}
                style={{
                    borderRadius: 10,
                    padding: 18,
                    borderColor: STheme.color.secondary,
                    borderWidth: 2
                }}
                center
            >
                <SText fontSize={18} >Precio</SText>
                <SView row>
                    <SIcon name='Pprecio' width={35} />
                    <SView width={15} />
                    <SText fontSize={32} >Bs. {precio}</SText>
                </SView>
            </SView>
            <SHr height={26} />
            <BtnSend>Adquirir paquete</BtnSend>
        </SView>

    }

    render() {
        var defaultData = {
            ...this.params,
        };


        return (
            <SPage
                footer={this.footer()}
                title={"Detalle Membresía"}
            >
                <Container>
                    {/* <SView col={"xs-12"} >
                        <SText fontSize={26} color={STheme.color.white}>Detalle Membresía</SText>
                    </SView> */}
                    <SHr height={20} />
                    {this.render_with_data()}
                    <SHr height={30} />
                </Container>
            </SPage>
        );
    }
    footer() {
        return <BottomNavigator url={"/root"} />
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(detalle);