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
                            SPopup.confirm({
                                title: "Eliminar", message: "¿Estás seguro de eliminar la publicación?", onPress: () => {
                                    Model.publicacion.Action.editar({
                                        // data: {
                                        //     ...obj,
                                        //     estado: 0
                                        // },
                                    })
                                    // Parent.Actions.eliminar(obj, this.props)
                                }
                            })
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