import * as THREE from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { StageObject } from './class/StageObject.js'
import { STATE, ASSETS } from './global.js'

import * as DESERT_BG_PROPERTIES from './stageObjects/desertBgProperties.js'
import * as K9_TANK_PROPERTIES from './stageObjects/k9TankProperties.js'
import * as INDOOR_BG_PROPERTIES from './stageObjects/indoorBgProperties.js'

export function loadStage( sceneName ) {
  switch (sceneName) {
    case 'K9':
      const TANK_MESH = ASSETS.K9.MODEL_FILES.find( obj => { return obj.name === "k9Tank" } )
      const TANK_OBJECT = new StageObject({
        originalObject: TANK_MESH.asset.scene,
        clonedObject: TANK_MESH.asset.scene.clone(),
        objectName: 'k9Tank',
        definition: K9_TANK_PROPERTIES,
      })
      STATE.WEBGL.scene.add(TANK_OBJECT.clone)

      // TANK_OBJECT.clone.traverse((child) => {
      //   if(child.name === 'K9A1_wheel_02_lt') {
      //     console.log(STATE.UV_ANIMATED_OBJECTS.rails.mesh)
      //     STATE.UV_ANIMATED_OBJECTS.rails.mesh = child
      //   }
      // })

      // const DESERT_MESH = ASSETS.K9.MODEL_FILES.find( obj => { return obj.name === "desertBg" } )
      // const DESERT_OBJECT = new StageObject({
      //   originalObject: DESERT_MESH.asset.scene,
      //   clonedObject: DESERT_MESH.asset.scene.clone(),
      //   objectName: 'desertBg',
      //   definition: DESERT_BG_PROPERTIES,
      // })
      // STATE.WEBGL.scene.add(DESERT_OBJECT.clone)

      // DESERT_OBJECT.clone.traverse((child) => {
      //   if(child.name === 'BG_Desert_UG_UVani') {
      //     STATE.UV_ANIMATED_OBJECTS.desertFloor.mesh = child  
      //   }

      //   if(child.name === 'BG_Desert_Mountain') {
      //     STATE.ANIMATED_OBJECTS.desertMountain.mesh = child  
      //   }
      // })

      const INDOOR_MESH = ASSETS.K9.MODEL_FILES.find( obj => { return obj.name === "indoorBg" } )
      const INDOOR_OBJECT = new StageObject({
        originalObject: INDOOR_MESH.asset.scene,
        clonedObject: INDOOR_MESH.asset.scene.clone(),
        objectName: 'indoorBg',
        definition: INDOOR_BG_PROPERTIES,
      })
      STATE.WEBGL.scene.add(INDOOR_OBJECT.clone)

      
      STATE.WEBGL.cameraControls.rotateTo(THREE.MathUtils.degToRad(155), THREE.MathUtils.degToRad(80), false)

      break
  }
}

export function focusOnRegion( _region ){   
  STATE.WEBGL.cameraControls.setLookAt( 
    STATE.ZONE_FOCUS[_region].position.x,
    STATE.ZONE_FOCUS[_region].position.y,
    STATE.ZONE_FOCUS[_region].position.z,
    STATE.ZONE_FOCUS[_region].target.x,
    STATE.ZONE_FOCUS[_region].target.y,
    STATE.ZONE_FOCUS[_region].target.z,
    true 
  ).then(() => {
    if(STATE.IS_FOCUSED){
      console.log('open popup')
    }
  })
}

export function toggleStages( toggle, sceneName ) {
  let stagesObjects = STATE.WEBGL.scene.children.filter(function (obj) {return obj.name === sceneName})

  if (stagesObjects != undefined) {
    for (let stagesObject of stagesObjects) {
      toggle ? stagesObject.visible = true : stagesObject.visible = false
    }
  }
}