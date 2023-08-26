import { 
    Float,
    Environment,
    ContactShadows,
} from '@react-three/drei'
import { Leva, useControls } from 'leva'
import { Computer } from './components/Computer';
import { CameraControls } from "./Camera";
import CustomText3D from './components/CustomText3D';

const TEXTS = {
    title: 'ANGEL',
    subtitle: 'VICENTE',
};

export default function Experience()
{
    const { bgColor, computerLight } = useControls({
        bgColor: "#5f4e4e",
        computerLight: "#805e45",
    });

    const { topTextPosition, bottomTextPosition, colorText } = useControls("Text", {
        topTextPosition: 
        {
            value: { x: 1.8, y: 0.9, z: -0.2 },
            step: 0.01,
        },
        bottomTextPosition: 
        {
            value: { x: 1.8, y: 0.05, z: -0.7 },
            step: 0.01,
        },
        colorText: "#de5050"
    });

    const { shadowsPosition, blurShadow } = useControls("Contact Shadows", {
        shadowsPosition: 
        {
            value: -1,
            step: 0.01,
        },
        blurShadow: 
        {
            value: 2.4,
            step: 0.01,
        },
    });
    
    const Scene = ({isFloatEnabled = true}) => {
        return <Float 
            rotationIntensity={ 0.2 } 
            position={[0, 0, 0]}
            speed={isFloatEnabled ? 1 : 0}
        >
            {/* Rectangle light to simulate the light emitted by the screen */}
            <rectAreaLight
                width={ 2.5 }
                height={ 1.65 }
                intensity={ 65 }
                color={ computerLight }
                rotation={ [ 0.1, Math.PI, 0 ] }
                position={ [ 0, 0.55, -1.15 ] }
            />

            <Computer />

            {/* Top text */}
            <CustomText3D
                text={TEXTS.title}
                position={[topTextPosition.x, topTextPosition.y, topTextPosition.z]}
                colorText={colorText}
            />

            {/* Bottom text */}
            <CustomText3D
                text={TEXTS.subtitle}
                position={[bottomTextPosition.x, bottomTextPosition.y, bottomTextPosition.z]}
                colorText={colorText}
            />
        </Float>
    };

    return <>
        <Leva hidden/>

        <Environment files="./studio.hdr" background blur={0.5} />

        <color args={ [bgColor] } attach="background"/>

        <CameraControls isPresentationControls={true}>
            <Scene />
        </CameraControls>
        
        <ContactShadows 
            position-y={ shadowsPosition }
            opacity={ 0.4 }
            scale={ 7 }
            blur={ blurShadow }
        />
    </>
}