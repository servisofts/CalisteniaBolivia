import { Suspense } from 'react'
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber'

import { connect } from 'react-redux';
import { SPage } from 'servisofts-component';
import { Environment } from '@react-three/drei'
import Model from './Model'

class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        
    }
    render() {
        return (
            <SPage title={"Entrenamientos"}>
                <Canvas>
                    {/* <mesh ref={(ref)=> this.myMesh = ref}> 
                        <boxGeometry />
                        <meshBasicMaterial color={"#ff0000"} />
                    </mesh>
                    <AnimateFrame meshRef={this.myMesh} /> */}
                    <Suspense fallback={null}>
                        {/* <Model/> */}
                        {/* <Environment preset="sunset" background /> */}
                    </Suspense>
                </Canvas>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(Lista);