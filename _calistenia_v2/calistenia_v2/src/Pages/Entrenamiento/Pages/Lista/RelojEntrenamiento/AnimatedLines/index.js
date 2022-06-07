import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, Easing } from 'react-native';

export default class AnimatedLines extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: new Animated.Value(0),
            sizeBar: 60,

        };
    }
    componentDidMount() {
        Animated.loop(
            Animated.timing(this.state.anim,{
                toValue:1,
                delay:1000,
                easing:Easing.cubic,
                duration:3000,
            }),
            { iterations: 1000 },
        ).start();
    }
    render() {
        if (!this.props.layout) {
            return <View />
        }
        if(this.props.stop){
            this.state.anim.stopAnimation();
            this.state.anim.setValue(0);
        }
        return (
            <>
                <View style={{
                    width: "100%",
                    height: 2,
                    alignItems: "flex-end",
                    overflow: "hidden"
                }}>
                    <Animated.View style={{
                        width: this.state.sizeBar,
                        height: "100%",

                        backgroundColor: "#600",
                        transform: [
                            {
                                translateX: this.state.anim.interpolate({
                                    inputRange: [0, 0.6, 1],
                                    outputRange: [this.state.sizeBar, this.state.sizeBar, (this.props.layout.width * -1)]
                                })
                            }
                        ]
                    }}>

                    </Animated.View>
                </View>

                <View style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    {this.props.children}
                </View>
                <View style={{
                    width: "100%",
                    height: 2,
                    overflow: "hidden"
                }}>
                    <Animated.View style={{
                        width: this.state.sizeBar,
                        // left: this.state.sizeBar * -1,
                        height: "100%",
                        backgroundColor: "#060",
                        transform: [
                            {
                                translateX: this.state.anim.interpolate({
                                    inputRange: [0, 0.4, 1],
                                    outputRange: [-this.state.sizeBar, this.props.layout.width, this.props.layout.width]
                                })
                            }
                        ]
                    }}>

                    </Animated.View>

                </View>
            </>
        );
    }
}
