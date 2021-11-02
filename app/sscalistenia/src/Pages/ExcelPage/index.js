import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Page from '../../Component/Page';
import { SButtom } from '../../SComponent';
export default class ExcelPage extends Component {

    static navigationOptions = {
        headerShown: false,
    }

  constructor(props) {
    super(props);
    this.state = {
    };
  }
  createExcel = () => {
    // var workbook = ExcelBuilder.Builder.createWorkbook();
  }

  render() {
    return (
     <Page navigation={this.props.navigation}>
         <SButtom props={{
             type:"danger"
         }} onPress={()=>{


         }}>VER</SButtom>
     </Page>
    );
  }
}
