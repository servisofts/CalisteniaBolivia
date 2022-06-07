import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SText, SView, SDate, STheme } from 'servisofts-component';

type TaskProps = {
    fecha: SDate,
    dias: Number
}
type CalendarProps = {
    onChange: (SDate: SDate) => {},
    task: TaskProps
}
export default class SCalendar extends Component<CalendarProps> {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: "#440000" + "22",
            date: new SDate(new SDate().toString("yyyy-MM-dd"), "yyyy-MM-dd"),
        };
    }
    getTopBar() {
        return <SView col="xs-12" center row>
            <SView col={"xs-8"} row style={{
                alignItems: "flex-end"
            }}>
                <SText props={{
                    variant: "h4",
                    type: "primary"
                }}>{this.state.date.toString("MONTH")}</SText>
                <SText props={{
                    type: "primary",
                }}>{this.state.date.toString("yyyy")}</SText>
            </SView>
            <SView col="xs-1" center onPress={() => {
                this.state.date.addMonth(-1);
                this.setState({ ...this.state })
            }}>
                <SText props={{
                    variant: "h3",
                    type: "primary"
                }}>{"<"}</SText>
            </SView>
            <SView col="xs-2" center onPress={() => {
                this.state.date = new SDate(new SDate().toString("yyyy-MM-dd"), "yyyy-MM-dd");
                this.setState({ ...this.state })

            }}>
                <SText props={{
                    type: "primary"
                }}>{"Hoy"}</SText>
            </SView>
            <SView col="xs-1" center onPress={() => {
                this.state.date.addMonth(1);
                this.setState({ ...this.state })
            }}>
                <SText props={{
                    variant: "h3",
                    type: "primary"
                }}>{">"}</SText>
            </SView>
        </SView>
    }
    getHeader() {
        var daysOfWeek = SDate.getDaysOfWeek();
        return Object.keys(daysOfWeek).map((key) => {
            var day = daysOfWeek[key];
            return <SView col="xs-1.7">
                <SText props={{
                    type: "primary"
                }}>{day.textSmall}</SText>
            </SView>
        })
    }
    getCurDate(date: SDate) {
        var isCurdDate = date.isCurDate();
        if (!isCurdDate) return <View />
        return <SView style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: STheme.color.danger + 33,
            borderRadius: 100,
        }}>

        </SView>
    }

    GetBorder = (date, fecha_inicio, _fecha_fin) => {
        var fecha_fin = _fecha_fin.clone();
        if (date.equalDay(fecha_inicio) && date.equalDay(fecha_fin)) {
            return {
                borderTopLeftRadius: 100,
                borderBottomLeftRadius: 100,
                borderTopEndRadius: 100,
                borderBottomEndRadius: 100
            }
        }
        if (date.equalDay(fecha_inicio)) {
            return {
                borderTopLeftRadius: 100,
                borderBottomLeftRadius: 100,
            }

        }
        if (date.equalDay(fecha_fin)) {
            return {
                borderTopEndRadius: 100,
                borderBottomEndRadius: 100
            }
        }
        return {}
    }
    getTask(date: SDate) {
        if (!this.props.task) {
            return <View />
        }
        var fecha_inicio = this.props.task.fecha.clone();
        var fecha_fin = fecha_inicio.clone()

        fecha_fin.addDay(this.props.task.dias);
        if (date.isBefore(fecha_inicio.clone().addDay(-1))) {
            return <View />
        }
        if (date.isAfter(fecha_fin)) {
            return <View />
        }

        return <SView style={{
            position: "absolute",
            width: "100%",
            height: 6,
            backgroundColor: STheme.color.danger + 66,
            borderRadius: 0,
            ...this.GetBorder(date, fecha_inicio.clone(), fecha_fin.clone())
        }}> </SView>
    }
    getSemana(date: SDate) {
        date.addDay(-1);
        return Object.keys(SDate.getDaysOfWeek()).map((key) => {
            var day = SDate.getDayOfWeek(key);
            date.addDay(1);
            var curDay = date.toJson();
            var curDayClone: SDate = date.clone();
            var isCurMont = (curDayClone.toString("MM") == this.state.date.toString("MM"))
            return <SView col="xs-1.71" height={50} center>
                <SView style={{
                    width: "94%",
                    height: "94%",
                    backgroundColor: this.state.backgroundColor,
                    borderRadius: 4,

                }} onPress={() => {
                    if (this.props.onChange) {
                        this.props.onChange(curDayClone);
                        // alert(curDayClone.toString("yyyy-MM-dd hh:mm:ss"))
                    }
                }}>
                    <SView style={{
                        width: 20,
                        height: 20,
                    }} center>
                        {this.getCurDate(curDayClone)}
                        <SText props={{
                            type: "primary",
                        }} style={{
                            textAlign: "center",
                            ...(!isCurMont ? { color: STheme.color.secondary+"66" } : {})
                        }}>{curDay.day}</SText>
                    </SView>
                </SView>
                {this.getTask(curDayClone)}
            </SView>
        })
    }
    getData() {
        var date = this.state.date.clone();
        date.setDay(0);
        date.addDay(-date.getDayOfWeek());
        return [0, 1, 2, 3, 4, 5].map((nsemana) => {
            if (nsemana > 0) {
                date.addDay(7);
            }
            return <SView col={"xs-12"} row center style={{
                backgroundColor: this.state.backgroundColor,
                width: "100%",
            }}>
                {this.getSemana(date.clone())}
            </SView>
        })
    }
    render() {
        return (
            <SView col={"xs-12"} center>
                {/* <Text style={{ fontSize: 16 }}>{this.state.date.toString("MONTH")}</Text> */}
                <SView col={"xs-12"} row style={{
                    height: 25,
                }}>
                    {this.getTopBar()}
                </SView>
                <SView col={"xs-12"} row style={{
                    height: 20,
                }}>
                    {this.getHeader()}
                </SView>
                <SView col={"xs-12"} style={{
                }}>
                    {this.getData()}
                </SView>
            </SView>
        );
    }
}
