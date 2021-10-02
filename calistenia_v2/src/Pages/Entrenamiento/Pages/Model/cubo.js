import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React, { Component } from 'react'
import * as THREE from 'three'
export default class Cubo extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    animate() {
        if (!this._ref) return;
        if (this.cubo.animations.length) {
            this.mixer = new THREE.AnimationMixer(this.cubo.scene);
            
            this.cubo.animations.map(clip => {
                const action = this.mixer.clipAction(clip)
                action.clampWhenFinished = true
                action.setLoop(THREE.LoopOnce,1)
                action.play();
            });
        }
    }

    renderer = (props) => {
        // this.cubo = scene
        // this.animate()
        useFrame((state, delta) => {
            this.mixer?.update(delta)
        })
        return null;
    }
    render() {
        useFrame
        this.cubo = useGLTF('/cubo2.gltf')
        if (!this.cubo) return;

        return <>
            <this.renderer />
            <primitive object={this.cubo.scene} ref={(ref) => { this._ref = ref }} />
        </>
    }
}
