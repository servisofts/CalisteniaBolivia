import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, SView } from 'servisofts-component';
import { Container, Cupon } from '../Components';

class test extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <SPage title={'test'}>
                <Container>
                    <SHr/>
                    <Cupon data={{ descripcion: "RICKY-FREE", monto: 20 }} />
                </Container>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(test);