import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SNavigation, SPage, SText } from 'servisofts-component';
import Recibo from '../Components/Recibo';

import jspdf from 'jspdf'
import Html2Canvas from 'html2canvas'

class ReciboCaja extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key = SNavigation.getParam("key", false);
    }

    imprimir() {
        const input = document.getElementById('recibo');
        Html2Canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jspdf('p', 'mm', [canvas.width , canvas.height ]);
                const imgWidth = pdf.internal.pageSize.getWidth();
                const pageHeight = pdf.internal.pageSize.getHeight();
                const imgHeight = canvas.height * imgWidth / canvas.width;
                const heightLeft = imgHeight;
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
                pdf.save('recibo.pdf');
            });
    }
    render() {

        return (
            <SPage title={'ReciboCaja'}>
                <SButtom type={"danger"} onPress={() => { this.imprimir() }}>{"IMPRIMIR"}</SButtom>
                <div id="recibo">
                    <Recibo key_caja={this.key} />
                </div>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(ReciboCaja);