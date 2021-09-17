import React, { Component } from 'react';
import { connect } from 'react-redux';
import qs from 'qs';
import { View, Text, Button, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import NaviDrawer from '../../Component/NaviDrawer';
import NaviDrawerButtom from '../../Component/NaviDrawer/NaviDrawerButtom';
import * as SSNavigation from '../../SSNavigation'
import ActionButtom from '../../Component/ActionButtom';
import AppParams from '../../Params';
import BackgroundImage from '../../Component/BackgroundImage';
import BarraSuperior from '../../Component/BarraSuperior';
import SSCrollView from '../../Component/SScrollView';
import FloatButtom from '../../Component/FloatButtom';
import SOrdenador from '../../Component/SOrdenador';
import Buscador from '../../Component/Buscador';
import SMapView from '../../Component/SMapView';
import SMarker from '../../Component/SMapView/SMarker';
import Svg from '../../Svg';
class SucursalMapaPage extends Component {
    static navigationOptions = {
        headerShown: false,
    }
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                curPage: 1,
            },
            region: {
                latitude: -17.78629,
                longitude: -63.18117,
                latitudeDelta: 0.08,
                longitudeDelta: 0.08,
            }
        };
        SSNavigation.setProps(props);

    }


    render() {
        this.onSelect = this.props.navigation.getParam("onSelect");
        var data = this.props.state.sucursalReducer.data;
        if (!data) {
            if (this.props.state.sucursalReducer.estado == "cargando") {
                return <Text>Cargando</Text>
            }
            var object = {
                component: "sucursal",
                type: "getAll",
                estado: "cargando",
                key_usuario: this.props.state.usuarioReducer.usuarioLog.key,
            }
            this.props.state.socketReducer.session[AppParams.socket.name].send(object, true);
            return <View />
        }

        const getLista = () => {
            return Object.keys(data).map((key, index) => {
                var obj = data[key];
                return <SMarker lat={obj.latitude} lng={obj.longitude}>
                    <Svg name={"Carrito"} style={{
                        width: 30,
                        height: 30,
                    }} />
                </SMarker>
            })
        }
        return (<>
            <View style={{
                flex: 1,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center"
                // backgroundColor:"#000",
            }}>
                <BackgroundImage />
                <BarraSuperior title={"Sucursales"} navigation={this.props.navigation} goBack={() => {
                    this.props.navigation.goBack();
                }} />
                <View style={{
                    flex: 1,
                    width: "100%",
                }}>
                    <SMapView style={{
                        flex: 1,
                        width: '100%',
                        height: "100%",
                    }}
                        ref={map => {
                            this.mapa = map;
                        }}
                        initialRegion={this.state.region}
                        showsUserLocation={true}
                    // onRegionChangeComplete={(region) => this.OnRegionChangeComplete(region)
                    >
                        {getLista()}
                    </SMapView>

                </View>
            </View>
        </>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(SucursalMapaPage);