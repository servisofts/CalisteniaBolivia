import React, { Component } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import CalendarFunctions from '../CalendarFunctions';
import SDate from '../SDate';
import Task from './Task';

export default class SC_Mes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new SDate()
        };
       
    }
    getSDate() {
        return this.state.date;
    }
    getHeader() {
        var daysOfWeek = CalendarFunctions.getDaysOfWeek()
        var daysOfWeekItems = Object.keys(daysOfWeek).map((key) => {
            var day = daysOfWeek[key];
            return <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={[this.props.style.text, { fontSize: 12 }]}>{day.textSmall}</Text>
            </View>
        })
        return <View style={[{
            width: "100%",
            flexDirection: "row",
            height: 20,
            alignItems: "center",
        },
        this.props.style.border
        ]}>
            {daysOfWeekItems}
        </View>
    }
    getControll() {
        return <View style={[{
            width: "98%",
            flexDirection: "row",
            height: 40,
            alignItems: "center",
        }, this.props.style.border]}>

            <TouchableOpacity style={{
                flex: 5,
                height: "100%",
                justifyContent: "center",
            }}>
                <Text style={[this.props.style.text, { fontSize: 20 }]}>{this.state.date.toString("MONTH de yyyy")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {
                this.state.date.addMonth(-1);
                this.setState({ ...this.state })
            }}>
                <Text style={[this.props.style.text, { fontSize: 30 }]}>{"<"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
                flex: 1,
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
            }} onPress={() => {
                this.state.date.addMonth(1);
                this.setState({ ...this.state })
            }}>
                <Text style={[this.props.style.text, { fontSize: 30 }]}>{">"}</Text>
            </TouchableOpacity>
        </View>
    }
    getBody() {
        var date = this.state.date.clone();
        date.setDay(1);
        date.addDay(-date.getDayOfWeek());
        // date.addDay(-1);
        // date.addDay(date.getDay()*-1)
        var ITEM_mes = []
        for (let semana = 1; semana <= 6; semana++) {
            var ITEM_semana = []
            for (let dia = 0; dia <= 6; dia++) {
                date.addDay(1);
                var dateJson = date.toJson();
                var isCurMonth = (dateJson.month == this.state.date.getMonth())
                var isCurDate = date.isCurDate();
                ITEM_semana.push(
                    <View style={{
                        flex: 1,
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        // borderRadius:8,
                        borderBottomWidth: 1,
                        borderColor: "#66000044",
                        backgroundColor: (isCurMonth ? "#66000011" : "#66000044")
                    }}>
                        <View style={{
                            flex: 1,
                            width: "100%",
                        }}>
                            <View style={[(!isCurDate ? {} : {
                                backgroundColor: "#ff000066",
                                borderRadius: 100,
                            }),
                            {
                                width: 30,
                                height: 30,
                                justifyContent:"center",
                                alignItems:"center"
                            }
                            ]}>
                                <Text style={[
                                    {
                                        fontSize: 14,
                                        color: (isCurMonth ? "#fff" : "#666")
                                    },
                                ]}>{date.toString("dd")}</Text>
                            </View>
                        </View>
                        <Task date={date.clone()} task={this.props.task} />
                    </View>
                )
            }
            ITEM_mes.push(<View style={[{
                width: "100%",
                flexDirection: "row",
                height: 60,
                alignItems: "center",

            },
                // this.props.style.border
            ]}>
                {ITEM_semana}
            </View>);
        }
        return <View style={[{
            width: "100%",
            alignItems: "center",
        }, this.props.style.border]}>
            {ITEM_mes}
        </View>;
    }
    render() {
        if (!this.props.layout) {
            return <ActivityIndicator color={"#fff"} />
        }
        return (
            <View style={[{
                width: "100%",
                alignItems: "center",
                // backgroundColor: "#fff"
            }]}>
                {this.getControll()}
                {this.getHeader()}
                {this.getBody()}
            </View>
        );
    }
}
