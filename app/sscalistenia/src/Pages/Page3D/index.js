import * as THREE from 'three';
import ReactDOM from 'react-dom';
import React, { useEffect, useRef } from 'react';
import { Canvas, useRender } from 'react-three-fiber';
import Scene from './Scene';
import useModel from './helpers/useModel';
import './styles.css';

const Bird = () => {
    const { scene, geometries, center, animations } = useModel('/Stork.glb');
    const clock = useRef(new THREE.Clock());
    const mixer = useRef();
  
    useEffect(() => {
      mixer.current = new THREE.AnimationMixer(scene);
      const action = mixer.current.clipAction(animations[0]);
      action.play();
    }, [animations, scene]);
  
    useRender(state => {
      if (mixer.current) {
        const delta = clock.current.getDelta();
        mixer.current.update(delta);
        //console.log(mixer.current.time)
      }
      state.camera.rotation.z -= 0.005;
    });
    return geometries.map(geom => <mesh key={geom.uuid} position={center} geometry={geom} castShadow receiveShadow />);
  };
export default class Page3D extends Component {
    static navigationOptions = {
        header: null
    }

    

    render() {
        return (
            <>
              <Canvas
                //invalidateFrameloop
                camera={{ position: [0, 0, 10], fov: 65 }}
                onCreated={({ gl, scene }) => {
                  scene.background = new THREE.Color('lightblue');
                  gl.shadowMap.enabled = true;
                  gl.shadowMap.type = THREE.PCFSoftShadowMap;
                }}>
                <Scene>
                  <Bird />
                </Scene>
              </Canvas>
            </>
          );
    }
}
