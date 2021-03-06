import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SIcon, SLoad, SNavigation, SText, SView } from 'servisofts-component';
import SSRolesPermisos from '../../../../SSRolesPermisos';
import Caja from '../../../Caja';
import Entrenamiento from '../../../Entrenamiento';
import sucursal_usuario from '../../../sucursal_usuario';
import Usuario from '../../../Usuario';

class EntrenamientosActivos extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getContent() {
        var entrenamientos = Entrenamiento.Actions.getAll(this.props);
        if (!entrenamientos) return <SLoad />
        var cant = 0;
        Object.keys(entrenamientos).map(key => {
            if (!entrenamientos[key].key_sucursal) return null;
            if (!sucursal_usuario.Actions.isActive(entrenamientos[key].key_sucursal, this.props)) {
                return null;
            }
            if (entrenamientos[key].estado == 1) cant++;
        })
        return <SView center row height>
            <SView col={"xs-12"} center >
                <SText fontSize={10}>{`Entrenamientos activos`}</SText>
            </SView>
            <SView col={"xs-4"} height={50} onPress={() => {
                SNavigation.navigate("entrenamientos");
            }}>
                <SIcon name={"Entrenamiento"} />
            </SView>
            <SView col={"xs-8"} center height={40}>
                <SView center col={"xs-10"} height card>
                    <SText bold fontSize={18} center>{`${cant}`}</SText>
                </SView>
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
export default connect(initStates)(EntrenamientosActivos);