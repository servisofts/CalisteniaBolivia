import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SNavigation, SText, SView } from 'servisofts-component';
import SSRolesPermisos from '../../../../SSRolesPermisos';
import Caja from '../../../Caja';
import Usuario from '../../../Usuario';

class CajasActivas extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getContent() {
        var cajas = Caja.Actions.getActivas(this.props);
        if (!cajas) return <SLoad />
        var cant = 0;
        Object.keys(cajas).map(key => {
            if (cajas[key].estado == 1) cant++;
        })
        return <SView center row height>
            <SView col={"xs-12"} center >
                <SText fontSize={10}>{`Cajas activas`}</SText>
            </SView>
            <SView col={"xs-8"} center height={40}>
                <SView center col={"xs-10"} height card>
                    <SText bold fontSize={18} center>{`${cant}`}</SText>
                </SView>
            </SView>
            <SView col={"xs-4"} height={50} onPress={()=>{
                SNavigation.navigate("CajasAbiertas")
            }}>
                <SIcon name={"Caja"} />
            </SView>

        </SView>
    }
    render() {
        return (
            <SView col={"xs-11 sm-6 md-4 xl-3"} height={100} style={{
                padding: 8,
            }}>
                <SView height card center>
                    {this.getContent()}
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(CajasActivas);