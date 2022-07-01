import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { STheme, SView } from 'servisofts-component'
const delay = ms => new Promise(res => setTimeout(res, ms));
export default class Reloj extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
        };
        this.anim = new Animated.Value(0);
    }

    componentDidMount() {
        this.isRun = true;
        this.contar();
    }

    contar = async () => {
        Animated.timing(this.anim, {
            toValue: this.anim._value + 10,
            duration: 10,
            useNativeDriver: true
        }).start(() => {
            this.setState({ time: new Date() });
            if (this.isRun) {
                this.contar();
            }
        });
        // if (!this.isRun) return false;
        // this.contar();
    }
    componentWillUnmount() {
        this.isRun = false;
    }
    getTime() {
        var mont = moment(this.state.time);
        var hh = mont.format("HH");
        var minutos = mont.format("mm");
        var seconds = mont.format("ss");
        // var ms = this.state.time % 1000;
        var decimas = 0

        return <View style={{
            width: 200,
            height: 100,
            borderRadius: 16,
            backgroundColor: STheme.color.card,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
        }}>
            <Text style={{ color: STheme.color.text, fontSize: 37, }}>{hh}</Text>
            <SView height={37} style={{ justifyContent: "center", }}>
                <Text style={{ color: STheme.color.text, fontSize: 24 }}>{" : "}</Text>
            </SView>
            <Text style={{ color: STheme.color.text, fontSize: 37, }}>{minutos}</Text>

            <Text style={{ color: STheme.color.darkGray, fontSize: 10, position: "absolute", top: 4, }}>{"Hora actual"}</Text>
        </View>
    }
    render() {
        return (
            <View>
                {this.getTime()}
            </View>
        );
    }
}
