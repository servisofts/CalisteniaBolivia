import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from "react-native";
const ActionButtom = (props) => {
    return (
        <TouchableOpacity onPress={() => {
            props.onPress();
        }}
            style={{
                width: "35%",
                maxWidth:100,
                height: 40,
                margin: 8,
                borderWidth: 1,
                borderColor: "#ffffff11",
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:"#66000022",
                ...props.style,
            }}>
            <Text style={{
                color: "#999",
                ...props.styleText
            }}>{props.label}</Text>
        </TouchableOpacity >
    )
}
export default ActionButtom;