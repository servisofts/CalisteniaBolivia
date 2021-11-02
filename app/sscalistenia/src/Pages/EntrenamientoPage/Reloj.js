import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { SView } from '../../SComponent'
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
            backgroundColor: "#66000066",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
        }}>
            <Text style={{ color: "#fff", fontSize: 37, }}>{hh}</Text>
            <SView height={37} style={{ justifyContent: "center", }}>
                <Text style={{ color: "#fff", fontSize: 24 }}>{" : "}</Text>
            </SView>
            <Text style={{ color: "#fff", fontSize: 37, }}>{minutos}</Text>
            {/* <SView height={37} style={{ justifyContent: "flex-end", }}>
                <Text style={{ color: "#fff", fontSize: 14 }}>{"m "}</Text>
            </SView> */}
            {/* <SView height={37} style={{ justifyContent: "flex-end", }}>
                <Text style={{ color: "#fff", fontSize: 27 }}>{seconds}</Text>
            </SView>
            <SView height={37} style={{ justifyContent: "flex-end", }}>
                <Text style={{ color: "#fff", fontSize: 14 }}>{"s "}</Text>
            </SView> */}
            <Text style={{ color: "#666", fontSize: 10, position: "absolute", top: 4, }}>{"Hora actual"}</Text>
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
