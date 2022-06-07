import React, { Component } from 'react';
import { connect } from 'react-redux';
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
                
                <SInput type={"date_my"} customStyle={"calistenia"} col={"xs-6"}/>
                
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Test);