import moment from 'moment';
import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const delay = ms => new Promise(res => setTimeout(res, ms));

export default class Cronometro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
        };
        this.anim = new Animated.Value(0);
    }

    componentDidMount() {

    }
    contar = async () => {
        Animated.timing(this.anim, {
            toValue: this.anim._value + 10,
            duration: 10,
            useNativeDriver: true
        }).start(() => {
            this.setState({ time: this.anim._value});
            if(this.isRun){
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
        var minutos = mont.format("mm");
        var seconds = mont.format("ss");
        var ms = this.state.time % 1000;
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
            <Text style={{
                color: "#fff",
                fontSize: 37,
            }}>{minutos}:{seconds}</Text>
            <Text style={{
                color: "#fff",
                fontSize: 20,
                marginTop: 8,
            }}>.{ms}</Text>
        </View>
    }
    render() {
        return (
            <View>
                {this.getTime()}
                <TouchableOpacity style={{
                    width: 40,
                    height: 20,
                    backgroundColor: "#66000066"
                }} onPress={() => {
                    this.isRun = !this.isRun;
                    if (this.isRun) {
                        this.contar();
                    } else {
                        this.anim.stopAnimation();
                    }
                }}>
                    <Text style={{
                        color: "#fff"
                    }}>Iniciar</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
