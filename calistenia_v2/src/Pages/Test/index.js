import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as xlsx from 'xlsx';
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

                <SInput type={"file"} customStyle={"calistenia"} col={"xs-6"} onChangeText={async (files) => {
                    // files, Es un array de files que contiene 
                    // [{   file:{ },    uri:"..."   }]
                    // xlsx.r

                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const data = new Uint8Array(e.target.result);
                        const workbook = xlsx.read(data, { type: 'array' });
                        console.log(workbook)
                        // process workbook data here
                    };
                    reader.readAsArrayBuffer(files[0].file);

                }} />

            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Test);