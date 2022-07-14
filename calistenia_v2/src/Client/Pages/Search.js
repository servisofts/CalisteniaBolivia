import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SDate, SHr, SIcon, SImage, SList, SLoad, SNavigation, SPage, SText, STheme, SView } from 'servisofts-component';
import TopBar from '../Components/TopBar';
import Models from '../Models';
import Usuario from '../../Pages/Usuario';
import BottomBar from '../Components/BottomBar';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getBar = () => {
        const OPTIONS = [];

        return <TopBar options={OPTIONS} />
    }


    render() {
        return (
            <>
                {this.getBar()}
                <SPage hidden center>
                    <SText>Search</SText>
                </SPage>
                <BottomBar page={"search"} />
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Search);