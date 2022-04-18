import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from ".."
import EsperandoHuella from '../Components/EsperandoHuella';
class Registro extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.solicitud = JSON.parse(SNavigation.getParam("soli", "{}"));	
    }


    render() {
        return (
            <SPage title={'Lista de ' + Parent.component} disableScroll>
              <EsperandoHuella data={this.solicitud}/>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Registro);