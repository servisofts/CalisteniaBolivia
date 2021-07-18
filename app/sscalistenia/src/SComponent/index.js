import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SThemeChange, SThemeClass, STheme } from './STheme';
import { SContainer } from './SContainer';
import { SText } from './SText';
import { SButtom } from './SButtom';
import { SAnimated } from './SAnimated';
import SPopup, { SPopupOpen, SPopupClose } from './SPopup';
import SSize from './SSize';

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
        return (<SContainer style={{
            width: "100%",
            flex: 1,
        }}>
            <SSize repaint={() => this.repaint()} >
                {this.getChildrens()}
            </SSize>
            <SThemeClass repaint={() => this.repaint()} />
            <SPopup />
        </SContainer>
        );
    }
}