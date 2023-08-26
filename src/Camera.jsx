import { OrbitControls, PresentationControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import Show from "./components/Show";

const CameraControls = ({ isPresentationControls, children }) => {
  const [position, setPosition] = useState({ x: -3, y: 1.5, z: 4 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = useState({ x: 0.13, y: 0.1, z: 0 });

  const {
    camera,
    gl: { domElement },
  } = useThree();
  const ref = useRef();
  camera.up = new Vector3(0, 1, 0);

  const onChange = (idx = 0) => {
    let position = { x: -3, y: 1.5, z: 4 };
    let target = { x: 0, y: 0, z: 0 };

    if (idx === 1) {
      position = { x: -2, y: 1.25, z: 2 };
      target = { x: -1.25, y: 1.05, z: 0 };
    }

    setPosition(position);
    setTarget(target);
  };

  function cameraAnimate() {
    if (ref.current) {
      gsap.timeline().to(camera.position, {
        duration: 1,
        repeat: 0,
        x: position.x,
        y: position.y,
        z: position.z,
        ease: "power3.inOut",
      });

      gsap.timeline().to(
        ref.current.target,
        {
          duration: 1,
          repeat: 0,
          x: target.x,
          y: target.y,
          z: target.z,
          ease: "power3.inOut",
        },
        "<"
      );
    }
  }

  useEffect(() => {
    cameraAnimate();
  }, [target, position]);

  // Catch event
  document.addEventListener("changeCamera", function (e) {
    if(e.detail !== undefined && e.detail >= 0) {
        onChange(e.detail)
    }
  });

  return (
    <>
      <Show when={!isPresentationControls}>
        <>
          <OrbitControls
            ref={ref}
            args={[camera, domElement]}
            panSpeed={1}
            maxPolarAngle={Math.PI / 2}
            maxAzimuthAngle={Math.PI / 4.5}
            minAzimuthAngle={-Math.PI / 3.5}
          />
            {children}
        </>
      </Show>
      
      <Show when={isPresentationControls}>
        <>
          <OrbitControls
            ref={ref}
            args={[camera, domElement]}
            panSpeed={1}
            maxPolarAngle={Math.PI / 2}
            maxAzimuthAngle={Math.PI / 4.5}
            minAzimuthAngle={-Math.PI / 3.5}
            enableRotate={false}
          />
          <PresentationControls
            global
            rotation={ [ rotation.x, rotation.y, rotation.z ] }
            polar={ [ -0.4, 0.2 ] }                 // limit the rotation on the vertical axis
            azimuth={ [ -0.5, 0.5 ] }               // limit the rotation on the horizontal axis
            config={ { mass: 2, tension: 400 } }    // control animation when dragging the object
            snap={ { mass: 4, tension: 400 } }      // go back to the initial position when releasing the object
          >
            {children}
          </PresentationControls>
        </>
      </Show>
    </>
  );
};

export { CameraControls };
