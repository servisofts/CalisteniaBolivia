import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, STheme, SView } from 'servisofts-component';
import Parent from ".."
import dispositivo from '../../dispositivo';
class HuellasDeUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onSubmit() {

    }
    getLista() {
        var data = Parent.Actions.getByKeyUsuario(this.props.key_usuario, this.props);
        if (!data) return <SLoad />
        var arr = Array.from({ length: 2 }, (x, i) => i + 1)
        return arr.map((obj) => {
            var huella = data.find((x) => x.codigo == obj);
            return <>
                <SView width={8} />
                <SView style={{
                    width: 54,
                }} center onPress={() => {
                    SNavigation.navigate("SucursalPage", {
                        onSelect: (itm) => {
                            this.setState({
                                solicitud: {
                                    ...huella,
                                    key_usuario: this.props.key_usuario,
                                    key_sucursal: itm.key,
                                    codigo: obj,
                                }
                            })
                        }
                    })
                }}>
                    <SView style={{
                        height: 45,
                        width: 45,
                    }} center>
                        <SIcon name={"Fp"} fill={huella ? STheme.color.text : STheme.color.text+"22"} />

                    </SView>
                    <SHr/>
                    <SText center fontSize={10} color={""}>Pulgar {obj == 1 ? "Izquierdo" : "Derecho"}</SText>
                    <SHr/>
                </SView>
                <SView width={8} />
            </>
        })
    }


    render() {
        if (!this.props.key_usuario) return null;

        if (this.state.solicitud) {
            SNavigation.navigate("lector_huella", { soli: JSON.stringify(this.state.solicitud) });
            this.state.solicitud = null;
            return <SText>Exito</SText>;
        }
        return (
            <SView col={"xs-12"} center >
                <SText color={STheme.color.gray}>Huellas</SText>
                <SHr />
                <SView col={"xs-12"} center row>
                    {this.getLista()}

                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(HuellasDeUsuario);