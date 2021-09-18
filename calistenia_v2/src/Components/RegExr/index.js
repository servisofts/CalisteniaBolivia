import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SImage, SText, STheme, SView, SIcon, SNavigation, SPopup } from 'servisofts-component';
import ComponentPadre from '../../Pages/Ajustes/Pages/PalabraRestringida/index';
// import parserHtml from "html-react-parser"

class RegExr extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getTexto = () => {
        if (!this.props.children) return <SView />;
        var data = ComponentPadre.getAll(this.props);
        if (!data) return;
        var listaExpre = [];
        var frase = this.props.children
        var COMPONENT = [];
        var finded = {};
        Object.keys(data).map((key) => {
            var obj = data[key];
            var regex_ok = new RegExp(obj.regex, "i");
            listaExpre = frase.match(regex_ok);
            if (listaExpre != null) {
                var ind = frase.indexOf(listaExpre[0]);
                var ind2 = ind + listaExpre[0].length;
                finded[key] = {
                    start: ind,
                    end: ind2,
                    text: listaExpre[0],
                }
            }

        })
        return frase.split(/./g).map((item, index) => {
            var considence = [];
            Object.keys(finded).map((key) => {
                var obj = finded[key];
                if (index >= obj.start && index <= obj.end) {
                    considence.push(
                        <SView style={{
                            width: '100%',
                            height: '100%',
                            position: "absolute",
                            backgroundColor: data[key].color + "33",
                        }} onPress={() => {
                            SPopup.alert(obj.text + " \n " + data[key].descripcion)
                        }} activeOpacity={1}></SView>
                    );
                }
            })
            return <SView>
                <SText>{frase.charAt(index)}</SText>
                {considence}
            </SView>
        })

    }
    render() {
        return <SView style={{
            flexDirection: 'row',
        }}>
            {this.getTexto()}
        </SView>

    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(RegExr);