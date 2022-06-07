import React, { Component, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import { connect } from 'react-redux';
import { SButtom, SPage, SView } from 'servisofts-component';
import { Environment } from '@react-three/drei'
import Cubo from './Model/cubo';


class Human extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }
    render() {
        return (
            <SPage title={"Human"}>
                <Canvas>
                    <Suspense fallback={null}>
                        <Cubo ref={(ref) => { this.cubo = ref }} />
                        <Environment preset="sunset" background />
                    </Suspense>
                </Canvas>
                <SView style={{
                    position: 'absolute',
                    top: 0,

                }} col={"xs-11"}>
                    <SButtom props={{
                        type:"danger"
                    }} onPress={()=>{
                        if(this.cubo){
                            this.cubo.animate();
                        }
                    }}>Animate</SButtom>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Human);