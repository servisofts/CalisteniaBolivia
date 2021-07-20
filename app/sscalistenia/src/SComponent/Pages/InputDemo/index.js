
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SText, SContainer } from '../../../SComponent';
import { SButtom } from '../../SButtom';
import SIFechaPicker from '../../SInput/SIFechaPicker';
import { SPopupOpen } from '../../SPopup';
import { SView } from '../../SView';

export default class InputDemo extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SContainer >
                <SContainer options={{
                    type: "primary",
                    variant: "row",
                    // col: { xs: 11 },
                }} style={{
                    height: 40,
                }}>
                    <SContainer options={{
                        type: "center",
                        variant: "col",
                        col: { xs: 2 }
                    }}>
                        <SButtom onPress={() => { this.props.navigation.goBack() }}>Back</SButtom>
                    </SContainer>
                    <SContainer options={{
                        type: "center",
                        variant: "col",
                        col: { xs: 8 }
                    }}>
                        <SText options={{
                            variant: "h5",
                        }}>SInput</SText>
                    </SContainer>
                    <SContainer options={{
                        type: "center",
                        variant: "col",
                        col: { xs: 2 }
                    }}>

                    </SContainer>
                </SContainer>

                <SContainer options={{
                    type: "secondary",
                    variant: "page",
                }}>
                    <SContainer options={{
                        type: "secondary",
                        variant: "row",
                        col: { xs: 11.5 }
                    }} style={{
                    }}>
                        <SIFechaPicker></SIFechaPicker>
                    </SContainer>
                </SContainer>
            </SContainer>
        );
    }
}
