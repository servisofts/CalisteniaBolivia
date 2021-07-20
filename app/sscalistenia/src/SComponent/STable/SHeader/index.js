import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SText } from '../../SText';
import { SView } from '../../SView';
import SHeaderItem from './SHeaderItem';

export default class SHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.headers = [];
    }
    getHeaders() {
        if (!this.props.header) {
            return <View />
        }
        return this.props.header.map((obj, key) => {
            return (<SHeaderItem
                ref={(ref) => { this.headers[key] = ref }}
                obj={obj}
                getScroll={() => { return this.props.getScroll() }}
                layoutParent={() => { return this.layout }}
                onMove={(gs) => {
                    this.headers.map((brother, bkey) => {
                        if (key == bkey) {
                            return;
                        }
                        brother.onMoveBrother(this.headers[key], gs);
                    })
                }}
                changeSize={(size) => {
                    this.layout.width += size;
                    this.setState({ layout: this.layout })
                }}
            />)
        })
    }
    render() {
        return (
            <SView props={{
                direction: "row",
                style: {
                    height: 40,
                    width: !this.state.layout ? "100%" : this.state.layout.width,
                }
            }} onLayout={(evt) => {
                this.layout = evt.nativeEvent.layout
                this.setState({ layout: this.layout })
            }}>
                {this.getHeaders()}
            </SView>
        );
    }
}
