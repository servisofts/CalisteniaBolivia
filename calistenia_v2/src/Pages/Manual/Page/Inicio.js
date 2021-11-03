import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SPage, SText, SView } from 'servisofts-component';

const _DATA = [
    {
        label: "Usuario", data: [
            { label: "Como crear un usuario?" },
            {
                label: "Como crear un usuario?", data: [
                    { label: "Como crear un usuario?" },
                    { label: "Como crear un usuario?" },
                ]
            },
        ],
    },

]

class Inicio extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    getLista(data, i) {
        if (!data) return null;
        return data.map((item, index) => {
            return (
                <>
                    <SHr />
                    <SView key={index} col={"xs-12"} height={50} center >
                        <SView card col={"xs-12"} height center row>
                            <SView width={60}>
                                <SText fontSize={12} >{`${i}${index + 1}`}</SText>
                            </SView>
                            <SText flex>{item.label}</SText>
                        </SView>
                    </SView>
                    {this.getLista(item.data, i + (index + 1) + "-")}
                </>
            )
        })
    }
    render() {
        return (
            <SPage title={'Manual'}>
                <SView col={"xs-12"} center>
                    <SView col={"xs-10"} center>
                        {this.getLista(_DATA, "")}
                        <SHr />
                        <SHr />
                        <SHr />

                    </SView>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Inicio);