import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SDate, SInput, SView } from 'servisofts-component';

type TypeProps = {
    fecha_inicio: "yyyy-MM-dd",
    fecha_fin: "yyyy-MM-dd",
    onChange: Function,
}
export default class FechaSingle extends Component<TypeProps> {
    constructor(props) {
        super(props);
        var fecha_inicio = new SDate(this.props.fecha_inicio, "yyyy-MM-dd");
        this.state = {
            fecha_inicio: fecha_inicio.toString("yyyy-MM-dd"),
            fecha_fin: new SDate().toString("yyyy-MM-dd"),
        };
        this.props.onChange(this.state.fecha_inicio, this.state.fecha_fin);
    }
    onChange(key, value) {
        if (this.props.onChange) {
            if (key == "fecha_inicio") {
                if (this.state.fecha_inicio != value) {
                    this.state.fecha_inicio = value;
                    this.props.onChange(this.state.fecha_inicio, this.state.fecha_fin);
                }
            } else {
                if (this.state.fecha_fin != value) {
                    this.state.fecha_fin = value;
                    this.props.onChange(this.state.fecha_inicio, this.state.fecha_fin);
                }
            }
            this.setState({ ...this.state });
        }
    }
    render() {
        return (
            <SView col={"xs-12"}
                height={50}
                style={{
                    height: 50,
                    // backgroundColor: "#ff0000",
                    alignItems: "center",
                    justifyContent: "center"
                }} row>
                <SView col={"xs-11 md-6 xl-4"} style={{ height: "100%", padding: 4, }}>
                    <SInput
                        type="date"
                        // customStyle: "primary",
                        placeholder="Fecha Inicio"
                        style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 4,
                            backgroundColor: "#66000044",
                            borderColor: "#666"
                        }}
                        defaultValue={this.state.fecha_inicio}
                        onChangeText={(val) => {
                            this.onChange("fecha_inicio", val);
                            // this.state.fecha_inicio = val
                            // this.setState({ ...this.state })
                        }}
                    />
                </SView>
            </SView>
        );
    }
}
