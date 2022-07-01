import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { STheme } from 'servisofts-component';
import StrokeAnimated from './StrokeAnimated';

const layer = {
    width: 559,
    height: 207,
}
const color_paralela = "#c31c37";
const paths_paralela = [
    "M26.7,203.2c-2.4-11.5-4.8-23.2-7-35.2-3-16.2-5.7-32-8.1-47.5A6.5,6.5,0,0,1,8,126.2a6,6,0,0,1-4.8,0A6.5,6.5,0,0,1,1,124.4c-2.2-3.1-.3-8.7,1.1-13.2s2.1-9.5,3.7-14.1C8.5,89.6,15.4,64.5,31,2.7A3.5,3.5,0,0,1,32.3.5a3.5,3.5,0,0,1,3.8.2,3.5,3.5,0,0,1,1.4,1.8V59.2a4.2,4.2,0,0,1-3.6,2.2,4,4,0,0,1-3.6-2.7l-.4-14.6-2.1,6.6A348.1,348.1,0,0,0,18,90.8c2.1,12.4,4.1,24.8,6.1,37.4q6,37.2,11.2,73.6a4.6,4.6,0,0,1-2.9,4.8A4.7,4.7,0,0,1,26.7,203.2Z",
    "M65.7,203.7c2.4-11.5,4.8-23.2,7-35.1,3-16.3,5.7-32.1,8.1-47.5a6.3,6.3,0,0,0,3.6,5.6,6,6,0,0,0,4.8,0,6.5,6.5,0,0,0,2.2-1.8c2.2-3,.3-8.7-1.1-13.2s-2.1-9.5-3.7-14.1C83.9,90.1,77,65.1,61.4,3.2a3.6,3.6,0,0,0-1.3-2.1,3.3,3.3,0,0,0-3.8.1A4,4,0,0,0,54.9,3V59.7a3.8,3.8,0,0,0,3.6,2.2,3.9,3.9,0,0,0,3.6-2.7l.4-14.6,2.1,6.7a351.8,351.8,0,0,1,9.8,40c-2.1,12.4-4.1,24.8-6.1,37.4q-6,37.2-11.2,73.7a4.5,4.5,0,0,0,2.9,4.7A4.6,4.6,0,0,0,65.7,203.7Z"
];

const paths_nombre = [
    "M152,61.4,143.1,76H118.5c-1.9,10.3-3.7,20.5-5.5,30.8h31.1L135,121.1c-10.8,0-19.6,0-27.5.2-2.6.1-6.4.1-8.9-2.4s-2.8-6.1-1.8-12.1c2.6-16.4,2.5-16.3,5.3-33.1.6-3.4,1.2-7.4,4.4-9.9s6.5-2.4,8.1-2.4C122.9,61.4,135.8,61.3,152,61.4Z",
    "M170.2,62.4h19.1l10.2,58.7H161.8l7.2-14.3h7.8c0-7-.1-14.1-.2-21.1-2.2,4.8-4.5,9.7-6.9,14.6-3.6,7.3-7.2,14.2-10.8,20.8h-19Z",
    "M209.7,61.4h17.5c-2.8,15.1-5.7,30.3-8.5,45.4h22.5l5.1,14.3H201.5C204.2,101.2,207,81.3,209.7,61.4Z",
    "M258.3,61.4H274l-9.6,59.7H248.6C251.8,101.2,255.1,81.3,258.3,61.4Z",
    "M266.7,121.1c.7-4.8,1.5-9.5,2.2-14.3h26.8a18.2,18.2,0,0,0,.7-2.5,23.3,23.3,0,0,0,.5-6.1H278.6a7.2,7.2,0,0,1-4.2-1.3,7.6,7.6,0,0,1-2.5-7.8c1-6.6,2.1-13.2,3.2-19.8A9.7,9.7,0,0,1,278,64a10,10,0,0,1,5.4-2.6H319L312.4,76h-23l-.7,9.2,19.4.2a4.7,4.7,0,0,1,3.3,1.4,5.4,5.4,0,0,1,1.4,4.6L311,111.1c0,.6,0,5.5-3.8,8.3a9.1,9.1,0,0,1-4.4,1.7Z",
    "M333.3,76H318.8l2.1-14.6h43.7c-1.1,4.9-2.1,9.7-3.2,14.6H347.9c-2.7,15-5.4,30.1-8,45.1H325.5Z",
    "M368.1,61.4h37.7c-.8,4.9-1.6,9.7-2.3,14.6H379.8l-1.3,8.3,23.8-.2c-.9,4.5-1.7,8.9-2.5,13.4H376.1c-.5,3.1-1,6.3-1.6,9.4H398c-.7,4.8-1.4,9.5-2.2,14.3H357.1Q362.7,91.3,368.1,61.4Z",
    "M445.3,121.1H429.4L437.5,76a42.8,42.8,0,0,0-6.5-.4,49.5,49.5,0,0,0-5.8.4c-2.6,15-5.3,30.1-7.9,45.1H401.5q5.4-29.8,10.7-59.7h30.9c4.6-.2,8.6,1.8,10.2,5.1a9.3,9.3,0,0,1,.7,4.9Z",
    "M460.2,61.4h15.7L466,121.1H450.2Q455.3,91.3,460.2,61.4Z",
    "M497.7,62.4h19.1c3.4,19.6,6.9,39.1,10.3,58.7H489.3l7.2-14.3h7.9l-.3-21.1c-2.1,4.8-4.4,9.7-6.8,14.6-3.6,7.3-7.2,14.2-10.9,20.8H467.5C477.6,101.5,487.7,82,497.7,62.4Z",
    "M236.1,127.1h15.6l-9.6,59.7H226.3C229.6,166.9,232.8,147,236.1,127.1Z",
    "M313.8,127.1h15.6l-9.6,59.7H304C307.3,166.9,310.5,147,313.8,127.1Z",
    "M350.6,128.2h19.1l10.2,58.7H342.2l7.2-14.3h7.8c0-7.1-.1-14.1-.2-21.1-2.2,4.7-4.4,9.6-6.9,14.6q-5.4,11-10.8,20.7h-19Z",
    "M187.3,127.7h17.5c-2.9,15.1-5.7,30.2-8.5,45.4h22.5l5.1,14.3H179.1Q183.2,157.6,187.3,127.7Z",
    "M282.2,186.9H263.1c-3.2-20-6.3-39.9-9.5-59.9h16.7c1.8,12.2,3.7,24.4,5.5,36.6,2.2-4.8,4.4-9.7,6.8-14.6,3.7-7.6,7.5-15,11.2-22h18.5Z",
    "M138.3,127.6c-2.9,20-5.7,39.9-8.6,59.8h45.1l7.2-59.8Zm21.1,44.6L149,172c1.3-11,2.7-22,4.1-33.1h10C161.8,150,160.6,161.1,159.4,172.2Z",
    "M124.5,156.3c8.4-8.5,11.1-18.7,7.4-24.8a12.2,12.2,0,0,0-5.1-4.5H90.9c-3,20-5.9,39.9-8.8,59.9h36.8c8.7-9.1,12.4-19.5,8.9-26.5A11.6,11.6,0,0,0,124.5,156.3Zm-10.4,10a19.6,19.6,0,0,1-1.5,4.2,17.1,17.1,0,0,1-2.8,3.9H98.5a68.7,68.7,0,0,1,.5-8.8c.2-1.9.5-3.7.8-5.4l11.6.2a6.6,6.6,0,0,1,1.8,2.1A7.3,7.3,0,0,1,114.1,166.3Zm3-18.8a33.1,33.1,0,0,1-1.8,2.9,29.6,29.6,0,0,1-2.1,2.6l-5.5.2a37,37,0,0,1-6-.4,45.4,45.4,0,0,1,.1-6.3,50,50,0,0,1,1.2-7.7l11.1.2a9.4,9.4,0,0,1,1.8,1.7,9.6,9.6,0,0,1,1.3,2,5.8,5.8,0,0,1,.3,2.1A9.1,9.1,0,0,1,117.1,147.5Z",
]

const color_swo = "#9b9c9d";
const paths_swo = [
    "M447.2,159.1c.4-1.9.7-3.9,1-5.8H459a3,3,0,0,0,.2-1,7.4,7.4,0,0,0,.2-2.5h-7.3a2.6,2.6,0,0,1-1.7-.5,3.3,3.3,0,0,1-1.1-3.2c.5-2.6.9-5.3,1.3-8a4.2,4.2,0,0,1,1.2-2.1A3.6,3.6,0,0,1,454,135h14.4l-2.7,5.9h-9.3l-.3,3.7H464a1.8,1.8,0,0,1,1.3.5,2.7,2.7,0,0,1,.6,1.9c-.3,2.6-.5,5.3-.8,8a4.2,4.2,0,0,1-1.5,3.3,4.6,4.6,0,0,1-1.8.7Z",
    "M473.2,140.9h-5.9l.9-5.9h17.6c-.4,2-.8,3.9-1.3,5.9h-5.4l-3.3,18.2h-5.7C471.1,153,472.2,147,473.2,140.9Z",
    "M506.7,135h15.2l-.9,5.9h-9.6l-.5,3.4h9.6c-.4,1.8-.7,3.6-1,5.4h-9.6l-.6,3.8h9.5l-.9,5.7H502.3Z",
    "M524.4,135h15.2l-.9,5.9h-9.6l-.5,3.4h9.6c-.4,1.8-.7,3.6-1,5.4h-9.6l-.6,3.8h9.5l-.9,5.7H520Z",
    "M546.7,140.9h-5.8c.3-2,.6-3.9.8-5.9h17.7c-.5,2-.9,3.9-1.3,5.9h-5.5c-1,6.1-2.1,12.1-3.2,18.2h-5.8C544.6,153,545.7,147,546.7,140.9Z",
    "M494.6,162.3c-1.2,8.1-2.3,16.1-3.5,24.1h18.2c.9-8,1.9-16,2.8-24.1Zm8.4,18h-4.1c.5-4.4,1.1-8.9,1.6-13.3h4Z",
    "M426.3,162.3c-1.1,8.1-2.3,16.1-3.4,24.1H441c1-8,1.9-16,2.9-24.1Zm8.5,18h-4.2c.6-4.4,1.1-8.9,1.7-13.3h4Z",
    "M482.8,159l4.2-24h12a6.3,6.3,0,0,1,3.5,1.4c1.6,1.6,1.4,3.9,1.3,5.9a7.9,7.9,0,0,1-1.5,4.7,6.6,6.6,0,0,1-3,1.8c.6,3.4,1.1,6.8,1.7,10.2h-7.1l-.9-4.5c-.5-2.9-.8-5.7-1-8.2h2.5a3,3,0,0,0,2.1-.7,3.2,3.2,0,0,0-.2-4.3,3.4,3.4,0,0,0-4.6.1c-1,5.8-1.9,11.7-2.9,17.5Z",
    "M443.9,186.4l4.2-24h12a5.4,5.4,0,0,1,3.5,1.3c1.6,1.6,1.4,3.9,1.3,5.9a7.9,7.9,0,0,1-1.5,4.7,6.1,6.1,0,0,1-3,1.9c.6,3.4,1.1,6.8,1.7,10.2H455l-.9-4.6c-.5-2.9-.8-5.6-1-8.2h2.4a2.8,2.8,0,0,0,2.2-.7,3.1,3.1,0,0,0-.2-4.2,3.3,3.3,0,0,0-4.6,0c-1,5.9-1.9,11.7-2.9,17.6Z",
    "M512.1,186.4c.9-8,1.7-16,2.6-24.1h8.1c-.6,5.9-1.3,11.8-1.9,17.7h5c.6-5.9,1.1-11.8,1.7-17.7H535c-1,8.1-1.9,16.1-2.9,24.1Z",
    "M384.8,186.4h35.3c.9-8,1.9-16,2.9-24.1h-8.8l-1.4,18h-5.1l1.8-18h-8.4c-.5,6-.9,12-1.4,18H395l1-18h-8.3c-1,8-1.9,16-2.9,24.1",
    "M465.8,186.4c1-8,2-16,3.1-24.1H477l-.9,6.2c1.5-2,2.9-4.1,4.4-6.2h8.6L478.4,176l9.1,10.4H478c-1.4-2.1-2.8-4.1-4.1-6.2l-1.2,6.2Z",
    "M537,166.9c-.1-1.5-.1-3-.1-4.6h18.4c-.4,1.6-.9,3.1-1.3,4.7h-4.9l-1.1,33-5-4.1V166.9Z",
]


export default class LogoAnimado extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                minHeight: "100%",
            }}>
                <Svg width={"100%"} height={"100%"} viewBox={"0 0 559.4 207.3"}>
                    {paths_paralela.map((d, key) => (<Path d={d} stroke="black" strokeWidth={1} fill={color_paralela} key={key} />))}
                    {paths_nombre.map((d, key) => (<StrokeAnimated key={key} d={d} stroke={"#600"}
                        strokeWidth={2}
                        fill={(this.props.fill ? this.props.fill : STheme.color.text)}
                        duration={(this.props.duration ? this.props.duration : 2500)}
                    />))}
                    {paths_swo.map((d, key) => (<Path d={d} stroke="black" strokeWidth={1} fill={color_swo} key={key} />))}
                </Svg>
            </View>
        );
    }
}
