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
    SNavigation,
    SMapView2
} from "servisofts-component";
import SMapView from "servisofts-component/Component/SMapView";
import SSocket from "servisofts-socket";
import { BtnNavegar } from "../../../Components";
export type MapaPropsType = {
    // data: any,
};
class Mapa extends Component<MapaPropsType> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var { latitude, longitude } = this.props?.data;

        if(latitude == null) latitude= -17.768507
        if(longitude == null) longitude= -63.183698
        return (
            <SView col={"xs-12 "} row center>
                <SView col={"xs-12 sm-10 md-8 lg-6 xl-4 xxl-4"} {...this.props} center>
                    <SMapView2
                        initialRegion={{
                            // latitude: this.props.data?.latitude,
                            // latitude: this.props.data?.latitude,
                            latitude: latitude,
                            longitude: longitude,
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
                        <SMarker  lat={latitude} lng={longitude} >
                            <SIcon name="MarcadorMapac" width={35} height={45} />
                        </SMarker>
                    </SMapView2>
                    <SHr height={20} />
                    {/* <SView
                        center
                        backgroundColor={STheme.color.darkGray}
                        width={170}
                        height={30}
                        style={{ borderRadius: 8 }}
                        onPress={() => {
                            SNavigation.navigate("/root")
                        }}
                    >
                        <SText>Ir a Google Maps</SText>
                    </SView> */}
                    <BtnNavegar latLng={{ latitude: latitude, longitude: longitude }}
                     backgroundColor={STheme.color.darkGray}
                     width={190}
                     height={50}
                     style={{ borderRadius: 8 }}
                     center
                    >
                        <SText color={"#fff"} center fontSize={15} >Ir a Google Maps</SText>
                    </BtnNavegar>
                    <SHr height={40} />
                </SView>
            </SView>
        );
    }
}
export default Mapa;
