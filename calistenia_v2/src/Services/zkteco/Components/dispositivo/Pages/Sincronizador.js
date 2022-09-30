import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SList, SLoad, SNavigation, SPage, SPopup, STable2, SText, STheme, SView } from 'servisofts-component';
import Parent from ".."
import SSocket from 'servisofts-socket';
import BtnSincronizar from '../Components/BtnSincronizar';
import DeviceItem from '../Components/DeviceItem';
import Sucursal from '../../../../../Pages/Sucursal';
import punto_venta from '../../punto_venta';
class Sincronizador extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // this.key_punto_venta = SNavigation.getParam("key_punto_venta");
    }

    Item({ obj, punto_venta }) {
        return <SView>
            <SView row card height={50} center>
                <SView flex style={{
                    alignItems: 'end',
                }}>
                    <SText fontSize={18} bold>{punto_venta.descripcion}</SText>
                </SView>
                <SView width={8} />
                <SView>
                    <SLoad />
                </SView>
                <SView width={8} />
                <SView flex>
                    <SText fontSize={12}>{obj.descripcion}</SText>
                </SView>
            </SView>
        </SView>
    }
    getLista() {
        var puntos_ventas = punto_venta.Actions.getAll(this.props);
        var data = Parent.Actions.getAll(this.props);
        if (!data) return <SLoad />;
        if (!puntos_ventas) return <SLoad />;
        return <SList
            data={data}
            render={obj => this.Item({ obj, punto_venta: puntos_ventas[obj.key_punto_venta] })}
        />
    }

    render() {
        return (
            <SPage title={'Lista de ' + Parent.component} >
                <SView col={"xs-12"} center>
                    <SButtom type={"danger"} onPress={() => {
                        Parent.Actions.sincronizarAll((5 * 60 * 1000)).then((resp) => {
                            if (resp.estado == "exito") {
                                console.log("Exito al sincronizar molinete");
                            }
                        }).catch((e) => {
                            console.log("Error al sincronizar molinete");
                            console.log(e);
                        })
                    }}>SINC</SButtom>
                    <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center>
                        {this.getLista()}
                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Sincronizador);