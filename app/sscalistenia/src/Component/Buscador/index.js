import React, { Component } from 'react';
import { View, Text } from 'react-native';
import STextImput from '../STextImput';

type Tprops = {
    repaint: Function,
    placeholder: String,
}

export default class Buscador extends Component<Tprops> {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
    }

    buscar(data) {
        if (typeof data != "object") {
            return Object.keys(data);
        }
        var lista_keys = Object.keys(data);
        var val = this.state.value.trim() || "";
        // var arrPalabras = val.replaceAll(" ", "|");
        var arrPalabras = val.split(" ");
        var arr2 = [];
        var objFinal = {};
        lista_keys.map((key) => {
            var obj = data[key];
            var str = JSON.stringify(obj);
            var isValid = false;
            var peso = 0;
            for (let i = 0; i < arrPalabras.length; i++) {
                const txtTest = arrPalabras[i];
                var expreg = new RegExp(":.*?" + txtTest + ".*?(,|})", "i");
                var expreg2 = new RegExp("dato.:.*?" + txtTest + ".*?(,|})", "i");
                if (expreg.test(str) || expreg2.test(str)) {
                    isValid = true;
                    peso++;
                }
            }
            if (isValid) {
                arr2.push(key);
                if (!objFinal[key]) {
                    objFinal[key] = data[key];
                }
                objFinal[key]["Peso"] = peso;
            }
        })

        return objFinal;
    }

    render() {
        return (
            <View style={{
                width: "100%",
                height: 40,
                // backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center"

            }}>
                <View style={{
                    width: "90%",
                    maxWidth: 600,
                    height: 30,
                    backgroundColor: "#ff000022",
                    justifyContent: "center",
                    borderRadius: 8,
                    alignItems: "center"

                }}>
                    <STextImput placeholder={this.props.placeholder ? this.props.placeholder : "Buscar..."} style={{
                        width: "100%",
                        color: "#fff",
                        padding: 0,
                        paddingLeft: 8,
                        paddingRigth: 8,
                    }}
                        onChangeText={(txt) => {
                            this.state.value = txt;
                            this.props.repaint();

                        }}
                    />
                </View>
            </View>
        );
    }
}
