import React, { Component } from 'react';
import { SHr, SIcon, SNavigation, STheme, SView } from 'servisofts-component';

export default class TopBar extends Component {

    constructor(props) {
        super(props);
    }

    getOptions = () => {
        if (!this.props.options) return;
        return this.props.options.map((obj) => {
            return <SView onPress={obj.onPress} row>
                <SView width={8} />
                <SIcon name={obj.icon ?? "Alert"} fill={STheme.color.secondary} width={24} height={24} />
                <SView width={8} />
            </SView>

        })
    }
    render() {
        return <SView col={"xs-12"} height={60} backgroundColor={STheme.color.primary} center>
            <SView col={"xs-11"} row flex>
                <SView height center onPress={() => {
                    SNavigation.navigate("client");
                }}>
                    <SIcon name='LogoClean' width={108} fill={STheme.color.secondary} />
                </SView>
                <SView flex />
                <SView row center height>
                    {this.getOptions()}
                </SView>
            </SView>
            <SHr height={1} color={STheme.color.card} />

        </SView>
    }
}