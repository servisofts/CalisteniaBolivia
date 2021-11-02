import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SLoad, SPage, SView, SText } from 'servisofts-component';

class EsperandoVenta extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage hidden>
                <SView col={"xs-12"} flex center>
                    <SText fontSize={20}>Esperando Venta</SText>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(EsperandoVenta);