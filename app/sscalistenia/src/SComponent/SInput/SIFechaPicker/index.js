import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SButtom } from '../../SButtom';
import { SPopupOpen } from '../../SPopup';
import SIFechaAlert from './SIFechaAlert';
export default class SIFechaPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SButtom options={{
                type: "outline",
            }} onPress={() => {
                SPopupOpen({
                    key: "fechaPicker",
                    content: (
                        <SIFechaAlert/>
                    )
                })
            }}>popup</SButtom>
        );
    }
}
