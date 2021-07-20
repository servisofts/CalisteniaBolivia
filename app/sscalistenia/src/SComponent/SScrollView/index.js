import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, Dimensions, Animated } from 'react-native';
import { SButtom, SText, STheme } from '../../SComponent';
import { SView } from '../SView';
type typeHeader = {
    label: String,
    key: String,
    width: Number
}
type SType = {
    header: [typeHeader],
    data: [Object],
    disableHorizontal: Boolean
}

export default class SScrollView extends Component<SType> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getScrollCalc = (data) => {

        return {
            width: data.contentSize.width,
            height: data.contentSize.height,
            maxScroll: {
                x: (data.contentSize.width - data.layoutMeasurement.width),
                y: (data.contentSize.height - data.layoutMeasurement.height),
            },
            scrollPos: {
                x: data.contentOffset.x,
                y: data.contentOffset.y,
            },

        }
    }
    scrollInfo = () => {
        var info = []

        if (this.state.scroll_h) {
            info.push({
                key: "this.state.scroll_h",
                data: this.getScrollCalc(this.state.scroll_h)

            })
        }
        if (this.state.scroll_v) {
            info.push({
                name: "Scroll Vertical",
                key: "this.state.scroll_v",
                data: this.getScrollCalc(this.state.scroll_v)
            })
        }
        return <View style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 200,
            backgroundColor: STheme().colorSecondary + "88",
            borderRadius: 8,
            padding: 4,
        }}>
            {info.map((data) => {
                return <SText options={{
                    type: "primary",
                }}>{JSON.stringify(data, false, "\t").replace(/[\{|\}|,|"]/g, "")}</SText>
            })}
            <SButtom options={{
                type: "outline"
            }}
                onPress={() => {
                    this.scrollh.scrollTo({ x: 1, y: 1 })
                    this.scrollv.scrollTo({ x: 1, y: 1 })
                }}
            >TO END</SButtom>
        </View>
    }
    getLayout() {
        if (this.layout) {
            return this.layout
        }
    }
    setEnabled(en) {
        if (this.scrollv) {
            this.scrollv.setNativeProps({ scrollEnabled: en })
        }
        if (this.scrollh) {
            this.scrollh.setNativeProps({ scrollEnabled: en })
        }
    }
    scrollIncrement({ x, y }) {
        if (!this.layout) {
            return;
        }
        var { width, height } = this.layout;
        if (this.scroll_v) {
            this.scrollv.scrollTo({ x: this.scroll_v.contentOffset.x + x, y: this.scroll_v.contentOffset.y + y }, true);
        } else {
            this.scrollv.scrollTo({ x: 1, y: 1 }, true);
        }
        if (this.scroll_h) {
            this.scrollh.scrollTo({ x: this.scroll_h.contentOffset.x + x, y: this.scroll_h.contentOffset.y + y }, true);
        } else {
            this.scrollh.scrollTo({ x: 1, y: 1 }, true);
        }
    }
    scrollTo({ x, y }) {
        if (!this.layout) {
            return;
        }
        var { width, height } = this.layout;
        if (this.scrollv) {
            this.scrollv.scrollTo({ x: x - width / 2, y: y - height / 2 }, true);
        }
        if (this.scrollh) {
            this.scrollh.scrollTo({ x: 1, y: 1 }, true);
        }
    }
    // scrollToPosition({ x, y }) {
    //     if (this.scrollv) {
    //         this.scrollv.scrollTo({ x, y });
    //     }
    //     if (this.scrollh) {
    //         this.scrollh.scrollTo({ x, y });
    //     }
    // }
    getScroll() {
        if (!this.layout) {
            return <View />
        }
        return <ScrollView
            ref={(ref) => { this.scrollh = ref }}
            horizontal={true}
            style={{
                width: this.layout.width,
                // width: "100%",

            }}
            // nestedScrollEnabled={true}
            disableScrollViewPanResponder={true}
            onLayout={(evt) => {
                // this.setState({ scrollh: evt.nativeEvent.layout })
            }}
            onScroll={(evt) => {
                this.scroll_h = evt.nativeEvent;
                // this.setState({ scroll_h: })
            }}
            contentContainerStyle={{
                ...(this.props.disableHorizontal ? { width: "100%" } : {})
            }}
        >
            <ScrollView
                nestedScrollEnabled={true}
                ref={(ref) => { this.scrollv = ref }}
                style={{
                    width: "100%",
                }}
                disableScrollViewPanResponder={true}
                onLayout={(evt) => {
                    // this.setState({ scrollv: evt.nativeEvent.layout })
                }}
                onScroll={(evt) => {
                    this.scroll_v = evt.nativeEvent;
                    // this.setState({ scroll_v: evt.nativeEvent })
                }}
            >
                <View style={{
                    width: "100%",
                    height: "100%",
                }}>
                    {this.props.children}
                </View>
            </ScrollView>
        </ScrollView>
    }
    render() {
        return (
            <SView style={{
                width: "100%",
                flex: 1,
            }}>
                <SView style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",

                }} onLayout={(evt) => {
                    this.layout = evt.nativeEvent.layout
                    if (!this.state.load) {
                        this.setState({ load: true })
                    }
                }} >
                    {this.getScroll()}
                </SView >
            </SView>
        );
    }
}
