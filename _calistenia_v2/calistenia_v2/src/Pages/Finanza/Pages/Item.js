import React, { Component } from 'react';
import { SHr, SImage, SNavigation, SText, SThread, SView } from 'servisofts-component';

export default class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var obj = this.props.obj;
        var urlImage = this.props.urlImage;
        return (
            <SView col={"xs-3 sm-2.5 md-2 lg-1.5 xl-1.3"} colSquare style={{
                padding: 4,
            }}
                animated
                style={{
                    transform: [
                        {
                            rotateZ: this.props.animMove.interpolate({
                                inputRange: [0, 0.25, 0.75, 1],
                                outputRange: ['0deg', '-2deg', '2deg', '0deg']
                            })
                        },
                    ]
                }}
            >
                <SView col={"xs-12"} height center>
                    <SView col={"xs-7"} colSquare onPressIn={() => {
                        this.inOnPress = true;
                        new SThread(700, "onLongPress", true).start(() => {
                            if (this.inOnPress) {
                                this.inOnPress = false;
                                this.props.startAnim();
                            }
                        })

                    }}
                        onPress={() => {
                            if (this.inOnPress) {
                                if (this.props.inAnim()) {
                                    return;
                                }
                                // this.props.stopAnimation();
                                SNavigation.navigate(obj.url);
                            }
                            this.inOnPress = false;

                        }} >
                        <SImage src={urlImage} style={{
                            width: "100%",
                            height: "100%",
                        }} />
                    </SView>
                    <SHr />
                    <SView center>
                        <SText center fontSize={12}>{obj.descripcion}</SText>
                    </SView>
                </SView>
            </SView>
        );
    }
}
