import React, { Component } from 'react';
import { SHr, SIcon, SText, STheme, SView, SImage } from 'servisofts-component';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    effect1(moving){
 if (!this.state.layout) return null;
        var h = this.state.layout.width / 10.46
        return <SView col={"xs-12"} height={h} style={{
            // position: "absolute",
            bottom: moving,
            zIndex: 1
        }}>
            <SIcon name='Effect1'  fill={STheme.color.primary}/>
            </SView>
    }

    render() {
        return (<>
        <SView col={"xs-12"} flex center >
            <SView col={"xs-12 sm-10 md-8 lg-6 xl-4 xxl-4"} row height={150} backgroundColor={STheme.color.primary}  center
            onLayout={(evt) => {
                this.setState({ layout: evt.nativeEvent.layout })
            }}
            >
                <SImage src={require('../../../Assets/img/portada2.jpg')} width={"100%"} height={"100%"}
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
