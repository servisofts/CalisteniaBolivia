import React, { Component } from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity, ViewProps, Animated } from 'react-native';
import { STheme } from '../../SComponent';
import { Variant, TypeVariant } from './variants';
import { Type, TypeType } from './types';
import { Col, TypeCol } from './cols';
import { CustomStyles, TypeStyles } from './styles';
import SSize from '../SSize';
import { SText } from '../SText';

type typeConfig = {
    style: ViewStyle,
    customStyle: TypeStyles,
    type: TypeType,
    variant: TypeVariant,
    col: TypeCol,
    direction: "row" | "column",
    height: any,
    animated: Boolean,

}

type typeProps = {
    style: ViewStyle,
    props: typeConfig,
    onPress: Function,
    // ViewPropTypes,
    // TouchableOpacityProps,
    //callBack:Function,
}
interface IProps extends ViewProps {
    animated: Boolean,
    style: ViewStyle,
    props: typeConfig,
    onPress: Function,
}

export class SView extends Component<IProps> {
    constructor(props) {
        super(props);
        this.state = {
        };

    }
    getOption(option) {
        return !this.props.props[option] ? 'default' : this.props.props[option]
    }
    buildStyle() {
        this.style = {
            ...this.props.style,
            ...(this.props.props.style ? this.props.props.style : {}),
            ...(this.props.props.height ? { height: this.props.props.height } : {}),
        }
    }
    render() {
        this.buildStyle();
        this.variant = Variant(this.getOption("variant"));
        this.customStyle = CustomStyles(this.getOption("customStyle"))
        var size = SSize.getSize(this.getOption("col"))
        var Component = View;
        if (this.props.animated || this.props.props.animated) {
            Component = Animated.View
        }
        if (this.props.onPress) {
            Component = TouchableOpacity;
            if (this.props.animated) {
                Component = Animated.createAnimatedComponent(Component);
            }
        }
        var childrens = this.props.children;
        if (typeof childrens == "string") {
            childrens = <SText options={{
                type: this.getOption("customStyle") == "secondary" ? "primary" : "default"
            }}>{this.props.children}</SText>
        }
        return (
            <Component
                {...this.props}
                onLayout={(evt) => {
                    this.layout = evt.nativeEvent.layout
                    if (this.props.onLayout) this.props.onLayout(evt);
                }}
                onPress={() => {
                    if (this.props.onPress) this.props.onPress({
                        layout: this.layout
                    });
                }}
                style={[
                    this.variant.View,
                    this.customStyle.View,
                    {
                        ...size,
                        ...this.style,
                        ...(this.getOption("direction") == "row" ? { flexDirection: "row", flexWrap: "wrap", alignContent: "flex-start", } : {}),

                    }
                ]} >
                {childrens}
            </Component >
        );
    }
}

SView.defaultProps = {
    props: {},
    style: {}
};