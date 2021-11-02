import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import TipoGasto from '..';
import FloatButtom from '../../../Component/FloatButtom';
import Page from '../../../Component/Page';
import { SScrollView2, SText, SView } from '../../../SComponent';

class TipoGastoPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getLista() {
        var tipoGastos = TipoGasto.getAll(this.props);
        if (!tipoGastos) return <View />
        return Object.keys(tipoGastos).map((key) => {
            var obj = tipoGastos[key];
            return <SView col={"xs-11"} props={{
                customStyle:"card"
            }}>
                <SText>{JSON.stringify(obj)}</SText>
            </SView>
        })
    }
    render() {
        return (
            <Page navigation={this.props.navigation}>
                <SView col={"xs-12"} height>
                    <SScrollView2 disableHorizontal>
                        <SView col={"xs-12"} center>
                            {this.getLista()}
                        </SView>
                    </SScrollView2>
                    <FloatButtom onPress={() => {
                        this.props.navigation.navigate('TipoGastoRegistroPage');
                    }} />
                </SView>
            </Page>
        );
    }
}
export default connect((state) => {
    return { state }
})(TipoGastoPage);