import React, { Component } from 'react';
import { SHr, SIcon, SText, STheme, SView, SImage } from 'servisofts-component';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (<>
            <SView col={"xs-12"} row height={"20%"} backgroundColor={STheme.color.primary}  >
                <SImage src={require('../../../Assets/img/portada2.jpg')} width={"100%"} height={"100%"}
                    style={{
                        resizeMode: 'cover',
                    }}
                />
            </SView>
            <SHr height={20}/>
            <SView col={"xs-12"} row height={140} backgroundColor={STheme.color.primary}  >
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
        </>
        );
    }
}
