import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, STheme, SView } from 'servisofts-component';
import Parent from ".."
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLista() {
        var data = Parent.Actions.getAll(this.props);
        if (!data) return <SLoad />;
        return data.map((obj) => {
            return <SView height={150} center width={100} style={{
                borderWidth: 1,
                borderColor: STheme.color.text,
                borderRadius: 5,
            }} row>
               

            </SView>
        })
    }

    render() {
        return (
            <SPage title={'Lista de ' + Parent.component} disableScroll>
                <SHr />
                <SView col={"xs-12"} center row>
                    {this.getLista()}
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);