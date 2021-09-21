import React, { Component } from 'react';
import { View } from 'react-native';
import * as THREE from 'three';

export default class Page3D extends Component {
    camera = new THREE.PerspectiveCamera();

    // Ambient Light
    light = new THREE.AmbientLight(0xFFFFFF);
  
    onContextCreate = (gl) => {
      const rngl = gl.getExtension('RN');
      const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
  
      const renderer = new THREE.WebGLRenderer({  }); // See react-native-webgl
      renderer.setClearColor(0x000000, 0); // Make the renderer transparent
  
      this.camera.width = width; // Set width and height of camera
      this.camera.height = height;
  
      const animate = () => {
        // Update camera position
        this.camera.position.setFromMatrixPosition(this.camera.matrixWorld);
  
        renderer.render(this.scene, this.camera);
        requestAnimationFrame(animate);
        
        gl.flush();
        rngl.endFrame();
      };
      animate();
    }
  
    render() {
      return (
        <View>
          <THREE.Camera
            camera={this.camera}
            ambientLight={this.light}
            style={StyleSheet.absoluteFill}
          />
          
        </View>
      );
    }
}
