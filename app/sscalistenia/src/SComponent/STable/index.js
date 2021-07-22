import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, Dimensions, Animated } from 'react-native';
import { SButtom, SText, STheme, SThread } from '../../SComponent';
import SScrollView from '../SScrollView';
import { SView } from '../SView';
import SHeader from './SHeader';
import SData from './SData'
type typeHeader = {
    label: String,
    key: String,
    width: Number,
    index: Number,
}
type SType = {
    header: [typeHeader],
    data: [Object],
}

export default class STable extends Component<SType> {
    constructor(props) {
        super(props);
        var lista = this.props.header.sort(function (a, b) {
            if (a.index > b.index) {
                return 1;
            }
            if (a.index < b.index) {
                return -1;
            }
            return 0;
        });
        this.state = {
            header: lista,
            animates: {
            }
        };
        this.contentSize = new Animated.ValueXY({ x: 0, y: 0 })
        this.headerPosition = new Animated.ValueXY({ x: 0, y: 0 })
    }

    render() {
        return (
            <View style={{
                width:"100%",
                flex:1,
            }}>

                <SScrollView
                    style={{ 
                        width:"100%",
                        flex:1,
                    }}
                    ref={(ref) => { this.scroll = ref; }}
                    onScroll={(evt) => {
                        if (evt.horizontal) {
                            // var pos = evt.horizontal.contentSize.width - (evt.horizontal.contentOffset.x + evt.horizontal.layoutMeasurement.width);
                            // if (pos < 200) {
                            // this.scroll.moveScrollHorizontal({ x: evt.horizontal.contentSize.width - evt.horizontal.layoutMeasurement.width - 200, y: 0 })
                            // }
                        }
                        // if (evt.vertical) {
                        //     var off = evt.vertical.contentOffset.y
                        //     this.headerPosition.setValue({ x: 0, y: off })
                        // }
                    }}
                    header={
                        <SView style={{
                            height: 40,
                            width: "100%",
                           
                        }}>
                            <SHeader header={this.state.header} contentSize={this.contentSize}
                                getScroll={() => { return this.scroll }}
                                loadAnimated={(animates, reset) => {
                                    this.state.animates = animates;
                                    if (!animates["widthHeaderAnim"] || reset) {
                                        this.setState({ animates: this.state.animates })
                                    }
                                }}
                            />
                        </SView>
                    }
                >
                    <SView props={{
                        animated: true
                    }} style={{
                        width: this.contentSize.x,
                        height:"100%",
                        flex:1,
                    }}>
                        <SData
                            ref={(ref) => { this.refData = ref }}
                            data={this.props.data}
                            header={this.state.header}
                            animates={this.state.animates} />


                    </SView>
                </SScrollView>
            </View>
        );
    }
}
