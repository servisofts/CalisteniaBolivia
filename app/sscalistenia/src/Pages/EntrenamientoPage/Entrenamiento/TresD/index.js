import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppParams from '../../../../Params';
import { SText, SView } from '../../../../SComponent';
import { Canvas, useFrame } from '@react-three/fiber'
  

class TresD extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    Box(props) {
        // This reference will give us direct access to the THREE.Mesh object
        const ref = useRef()
        // Set up state for the hovered and active state
        const [hovered, setHover] = useState(false)
        const [active, setActive] = useState(false)
        // Subscribe this component to the render-loop, rotate the mesh every frame
        useFrame((state, delta) => (ref.current.rotation.x += 0.01))
        // Return the view, these are regular Threejs elements expressed in JSX
        return (
          <mesh
            {...props}
            ref={ref}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
          </mesh>
        )
    }

    getObjeto3d() {
        return (
            <SView col={"xs-12"}>
                <Canvas>
                    <ambientLight color={"#FFF"} intensity={100}/>
                    <pointLight position={[10, 10, 10]} />
                </Canvas>
            </SView>
        )
    }
    
    render() {
        return (
            <SView col={"xs-12"}>
                <SView height={8} />
                <SText color={"#999"}>Objetio 3d</SText>
                <SView height={4} />
                <SView col={"xs-12"}>
                    {this.getObjeto3d()}
                </SView>
            </SView>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(TresD);