import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SScrollView from '../../../SScrollView';
import { SText } from '../../../SText';
import { SView } from '../../../SView';
import SDate from '../../../SDate';
import SThread from '../../../../Component/SThread';
export default class SIFechaAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.scroll = {};
        this.refItens = {
            year: {},
            month: {},
            day: {},
        };
        new SThread(1000, "moveDate", true).start(() => {
            this.selectYear(500)
        })

    }
    selectYear(y) {
        if (this.refItens["year"][y]) {
            var lay = this.refItens["year"][y].getLayout();
            this.scroll["year"].scrollTo({ x: lay.x + 50, y: lay.y + 20 });
        }
    }
    getListaKey = (key) => {
        var arr = [];
        switch (key) {
            case "year":
                for (let i = 1889; i < 2025; i++) {
                    arr.push({
                        type: key,
                        val: i,
                        data: i + ""
                    })
                }
                break;
            case "month":
                for (let i = 1; i <= 12; i++) {
                    arr.push({
                        type: key,
                        val: i,
                        data: SDate.getMonth(i).text,
                    })
                }
                break;
            case "day":
                for (let i = 1; i <= 31; i++) {
                    arr.push({
                        type: key,
                        val: i,
                        data: i + ""
                    })
                }
                break;
        }
        return arr.map((obj) => {
            return (<SView
                props={{
                    variant: "center"
                }}
                style={{
                    width: "100%",
                    height: 40,
                }}
                ref={(ref) => { this.refItens[obj.type][obj.val + ""] = ref }}
                onPress={(evt) => {
                    this.scroll[key].scrollTo({ x: evt.layout.x + 50, y: evt.layout.y + 20 });
                }}>
                <SText options={{
                    variant: "h3"
                }}>
                    {obj.data}

                </SText>
            </SView>)
        });
    }
    getLista = (key) => {
        return <SView props={{
            col: "xs-4",
            height: "100%",
            variant: "center"
        }}>
            <SView style={{
                position: "absolute",
                width: "100%",
                height: 40,
                backgroundColor: "#00000055"
            }}>

            </SView>
            <SScrollView disableHorizontal
                ref={(ref) => { this.scroll[key] = ref }}>
                <SView style={{
                    width: "100%",
                }}>
                    <SView style={{
                        height: 80
                    }}></SView>
                    {this.getListaKey(key)}
                    <SView style={{
                        height: 80
                    }}></SView>
                </SView>
            </SScrollView>

        </SView>;
    }

    render() {
        return <SView props={{
            customStyle: "primary",
            direction: "row"
        }} style={{
            width: "100%",
            height: 200,
            borderRadius: 8,
        }}>
            {this.getLista("year")}
            {this.getLista("month")}
            {this.getLista("day")}
        </SView>
    }
}
