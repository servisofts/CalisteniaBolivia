import React, { Component } from 'react';
import { SHr, SIcon, SText, STheme, SView, SImage, SLoad } from 'servisofts-component';
import SSocket from 'servisofts-socket';
import Model from '../../../Model';
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    effect1(moving) {
        if (!this.state.layout) return null;
        var h = this.state.layout.width / 10.46
        return <SView col={"xs-12"} height={h} style={{
            // position: "absolute",
            bottom: moving,
            zIndex: 1
        }}>
            <SIcon name='Effect1' fill={STheme.color.primary} />
        </SView>
    }


    render() {
        if (!this.props.data) return <SLoad type='skeleton' col={"xs-12"} height={100} />
        return (<>
            <SView col={"xs-12"} flex center >
                <SView col={"xs-12 sm-10 md-8 lg-6 xl-4 xxl-4"} row height={150} backgroundColor={STheme.color.primary} center
                    onLayout={(evt) => {
                        this.setState({ layout: evt.nativeEvent.layout })
                    }}
                >
                    <SImage src={Model.sucursal._get_image_download_path(SSocket.api, this.props.data.key)} width={"100%"} height={"100%"}
                        style={{
                            resizeMode: 'cover',
                        }}
                    />
                </SView>
                {this.effect1(-12)}

                <SView col={"xs-12 sm-10 md-8 lg-6 xl-4 xxl-4"} row height={140} backgroundColor={STheme.color.primary} center  >
                    <SView col={"xs-6"} height={140} >
                        <SImage src={require('../../../Assets/img/p1.jpg')} width={"100%"} height={"100%"}
                            style={{
                                resizeMode: 'cover',
                            }}
                        />
                    </SView>
                    <SView col={"xs-6"} height={140} >
                        <SImage src={require('../../../Assets/img/p2.jpg')} width={"100%"} height={"100%"}
                            style={{
                                resizeMode: 'cover',
                            }}
                        />
                    </SView>
                </SView>
                {this.effect1(12)}

            </SView>
        </>
        );
    }
}
