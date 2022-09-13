import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from ".."
import Sucursal from '../../../../../Pages/Sucursal';
import punto_venta from '../../punto_venta';
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLista = () => {
        var sucs = Sucursal.Actions.getAll(this.props);
        var all = punto_venta.Actions.getAll(this.props);
        if (!all) return null;
        if (!sucs) return null;
        return <STable2
            // headerColor={"#ff0"}
            header={[
                { key: "index", label: "#", width: 50 },
                { key: "descripcion", label: "Punto venta", width: 300 },
                {
                    key: "key_sucursal", label: "Sucursal", width: 300, render: (key) => {
                        return sucs[key]?.descripcion
                    }
                },
                {
                    key: "actividad-hora", label: "Last Activity", width: 150, center: true, render: (item) => {
                        return new SDate(item.fecha_on).toString("yyyy-MM-dd hh:mm:ss")
                    }
                },
                {
                    key: "key-dispositivos", label: "Devices", width: 50, center: true,
                    component: (item) => {
                        return <SView onPress={() => { SNavigation.navigate("dispositivo", { key_punto_venta: item }) }}>
                            <SIcon name={"Ajustes"} width={35} />
                        </SView>
                    }
                },
            ]}
            data={all}
        />
    }

    render() {
        SNavigation.replace("dispositivo")
        return (
            <SPage title={Parent.component} disableScroll>
                {this.getLista()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Home);