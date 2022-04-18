import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SButtom, SDate, SHr, SIcon, SLoad, SNavigation, SPage, SPopup, STable2, SText, SView } from 'servisofts-component';
import Parent from ".."
import dispositivo from '../../dispositivo';
class HuellasDeUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getLista() {
        var data = Parent.Actions.getByKeyUsuario(this.props.key_usuario, this.props);
        if (!data) return <SLoad />
        var arr = Array.from({ length: 10 }, (x, i) => i + 1)
        return arr.map((obj) => {
            var huella = data.find((x) => x.codigo == obj);
            return <>
                <SView width={8} />
                <SView style={{
                    borderWidth: 1,
                    height: 40,
                    width: 50,
                    borderColor: "#fff",
                    borderRadius: 5,
                    backgroundColor: huella ? "#fff" : "#000",
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
                            /*SPopup.open({
                                key: "esperandoHuella",
                                content: <EsperandoHuella data={{
                                    ...huella,
                                    key_usuario: this.props.key_usuario,
                                    key_sucursal: itm.key,
                                    codigo: obj,
                                }} />
                            })*/

                        }
                    })
                }}>
                    <SText color={huella ? "#000" : "#fff"}>{obj}</SText>
                </SView>
                <SView width={8} />
            </>
        })
    }


    render() {
        if (this.state.solicitud) {

            SNavigation.navigate("lector_huella", {soli:JSON.stringify(this.state.solicitud)});
            this.state.solicitud = null;
            return <SText>Hola mundo</SText>;
        }
        return (
            <SView col={"xs-12"} center row>
                {this.getLista()}

            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(HuellasDeUsuario);