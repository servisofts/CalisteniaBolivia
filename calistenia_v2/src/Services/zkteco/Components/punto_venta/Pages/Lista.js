import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, STheme, SView } from 'servisofts-component';
import Parent from ".."
import SSocket from 'servisofts-socket';
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_sucursal = SNavigation.getParam("key_sucursal");
    }

    getLista() {
        var data = Parent.Actions.getAllByKeySucursal(this.key_sucursal, this.props);
        if (!data) return <SLoad />;
        return data.map((obj) => {
            return <SView height={100} center width={100} style={{
                borderWidth: 2,
                borderColor: STheme.color.text,
                borderRadius: 5,
            }} onPress={() => {
                SNavigation.navigate("dispositivo", {
                    key_punto_venta: obj.key,
                })
            }}>
                <SText>{obj.descripcion}</SText>
            </SView>
        })
    }

    render() {
        return (
            <SPage title={'Lista de ' + Parent.component} disableScroll>
                <SHr />
                <SView col={"xs-12"} center row>
                    {this.getLista()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);