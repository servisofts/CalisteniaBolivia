import React, { Component } from "react";
import { connect } from "react-redux";
import {
    SHr,
    SIcon,
    SImage,
    SMarker,
    SPage,
    SText,
    STheme,
    SView,
} from "servisofts-component";
import SMapView from "servisofts-component/Component/SMapView";
import SSocket from "servisofts-socket";
export type MapaPropsType = {
    // data: any,
};
class index extends Component<MapaPropsType> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        // var { key, nombre, proximo_horario } = this.props.data;
        return (
            <SView col={"xs-12 "} row center>
            <SView col={"xs-12 sm-10 md-8 lg-6 xl-4 xxl-4"} {...this.props} row center >
                <SMapView
                    initialRegion={{
                        // latitude: this.props.data?.latitude,
                        // latitude: this.props.data?.latitude,
                        latitude: -17.768507, 
                        longitude: -63.183698,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    options={{
                        fullscreenControl: false,
                        zoomControl: false,
                        gestureHandling: "none",
                        scrollwheel: false,
                    }}
                    preventCenter
                >
                    <SMarker lat={-17.768507} lng={-63.183698}  >
                        <SIcon name="MarcadorMapa" width={20} height={30} />
                    </SMarker>
                </SMapView> 
                </SView>
            </SView>
        );
    }
}
export default index;
