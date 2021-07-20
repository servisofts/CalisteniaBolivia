import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
// import Svg from '../../Svg';

var INSTANCE = false;


export const SPopupOpen = ({ key, content, style }) => {
    INSTANCE.open({ key, content, style });
}
export const SPopupClose = (key) => {
    INSTANCE.close(key);
}
export default class SPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {

            },
            style: {}
        };
        INSTANCE = this;
    }
    componentDidMount() {
        INSTANCE = this;
    }
    open({ key, content, style }) {
        // console.log(key);
        this.state.data[key] = content;
        if (style) {
            this.state.style[key] = style;
        } else {
            this.state.style[key] = {};
        }
        this.setState({ ...this.state });
    }
    close(key) {
        delete this.state.data[key];
        this.setState({ ...this.state });
    }
    getPopups() {
        return Object.keys(this.state.data).map((key) => {
            var obj = this.state.data[key];
            var style = this.state.style[key];
            return (
                <TouchableWithoutFeedback onPress={() => {
                    this.close(key);
                }}><View style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    backgroundColor: "#000000f0",
                    justifyContent: "center",
                    alignItems: "center",
                    ...style
                }}>
                        <TouchableWithoutFeedback onPress={() => {
                            // console.log("touch2")
                        }}>
                            <View style={{
                                width: "90%",
                                maxWidth: 600,
                                // backgroundColor: "#fff",
                                borderRadius: 8,
                                // padding: 8,
                                minHeight: 200,
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                {obj}
                                <TouchableOpacity style={{
                                    width: 30,
                                    height: 30,
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }} onPress={() => {
                                    this.close(key);
                                }}>
                                    {/* <Svg resource={require("../img/cerrar.svg")} style={{
                                        width: 15,
                                        height: 15,
                                        color: "#000",
                                        //top: -10
                                    }} /> */}


                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            )
        })
    }
    render() {
        INSTANCE = this;
        return (
            <>
                {this.getPopups()}
            </>
        );
    }
}
