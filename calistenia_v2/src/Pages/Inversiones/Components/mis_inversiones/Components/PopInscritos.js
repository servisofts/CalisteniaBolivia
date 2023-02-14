import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SLoad, SPage, SScrollView2, SText, SView } from 'servisofts-component';
import Model from '../../../../../Model';
import Usuario from '../../../../Usuario';

class PopInscritos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getUsuarios(data_usuarios, obj) {
        return obj.usuarios.map((key) => {
            var usuario = data_usuarios[key];
            return <SText>{`${usuario.Nombres} ${usuario.Apellidos}`}</SText>
        });
    }
    getInscritos() {
        let data = this.props.ventas_del_dia;
        var data_usuarios = Model.usuario.Action.getAll();
        if (!data_usuarios) return <SLoad />
        data.sort((a, b) => {
            return new SDate(a.fecha_on).isAfter(new SDate(b.fecha_on)) ? 1 : -1;
        })
        return data.map((obj) => {
            return <>
                <SHr />
                <SHr />
                <SView col={"xs-12"} row>
                    <SView flex>
                        {this.getUsuarios(data_usuarios, obj)}
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