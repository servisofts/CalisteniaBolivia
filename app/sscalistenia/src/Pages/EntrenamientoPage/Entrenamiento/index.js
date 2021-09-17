import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { SDate, SText, SView } from '../../../SComponent';
import Cronometro from '../Cronometro';
import Participantes from './Participantes';
// import RelojEntrenamiento from './RelojEntrenamiento';
import Terminar from './Terminar';
import TresD from './TresD';

class Entrenamiento extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <>
                <SView col={"xs-12"} center>
                    {/* <SView col={"xs-11 md-8 xl-6"} center height={60} card>
                        <SText>{JSON.stringify(this.props.data)}</SText>
                    </SView> */}

                    {/* <SView height={28} /> */}
                    {/* <Cronometro/> */}
                    <SView height={28} />
                    <TresD  entrenamiento={this.props.data} />
                    <SView height={28} />
                    <Participantes entrenamiento={this.props.data} />
                    <SView style={{
                        position: 'absolute',
                        width: 80,
                        height: 80,
                        top: 0,
                        right: 0,
                        alignItems: 'center',
                    }} >
                        <Terminar data={this.props.data} />
                    </SView>
                </SView>
                {/* <Reloj inicio={this.props.data.fecha_inicio} /> */}
            </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Entrenamiento);