import React, { Component } from 'react';
import { connect } from 'react-redux';
import xlsx from 'xlsx-color';
import { SInput, SPage, SText } from 'servisofts-component';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage title={'Test'}>

                <SInput type={"file"} customStyle={"calistenia"} col={"xs-6"} onChangeText={ async(files) => {
                    // files, Es un array de files que contiene 
                    // [{   file:{ },    uri:"..."   }]
                    console.log(files[0]);
                    const XLSX = require('xlsx-color');
                    const workbook = XLSX.readFile(files[0].file);
                    
                    console.log(workbook);
                }} />

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Test);