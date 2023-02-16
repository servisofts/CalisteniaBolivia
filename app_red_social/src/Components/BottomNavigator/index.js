import React, { Component } from 'react';

import { SView, SText, STheme, SGradient, SIcon, SNavigation,SHr } from 'servisofts-component'
import Model from '../../Model';

export default class index extends Component {
	
    constructor(props) {
        super(props);
    }

    getOption = (obj) => {
        return <SView col={"xs-2.4"} onPress={() => {
            SNavigation.navigate(obj.href)
        }} row center height >
            <SView width={8} height />
            <SView width={24} height={24}>
                {obj.icon}
            </SView>
            <SView width={8} height />
        </SView>
    }
    getOption2 = (obj) => {
        return <SView col={"xs-2.4"} onPress={() => {
            SNavigation.navigate(obj.href)
        }} row center height >
            <SView width={8} height />
            <SView width={55} height={55}>
                {obj.icon}
            </SView>
            <SView width={8} height />
        </SView>
    }
    render() {
        return <SView col={"xs-12"} height={60} backgroundColor={STheme.color.primary} center>
            <SHr height={1} color={STheme.color.card} />
            <SView col={"xs-11"} row flex center >
                {this.getOption({ key: "home", icon: <SIcon name={"Home"} fill={STheme.color.primary} stroke={STheme.color.text} />, href: "/root" })}
                {this.getOption({ key: "search", icon: <SIcon name={"Search2"} fill={STheme.color.primary} stroke={STheme.color.text} />, href: "/root" })}
                {this.getOption2({ key: "logo", icon: <SIcon name={"LogoBarra"} fill={STheme.color.darkGray}  style={{position: "absolute", top: -20}}/>, href: "/root" })}

                {this.getOption({ key: "bag", icon: <SIcon name={"Bag"} fill={STheme.color.primary} stroke={STheme.color.text}  />, href: "/paquete" })}
                {this.getOption({ key: "profile", icon: <SIcon name={"Profile"} fill={STheme.color.primary} stroke={STheme.color.text} />, href: "/login" })}
            </SView>

        </SView>
    }
}
