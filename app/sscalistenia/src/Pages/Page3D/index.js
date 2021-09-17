import React, { Component, useRef, useState  } from 'react'
import { Text, View } from 'react-native'
import { Canvas, useFrame } from '@react-three/fiber'

export default class Page3D extends Component {
    render() {
        return (
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
            </Canvas>
          );
    }
}
