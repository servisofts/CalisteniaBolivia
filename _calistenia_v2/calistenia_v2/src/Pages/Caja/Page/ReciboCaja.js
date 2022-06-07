import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SNavigation, SPage, SText } from 'servisofts-component';
import Recibo from '../Components/Recibo';

import SPdf from '../../../Components/SPdf';

class ReciboCaja extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key", false);
    }

    render() {

        return (
            <SPage title={'ReciboCaja'} center>
                <SButtom type={"danger"} onPress={() => { this.pdf.imprimir() }}>{"IMPRIMIR"}</SButtom>
                <SPdf ref={ref => this.pdf = ref} size="Legal" >
                    <Recibo key_caja={this.key} />
                </SPdf>

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ReciboCaja);