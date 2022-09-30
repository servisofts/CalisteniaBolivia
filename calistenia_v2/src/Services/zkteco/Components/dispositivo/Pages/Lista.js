import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SList, SLoad, SNavigation, SPage, SPopup, STable2, SText, STheme, SView } from 'servisofts-component';
import Parent from ".."
import SSocket from 'servisofts-socket';
import BtnSincronizar from '../Components/BtnSincronizar';
import DeviceItem from '../Components/DeviceItem';
import Sucursal from '../../../../../Pages/Sucursal';
import punto_venta from '../../punto_venta';
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        // this.key_punto_venta = SNavigation.getParam("key_punto_venta");
    }

    getLista() {
        Sucursal.Actions.getAll(this.props);
        punto_venta.Actions.getAll(this.props);
        var data = Parent.Actions.getAll(this.props);
        if (!data) return <SLoad />;
        return <SList
            horizontal
            space={0}
            data={data}
            render={obj => <SView col={"xs-12 sm-6 md-4 lg-3"} style={{
                padding: 8
            }}>
                <DeviceItem obj={obj} />
            </SView>}
        />
    }

    render() {
        return (
            <SPage title={'Lista de ' + Parent.component} >
                <SView col={"xs-12"} center>
                    {/* <SView col={"xs-11 sm-10 md-8 lg-6 xl-4"} center> */}
                    {this.getLista()}
                    {/* </SView> */}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);