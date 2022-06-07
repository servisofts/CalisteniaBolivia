import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from ".."
import SSocket from 'servisofts-socket';
class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.key_usuario = SNavigation.getParam("key_usuario");
    }


    render() {
        return (
            <SPage title={'Lista de ' + Parent.component} disableScroll>
                <SView row>
                    <SButtom type={"outline"} onPress={() => {
                        Parent.Actions.getAll(this.props);
                    }}>PEDIR HUELLAS</SButtom>
                    <SView width={16} />

                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);