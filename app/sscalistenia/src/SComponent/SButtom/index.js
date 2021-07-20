import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SThemeChange, STheme } from '../../SComponent';


type typeConfig = {
    type: "default" | "outline" | "secondary",
    variant: "default",
}

type typeProps = {
    style: TouchableOpacity.Style,
    styleText: Text.Style,
    options: typeConfig,
    onPress: Function,
    //callBack:Function,
}


export class SButtom extends Component<typeProps> {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    getOption(option) {
        return !this.props.options[option] ? "default" : this.props.options[option]
    }
    //---RENDER
    getTypes() {
        return {
            default: StyleSheet.create({
                touchable: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...this.props.style,
                },
                text: {
                    color: STheme().colorSecondary,
                    ...this.props.styleText,
                }
            }),
            secondary: StyleSheet.create({
                touchable: {
                    borderRadius: 4,
                    backgroundColor: STheme().colorSecondary,
                    borderWidth: 1,
                    borderColor: STheme().colorSecondary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...this.props.style,
                },
                text: {
                    color: STheme().colorPrimary,
                    ...this.props.styleText,

                }
            }),
            outline: StyleSheet.create({
                touchable: {
                    borderRadius: 4,
                    backgroundColor: STheme().colorPrimary,
                    borderWidth: 1,
                    borderColor: STheme().colorSecondary,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                text: {
                    color: STheme().colorSecondary,
                    ...this.props.styleText
                }
            }),
        }
    }
    getVariant(theme) {
        return {
            "default": StyleSheet.create({
                touchable: {
                    width: 100,
                    height: 40,
                },
                text: {
                    fontSize: 12,
                }
            }),
        }
    }
    //---RENDER
    render() {
        // var theme = SThemeStyle();
        this.styleType = this.getTypes()
        this.variant = this.getVariant()
        //---RETURN
        var variant = this.variant[this.getOption("variant")]
        var style = this.styleType[this.getOption("type")]
        return (
            <TouchableOpacity style={[variant.touchable, style.touchable]}
                onPress={() => {
                    if (this.props.onPress) this.props.onPress();
                }}>
                <Text style={[variant.text, style.text]}> {this.props.children}</Text>
            </TouchableOpacity >
        );
    }
}

SButtom.defaultProps = {
    options: {

    },
    style: {
        // width: 100,
        // height: 40,
    }
};
