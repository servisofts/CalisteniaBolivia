import React, { Component } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { SView } from '..'

export default class SLoad extends Component {
    render() {
        return (
            <SView col={"xs-12"} center>
                <ActivityIndicator size="large" color="#999" />
            </SView>
        )
    }
}
