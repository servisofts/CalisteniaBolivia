import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SHr, SPage, SText, SView } from 'servisofts-component';
import { jsPDF } from "jspdf";

class Manual extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

   
  

    render() {
        return (
            <SPage title="Manual">
                <SView col="xs-12" center>
                    <SView onPress={this.pdf}>
                        <SText>Pdf</SText>
                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Manual);