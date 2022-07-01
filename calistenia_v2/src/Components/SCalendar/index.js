import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STheme } from 'servisofts-component';
import SC_Mes from './SC_Mes';

type SCalendarPropsType = {

}

export default class SCalendar extends Component<SCalendarPropsType> {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.style = StyleSheet.create({
      border: {
        
      },
      text: {
        color: STheme.color.text
      }
    })
  }
  getBar = () => {
    return <View style={[this.style.border, {
      width: "100%",
      height: 40,
    }]}>
      <Text style={[this.style.text, { fontSize: 20, }]}> SCalendar </Text>
    </View>
  }
  getSDate() {
    if (this.sc_mes) {
      return this.sc_mes.getSDate();
    }
    return false;
  }
  render() {
    return (
      <View style={{
        width: "100%",
      }} onLayout={(event) => {
        this.state.layout = event.nativeEvent.layout;
        this.setState({ ...this.state })
      }}>
        {/* {this.getBar()} */}
        <SC_Mes
          style={this.style}
          layout={this.state.layout}
          ref={(ref) => { this.sc_mes = ref }}
          {...this.props}
        />
      </View>
    );
  }
}
