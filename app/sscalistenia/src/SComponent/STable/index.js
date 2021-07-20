import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, Dimensions, Animated } from 'react-native';
import { SButtom, SText, STheme } from '../../SComponent';
import SScrollView from '../SScrollView';
import { SView } from '../SView';
import SHeader from './SHeader';
type typeHeader = {
    label: String,
    key: String,
    width: Number
}
type SType = {
    header: [typeHeader],
    data: [Object],
}

export default class STable extends Component<SType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <SScrollView ref={(ref) => { this.scroll = ref; }}>
                <SView style={{
                }}>
                    <SHeader {...this.props} getScroll={() => {
                        return this.scroll;
                    }} />
                </SView>
            </SScrollView>
        );
    }
}
