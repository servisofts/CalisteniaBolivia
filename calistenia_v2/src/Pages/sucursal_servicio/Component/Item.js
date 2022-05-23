import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SPage, SText, STheme, SView } from 'servisofts-component';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getNoSelect() {
        if (!this.props.onSelect) return null;
        if(this.props.select) return null;
        return <SView col={"xs-12"} height backgroundColor={"#00000099"} style={{
            position: "absolute",
        }} center onPress={() => {
            this.props.onSelect(this.props.obj);
        }}>
            <SText fontSize={18} bold>Activar</SText>
        </SView>
    }
    render() {
        return (
            <SView width={160} height={140} style={{
                borderRadius: 10,
                borderWidth: 1,
            }} center backgroundColor={STheme.color.card} onPress={()=>{
                this.props.deSelect(this.props.obj);
            }}>
                <SView col={"xs-12"}
                    height={110}
                >

                </SView>
                <SView col={"xs-12"} flex center>
                    <SText fontSize={16} bold>{this.props.obj.descripcion}</SText>
                </SView>
                {this.getNoSelect()}
            </SView >
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Item);