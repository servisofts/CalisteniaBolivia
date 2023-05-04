import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SImage, SPage, SText, STheme, SView, SNavigation, SPopup } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../Model';
export type BoxMenuLatPropsType = {
    datas: any,
    onPress?: (obj) => {},
}
class index extends Component<BoxMenuLatPropsType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handlePress() {
        if (!this.props.onPress) return null;

        this.props.onPress(this.props.datas)
    }

    popupEliminar() {
        var INSTACE = this;
        return <SView
            // style={{ width: "100%", maxWidth: 365, height: 380, borderRadius: 30, padding: 8 }}
            style={{ height: 200, borderRadius: 30, padding: 8 }}
            center
            withoutFeedback
            backgroundColor={STheme.color.background}
            col={"xs-11 sm-9 md-7 xl-5 xxl-4"}
        >
            <SHr />
            <SHr />
            <SView col={"xs-12"} center>
                <SText color={STheme.color.text} bold style={{ fontSize: 20 }} center >Eliminar</SText>
                <SHr height={20} />
                <SText color={STheme.color.text} style={{ fontSize: 15 }} center >¿Estás seguro de eliminar la publicación?</SText>
            </SView>
            <SView flex />
            <SView col={"xs-12  "} center row style={{ backgroundColor: STheme.color.white }}>
                <SView col={"xs-11"} row center>
                    <SView card padding={8} row width={130} center onPress={() => {
                        SNavigation.navigate("/perfil/editar", { key: usuario.key });
                    }}>
                        <SText bold>CONFIRMAR</SText>
                    </SView>
                    <SView width={15} />
                    <SView card padding={8} row width={130} center onPress={() => {
                        SNavigation.navigate("/perfil/editar", { key: usuario.key });
                    }}>
                        <SText bold>CANCELAR</SText>
                    </SView>
                    {/* <Button onClick={handleClosePopup} color="primary">
                        Cancel
          </Button>
                    <Button onClick={() => eliminar()} color="primary">
                        Eliminar
          </Button> */}
                    <SHr height={15} />
                </SView>
            </SView>
            <SView flex />
            <SHr />
            <SHr />
        </SView>
    }

    renderBox() {
        var INSTACE = this;
        return <SView col={"xs-11 sm-9 md-7 xl-5 xxl-4"} center row withoutFeedback backgroundColor={STheme.color.background}
            style={{
                borderRadius: 20,
                overflow: "hidden",
                borderWidth: 1,
                borderBottomWidth: 2,
                borderColor: "#66666622",
                marginBottom: 50,

            }}
        >
            <SHr height={15} />

            <SView col={"xs-12  "} center row >
                <SView col={"xs-11"} row center>
                    <SView col={"xs-12"} height={48} center
                        style={{
                            borderBottomColor: STheme.color.gray,
                            borderBottomWidth: 1
                        }}
                        onPress={() => { }}
                    >
                        <SText fontSize={14} >Desactivar comentarios</SText>
                    </SView>
                    <SView col={"xs-12"} height={48} center
                        style={{
                            borderBottomColor: STheme.color.gray,
                            borderBottomWidth: 1
                        }}
                        onPress={() => { }}
                    >
                        <SText fontSize={14} >Editar</SText>
                    </SView>
                    <SView col={"xs-12"} height={48} center

                        onPress={() => {
                            console.log(this.props.datas)
                            SPopup.open({ key: "confirmar", content: this.popupEliminar() });
                            // SPopup.confirm({
                            //     title: "Eliminar", message: "¿Estás seguro de eliminar la publicación?", onPress: () => {
                            //         Model.publicacion.Action.editar({
                            //             // data: {
                            //             //     ...obj,
                            //             //     estado: 0
                            //             // },
                            //         })
                            //         // Parent.Actions.eliminar(obj, this.props)
                            //     }
                            // })
                        }}
                    >
                        <SText fontSize={14} >Eliminar</SText>
                    </SView>
                    <SHr height={15} />
                    {/* <SView col={"xs-12"} style={{ borderBottomWidth: 1, borderColor: STheme.color.lightGray }}></SView> */}
                    {/* <SHr height={18} /> */}
                </SView>
            </SView>
            <SView flex />
        </SView>
    }

    render() {
        return (<SView col={"xs-12"} center>
            {/* <SText>{JSON.stringify(this.props.data)}</SText> */}
            {this.renderBox()}
            <SHr h={8} />
        </SView >
        );
    }
}
export default (index);