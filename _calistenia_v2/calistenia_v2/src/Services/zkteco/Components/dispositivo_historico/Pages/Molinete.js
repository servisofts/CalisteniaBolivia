
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from ".."
import SSocket from 'servisofts-socket';
class Molinete extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    getLista(){
        var data = Parent.Actions.getAll(this.props);
        if(!data) return <SLoad/>;
        return <SText>{JSON.stringify(data)}</SText>
    }
    render() {
        this.activa = this.props.state.cajaReducer.usuario[this.props.state.usuarioReducer.usuarioLog.key];
        if (!this.activa){
            SNavigation.goBack();
            return null;
        }
        return (
            <SPage title={'Molinete de ' + Parent.component} disableScroll>
                <SView row>
                    <SButtom type={"outline"} onPress={() => {
                        Parent.Actions.abrir({
                          
                        }, this.props);
                    }}>ABRIR</SButtom>
                    <SView width={16} />
                </SView>
                <SHr/>
                {this.getLista()}
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Molinete);