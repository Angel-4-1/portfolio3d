import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useControls } from 'leva'

export function Computer(props) {
    //const COMPUTER_PATH = "/computer.glb";
    const COMPUTER_PATH = "/computerFlat.glb";
    const { nodes, materials } = useGLTF(COMPUTER_PATH);
    const computer = useGLTF(COMPUTER_PATH);
    const iframeRef = useRef();

    const [isHovering, setIsHovering] = useState(false);

    const changeCamera = (x = 0) => {
        // Create the event
        var event = new CustomEvent("changeCamera", { "detail": x });
        
        // Dispatch/Trigger the event
        document.dispatchEvent(event); 
    }

    useEffect(() => {
        changeCamera(isHovering ? 1 : 0);
    }, [isHovering])

    const { position, rotation, scale } = useControls("Computer", {
        position: 
        {
            value: { x: -1.3, y: 0, z: 0 },
            step: 0.01,
        },
        rotation: 
        {
            value: { x: 0, y: 1.35, z: 0 },
            step: 0.01,
        },
        scale:
        {
            value: 0.5,
            step: 0.1
        },
    });

    const { screen_position, screen_rotation, screen_distance_factor } = useControls("Screen", {
        screen_position: 
        {
            value: { x: -0.14, y: 2.09, z: 0.03 },
            step: 0.01,
        },
        screen_rotation: 
        {
            value: { x: 0, y: -1.60, z: 0 },
            step: 0.01,
        },
        screen_distance_factor:
        {
            value: 1.6,
            step: 0.1
        },
        // color: "#ff0000",
        // visible: true,
        // wireframe: false,
        // clickMe: button( () => { console.log( "Clicked" ); } ),
        // choice: { options: [ "a", "b", "c" ] },
    });

    const STEP = 0.05;

    const updateKey = ( code, isPressed ) => {
        let node = nodes[code];
        let pos = node.position;
        pos.y += isPressed ? - STEP : STEP; 
        node.position.set( pos.x, pos.y, pos.z);
    }

    onkeydown = (event) => {
        if (event.repeat) return;

        try {
            updateKey( event.code, true );
        } catch (e) {
            console.log( e )
        }
    };

    onkeyup = (event) => {
        try {
            updateKey( event.code, false );
        } catch (e) {
            console.log( e )
        }
    }

    return <primitive
        object = { computer.scene }
        position={ [position.x, position.y, position.z] } 
        rotation={ [rotation.x, rotation.y, rotation.z] } 
        scale={ scale }
    >
        {/* Insert html on the screen of the laptop */}
        <Html
            ref={iframeRef}
            transform
            wrapperClass="htmlScreen"
            distanceFactor={ screen_distance_factor }
            position={ [ screen_position.x, screen_position.y, screen_position.z ] }
            rotation={ [ screen_rotation.x, screen_rotation.y, screen_rotation.z ] }
        >
            <iframe src="https://angel-4-1.github.io/display-projects/" 
                onPointerOver={() => setIsHovering(true)}
                onPointerOut={() => setIsHovering(false)}
            />
        </Html>
    </primitive>
}

useGLTF.preload("/computer.glb");
