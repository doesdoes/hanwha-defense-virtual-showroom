import * as THREE from 'three'
import { STATE } from './global.js'

// parallax effect on mouse hover
export function parallax(_delta){
  const [ xMul, yMul, lerpFactor ] = [ 4, 4, 0.01 ]

  const { mouse, cameraControls, ACTIVE_FOCUS } = STATE.WEBGL

  const targetX = THREE.MathUtils.lerp(STATE.ZONE_FOCUS[ACTIVE_FOCUS].position.x, - mouse.x * (xMul * STATE.ZONE_FOCUS[ACTIVE_FOCUS].position.z), lerpFactor)
  const targetY = THREE.MathUtils.lerp(STATE.ZONE_FOCUS[ACTIVE_FOCUS].position.y, - mouse.y * (yMul * STATE.ZONE_FOCUS[ACTIVE_FOCUS].position.z), lerpFactor)

  cameraControls.setPosition( targetX, targetY, STATE.ZONE_FOCUS[ACTIVE_FOCUS].position.z, true )
}
