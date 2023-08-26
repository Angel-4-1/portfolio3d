import { Text3D } from '@react-three/drei';

const CustomText3D = ({text, position, colorText}) => {
  const SCALE = 0.5;
  return <Text3D font={'./fugaz.json'}
    bevelEnabled 
    bevelSize={0.05}
    scale={ [ SCALE, SCALE, SCALE ] }
    position={ position }
    rotation-y={ -1.25 }
    maxWidth={ 2 }
    textAlign="center"
  >
    {text}
    <meshStandardMaterial color={ colorText }/>
  </Text3D>
}

export default CustomText3D;

