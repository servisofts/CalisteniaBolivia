import React, { Component } from 'react';
import { SHr, SIcon, SNavigation, STheme, SView } from 'servisofts-component';

export default class BottomBar extends Component {

    constructor(props) {
        super(props);
    }

    getOption = (obj) => {
        return <SView col={"xs-3"} onPress={() => {
            SNavigation.navigate(obj.href)
        }} row center>
            <SView width={8} />
            <SView width={24} height={24}>
                {obj.icon}

            </SView>
            <SView width={8} />
        </SView>
    }
    render() {
        return <SView col={"xs-12"} height={60} backgroundColor={STheme.color.primary} center>
            <SHr height={1} color={STheme.color.card} />
            <SView col={"xs-11"} row flex center>
                {this.getOption({ key: "home", icon: <SIcon name={"Home"} fill={STheme.color.primary} stroke={STheme.color.secondary} />, href: "client" })}
                {this.getOption({ key: "search", icon: <SIcon name={"Search2"} fill={STheme.color.primary} stroke={STheme.color.secondary} />, href: "client/search" })}
                {this.getOption({ key: "bag", icon: <SIcon name={"Bag"} fill={STheme.color.secondary} />, href: "" })}
                {this.getOption({ key: "profile", icon: <SIcon name={"Profile"} fill={STheme.color.primary} stroke={STheme.color.secondary} />, href: "AjustesPage" })}
            </SView>

        </SView>
    }
}