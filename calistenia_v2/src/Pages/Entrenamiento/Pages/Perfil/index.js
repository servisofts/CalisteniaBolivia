import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SImage, SLoad, SNavigation, SPage, SText, SView } from 'servisofts-component';
import Asistencia from '../../../Asistencia';
import Usuario from '../../../Usuario';
import SSocket from 'servisofts-socket'
import Entrenamiento from '../..';
import RelojEntrenamiento from '../Lista/RelojEntrenamiento';
import Sucursal from '../../../Sucursal';
class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_entrenamiento = SNavigation.getParam("key_entrenamiento");
    }
    getAsistencia = (obj) => {
        var asistencia = Asistencia.Actions.getByKeyEntrenamiento({
            key_entrenamiento: this.key_entrenamiento,
        }, this.props);

        if (!asistencia) return <SLoad />

        return <SView col={"xs-12"} center>
            <SView col={"xs-12"} center row>
                {Object.keys(asistencia).map((key) => {
                    var usuario = Usuario.Actions.getByKey(asistencia[key].key_usuario, this.props);
                    if (!usuario) return <SLoad />
                    return <SView width={120} height={120} colSquare style={{
                        padding: 4,
                    }} onPress={() => {
                        SNavigation.navigate("ClientePerfilPage", { key: asistencia[key].key_usuario })
                    }}>
                        <SView card height col={"xs-12"} center style={{
                            overflow: "hidden",
                        }}>
                            <SText key={key} capitalize center fontSize={12}>{`${asistencia[key]?.descripcion}`}</SText>
                            <SHr/>
                            <SView width={40} height={40}>
                                <SImage src={SSocket.api.root + "usuario_" + usuario.key} />
                            </SView>
                            <SHr/>
                            <SText key={key} capitalize center fontSize={12}>{`${usuario.Nombres} ${usuario.Apellidos}`}</SText>
                        </SView>

                    </SView>
                })}
            </SView>
        </SView>
    }
    getEntrenamiento() {
        var entrenamiento = Entrenamiento.Actions.getByKey(this.key_entrenamiento, this.props);
        if (!entrenamiento) return <SLoad />
        return <SView col={"xs-11"} center>
            {this.getSucursal(entrenamiento.key_sucursal)}
            {this.getUsuario(entrenamiento.key_usuario)}
            <SHr height={32} />
            {this.getEstado(entrenamiento)}
        </SView>
    }
    getSucursal = (key) => {
        var sucursal = Sucursal.Actions.getByKey(key, this.props);
        if (!sucursal) return <SLoad />
        return <SView col={"xs-11"} row>
            <SView width={40} height={40} style={{
                borderRadius: "50%",
                overflow: "hidden",
            }} >
                <SImage src={SSocket.api.root + "sucursal_" + key} />
            </SView>
            <SView flex style={{
                justifyContent: "center",
            }}>
                <SText>{`${sucursal.descripcion}`}</SText>
                <SText fontSize={10} color={"#999"}>{`${!sucursal.direccion ? "" : sucursal.direccion}`}</SText>
            </SView>
        </SView>
    }
    getUsuario = (key) => {
        if (!key) return <SText fontSize={18} capitalize>{`Molinete`}</SText>
        var usuario = Usuario.Actions.getByKey(key, this.props);
        if (!usuario) return <SLoad />
        return <SView col={"xs-12"} center >
            {/* <SText fontSize={10} color={"#999"} >{`Entrenador`}</SText> */}

            <SView width={70} height={70} backgroundColor={"#66000022"} style={{
                borderRadius: "50%",
            }}>
                <SImage src={SSocket.api.root + "usuario_" + key} />
            </SView>
            <SHr height={8} />
            <SText fontSize={18} capitalize>{`${usuario.Nombres} ${usuario.Apellidos}`}</SText>
        </SView>
    }
    getEstado = (obj) => {
        if (new SDate(obj.fecha_fin).isBefore(new SDate())) {
            return <SView col={"xs-12"} height={60} center>
                <SView width={100} height={50} backgroundColor={"#600"} style={{
                    borderRadius: 8,
                }} center>
                    <SText fontSize={16} bold>{new SDate(obj.fecha_fin).toString("hh:mm")}</SText>
                </SView>
                <SText color={"#999"} fontSize={12}>{"Hora de finalizacion."}</SText>
            </SView>
        }
        return <SView col={"xs-12"} height={60} center>
            <RelojEntrenamiento data={obj} />
        </SView>

    }
    render() {
        return (
            <SPage title={'Perfil'}>
                <SView col={"xs-12"} center>
                    <SHr height={40} />
                    {this.getEntrenamiento()}
                    <SHr height={40} />
                    <SText>{"Asistencia"}</SText>
                    {this.getAsistencia({ key: this.key_entrenamiento })}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Perfil);