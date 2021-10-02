import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/cubo.gltf')
  
  const click =(event)=>{
    event.eventObject.rotation.x +=10;
    event.eventObject.rotation.y +=10;
    console.log(event);
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        onClick={(event) => click(event)}
        geometry={nodes.cubo_1.geometry}
        material={materials['face1']}
      />
    </group>
  )
}

useGLTF.preload('/cubo.gltf')