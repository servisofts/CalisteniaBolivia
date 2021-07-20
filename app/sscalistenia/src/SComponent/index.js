import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SThemeChange, SThemeClass, STheme } from './STheme';
import { SContainer } from './SContainer';
import { SText } from './SText';
import { SButtom } from './SButtom';
import { SAnimated } from './SAnimated';
import SPopup, { SPopupOpen, SPopupClose } from './SPopup';
import SSize from './SSize';
import { SView } from './SView';

export {
    STheme,
    SText,
    SButtom,
    SContainer,
    SThemeChange,
    SPopupOpen,
    SPopupClose,
    SSize,
    SAnimated,
}
export class SComponentClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    repaint = () => {
        this.setState({ repaint: true })
    }
    getChildrens = () => {
        if (this.state.repaint) {
            this.setState({ repaint: false })
            return <View />
        }
        return this.props.children;
    }
    render() {
        return (<SView
            style={{
                width: "100%",
                height:"100%",
                flex: 1,
                overflow: "hidden",
            }}>
            <SSize repaint={() => this.repaint()} >
                {this.getChildrens()}
            </SSize>
            <SThemeClass repaint={() => this.repaint()} />
            <SPopup />
        </SView>
        );
    }
}