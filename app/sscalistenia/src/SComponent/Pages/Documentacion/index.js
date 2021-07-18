import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SContainer, SText } from '../../../SComponent';

export default class Documentacion extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getInfo({ title }) {
        return <SContainer options={{
            type: "center",
            variant: "col-square",
            col: { xs: 6, sm: 4, md: 3 }
        }} >
            <SContainer options={{
                type: "center",
                variant: "col-square",
                col: {
                    xs: 11
                }
            }}>
                <SText options={{
                    variant: "h3"
                }}>{title}</SText>
            </SContainer>
        </SContainer>
    }
    render() {
        return (
            <SContainer options={{
                type: "primary",
                variant: "page",
            }}>
                <SContainer options={{
                    type: "center",
                    variant: "row",
                    col: { xs: 12 }
                }}>
                    <SContainer options={{
                        variant: "col",
                        col: { xs: 12 }
                    }} style={{
                        alignItems: "center"
                    }}>
                        <SText options={{
                            variant: "h3"
                        }}>SComponent</SText>
                        <SText options={{
                            variant: "h5"
                        }}>Documentacion</SText>
                    </SContainer>
                    {this.getInfo({ title: "Que es SComponent?" })}
                    {this.getInfo({ title: "Elementos" })}
                    {this.getInfo({ title: "Examples" })}
                </SContainer>

            </SContainer>
        );
    }
}
