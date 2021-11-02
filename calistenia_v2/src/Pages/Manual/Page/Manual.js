import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class Manual extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <Text> Manual </Text>
            </View>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Manual);