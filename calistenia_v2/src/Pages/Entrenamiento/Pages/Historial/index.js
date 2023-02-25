import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SImage, SLoad, SNavigation, SOrdenador, SPage, SText, SView } from 'servisofts-component';
import Entrenamiento from '../..';
import Sucursal from '../../../Sucursal';
import Usuario from '../../../Usuario';
import SSocket from 'servisofts-socket';
import Asistencia from '../../../Asistencia';
import RelojEntrenamiento from '../Lista/RelojEntrenamiento';
import FechaSingle from '../../../../Components/FechaSingle';
import sucursal_usuario from '../../../sucursal_usuario';
import Model from '../../../../Model';

class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sucursal: null,
            fecha: SNavigation.getParam("fecha", new SDate("").toString("yyyy-MM-dd")),
        };
        this.key_sucursal = SNavigation.getParam("key_sucursal");

    }
    componentDidMount() {
        // Entrenamiento.Actions.getByDate(this.props, true);
    }
    getSucursal = (key) => {
        var sucursal = Sucursal.Actions.getByKey(key, this.props);
        if (!sucursal) return <SText>{"SIN SUCURSAL"}</SText>
        return <SView col={"xs-12"} row>
            <SView width={40} height={40} style={{
                borderRadius: "50%",
                overflow: "hidden",
            }} >
                <SImage src={SSocket.api.root + "sucursal/" + key} />
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
        if (!key) {
            return <SText fontSize={18} capitalize>{`Molinete`}</SText>
        }

    
        var usuario = Model.usuario.Action.getByKey(key);
        if (!usuario) return <SLoad />
        return <SView col={"xs-12"} center>
            {/* <SText fontSize={10} color={"#999"} >{`Entrenador`}</SText> */}

            <SView width={70} height={70}>
                <SImage src={SSocket.api.root + "usuario/" + key} />
            </SView>
            <SHr height={8} />
            <SText fontSize={18} capitalize>{`${usuario.Nombres} ${usuario.Apellidos}`}</SText>
        </SView>
    }
    getAsistencia = (obj) => {
        var asistencia = Asistencia.Actions.getByKeyEntrenamiento({
            key_entrenamiento: obj.key,
        }, this.props);
        if (!asistencia) return <SLoad />

        return <SView col={"xs-12"} center>
            <SView col={"xs-12"} center row>
                {Object.keys(asistencia).map((key) => {
                
                    var usuario = Model.usuario.Action.getByKey(asistencia[key].key_usuario);
                    if (!usuario) return <SLoad />
                    return <SView col={"xs-2 md-1.5"} colSquare style={{
                        padding: 4,
                    }}>
                        <SView card height col={"xs-12"} center style={{
                            overflow: "hidden",
                        }}>
                            <SView width={40} height={40}>
                                <SImage src={SSocket.api.root + "usuario/" + usuario.key} />
                            </SView>
                            <SText key={key} capitalize center fontSize={10}>{`${usuario.Nombres} ${usuario.Apellidos}`}</SText>
                        </SView>

                    </SView>
                })}
            </SView>
        </SView>
    }
    getEstado = (obj) => {
        if (!new SDate().isAfter(new SDate(obj.fecha_fin))) {
            return <SView col={"xs-12"} height={60} center>
                <RelojEntrenamiento data={obj} />
            </SView>
        }
        return <SView col={"xs-12"} height={60} center>
            <SView width={100} height={50} backgroundColor={!obj.fecha_fin ? "#060" : "#600"} style={{
                borderRadius: 8,
            }} center>
                <SText fontSize={16} bold>{new SDate(obj.fecha_inicio).toString("hh:mm")}</SText>
            </SView>
            <SText color={"#999"} fontSize={12}>{"Hora de inicio."}</SText>
        </SView>
    }
    getLista() {
        var data_t = Entrenamiento.Actions.getByDate(this.state.fecha, this.props);
        var usuarios = Model.usuario.Action.getAll();
        var sucursales = Sucursal.Actions.getAll(this.props);
        var arr_f = sucursal_usuario.Actions.getActive(this.props);
        if (!arr_f) return <SLoad />
        if (!data_t) return <SLoad />
        var data = {};
        Object.values(data_t).map((obj) => {
            if (!obj.key) return <SView />;
            if (this.state.sucursal) {
                if (obj.key_sucursal != this.state.sucursal.key) return null;
            }
            if (!sucursal_usuario.Actions.isActive(obj.key_sucursal, this.props)) {
                return null;
            }
            data[obj.key] = obj;
        })
        return new SOrdenador([
            { key: "fecha_on", order: "desc", peso: 1 }
        ]).ordernarObject(data).map((key, i) => {
            var obj = data[key];
            return <>
                <SHr height={16} />
                <SView col={"xs-11 md-8 xl-6"} key={key} card style={{
                    padding: 4,
                }} center onPress={() => {
                    SNavigation.navigate("entrenamiento_perfil", { key_entrenamiento: obj.key })
                }}>
                    <SView col={"xs-12"} style={{
                        alignItems: "flex-end",
                    }}>
                        <SText fontSize={10} color={"#999"}>{`${new SDate(obj.fecha_on).toString("dd de MONTH, yyyy")}`}</SText>
                        <SText fontSize={10} color={"#999"}>{`${new SDate(obj.fecha_on).toString("hh:mm")}`}</SText>
                    </SView>
                    {this.getSucursal(obj.key_sucursal)}
                    <SHr height={16} />
                    {this.getUsuario(obj.key_usuario)}
                    <SHr height={16} />
                    <SText>{`# de personas que entrenaron: ${obj.cantidad}`}</SText>
                    <SHr height={16} />
                    {this.getEstado(obj)}
                    {/* {this.getAsistencia(obj)} */}
                    {/* <SText>{`json: ${JSON.stringify(obj, "\n", "\t")}`}</SText> */}
                </SView>
            </>
        });
    }
    getTotal() {
        var data = Entrenamiento.Actions.getByDate(this.state.fecha, this.props);
        if (!data) return <SLoad />
        var total = 0;
        var total_personas = 0;
        Object.keys(data).map((key, i) => {
            var obj = data[key];
            // if (i > 20) return null;
            if (!obj.key) return <SView />;
            if (this.state.sucursal) {
                if (obj.key_sucursal != this.state.sucursal.key) return null;
            }
            if (!sucursal_usuario.Actions.isActive(obj.key_sucursal, this.props)) {
                return null;
            }
            total_personas += obj.cantidad;
            total++;
        });
        return <SView col={"xs-12"} center>
            <SHr />
            <SText color={"#999"}>{`Entrenamientos ( ${total} )`} </SText>
            <SText color={"#999"}>{`Personas que entrenaron ( ${total_personas} ) `}</SText>
            <SHr />
        </SView>
    }
    render() {
        return (
            <SPage title={"Entrenamientos historicos"}>
                <SView center>
                    <FechaSingle fecha_inicio={this.state.fecha} onChange={(fecha) => {
                        this.setState({
                            fecha: fecha,
                        });
                    }} />
                    <Sucursal.Component.SucursalSelect key_sucursal={this.key_sucursal} sucursal={this.state.sucursal} setSucursal={(obj) => {
                        this.setState({ sucursal: obj });
                    }} />
                    {this.getTotal()}
                    {this.getLista()}
                    <SHr height={32} />
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);