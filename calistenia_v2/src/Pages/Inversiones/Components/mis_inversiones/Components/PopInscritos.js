import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SLoad, SPage, SScrollView2, SText, SView } from 'servisofts-component';
import Usuario from '../../../../Usuario';

class PopInscritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getInscritos() {
        let data = this.props.ventas_del_dia;
        // var data_usuarios = Usuario.Actions.getAll(this.props);
        // if (!data_usuarios) return <SLoad />
        data.sort((a, b) => {
            return new SDate(a.fecha_on).isAfter(new SDate(b.fecha_on)) ? 1 : -1;
        })
        return data.map((obj) => {
            // var usuario = data_usuarios[obj.key_usuario];
            return <>
                <SHr />
                <SHr />
                <SView col={"xs-12"} row>
                    <SView flex>
                        {/* <SText>{`${usuario.Nombres} ${usuario.Apellidos}`}</SText> */}
                        <SText>{`${obj.key}`}</SText>
                        {/* <SText>{`${JSON.stringify(obj)}`}</SText> */}
                    </SView>
                    <SView width={100}>
                        <SText>{new SDate(obj.fecha_on).toString("MON,dd hh:mm")}</SText>
                    </SView>
                </SView>
            </>
        })
    }
    render() {
        return (
            <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} height={1000} style={{
                maxHeight: "90%",
            }}>
                <SView col={"xs-12"} flex backgroundColor={"#000"} style={{
                    overflow: "hidden",
                }}>
                    {SPage.backgroundComponent}
                    <SScrollView2 disableHorizontal>
                        <SView col={"xs-12"} center >
                            <SHr height={8} />
                            <SText fontSize={18} bold>Lista de inscritos</SText>
                            <SText fontSize={16} >{this.props.fecha}</SText>
                            <SHr height={8} />

                            <SView col={"xs-11"} center >
                                {this.getInscritos()}
                                <SHr height={50} />

                            </SView>
                        </SView>
                    </SScrollView2>

                </SView>

            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(PopInscritos);