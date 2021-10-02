import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SLoad, SPage, SText, SView } from 'servisofts-component';
import Entrenamiento from '..';

class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    componentDidMount() {
        Entrenamiento.Actions.getAll(this.props, true);
    }
    getLista() {
        var data = Entrenamiento.Actions.getAll(this.props);
        if (!data) return <SLoad />
        return Object.keys(data).map((key) => {
            var obj = data[key];
            // if (!obj.key) return <View />;
            return <>
                <SHr height={16} />
                <SView col={"xs-11 md-8 xl-6"} key={key} card height={100} style={{
                    padding: 4,
                }}>
                    <SText>{`key_usuario: ${obj.key_usuario}`}</SText>
                    <SText>{`key_sucursal: ${obj.key_sucursal}`}</SText>
                    <SText>{`fecha_on: ${obj.fecha_on}`}</SText>
                    {/* <SText>{`json: ${JSON.stringify(obj, "\n", "\t")}`}</SText> */}
                </SView>
            </>
        });
    }
    render() {
        return (
            <SPage title={"Entrenamientos"}>
                <SView center>
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