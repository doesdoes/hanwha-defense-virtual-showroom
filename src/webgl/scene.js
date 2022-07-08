import * as THREE from 'three'
import {gsap} from 'gsap/all';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { StageObject } from './class/StageObject.js'
import { STATE, ASSETS } from './global.js'

import * as DESERT_BG_PROPERTIES from './stageObjects/desertBgProperties.js'
import * as K9_TANK_PROPERTIES from './stageObjects/k9TankProperties.js'
import * as INDOOR_BG_PROPERTIES from './stageObjects/indoorBgProperties.js'
import * as SNOW_BG_PROPERTIES from './stageObjects/snowBgProperties.js'

import * as REDBACK_PROPERTIES from './stageObjects/redbackProperties.js'
import * as REDBACK_INDOOR_BG_PROPERTIES from './stageObjects/redbackIndoorBgProperties.js'

import { sendGLCustomEvent } from './class/GLCustomEvent.js'

import { setLight } from './light.js';
import { createSpriteTween } from './utils.js';

export function loadStage( sceneName ) {
  switch (sceneName) {
    case 'K9':
      setLight(STATE)
      const points = [];

      const TANK_MESH = ASSETS.K9.MODEL_FILES.find( obj => { return obj.name === "k9Tank" } )
      const TANK_OBJECT = new StageObject({
        originalObject: TANK_MESH.asset.scene,
        clonedObject: TANK_MESH.asset.scene.clone(),
        objectName: 'k9Tank',
        definition: K9_TANK_PROPERTIES,
      })
      STATE.WEBGL.scene.add(TANK_OBJECT.clone)

      if(TANK_MESH.asset.animations.length > 0){
        STATE.ANIMATIONS._k9Tank.mixer = new THREE.AnimationMixer( TANK_OBJECT.clone )
        STATE.ANIMATIONS._k9Tank.mixer.clipAction( TANK_MESH.asset.animations[0] )
      }

      // [NOTE] ㅁㅔ시 visible, opacity 조정 시 여기서 캐치
      TANK_OBJECT.clone.traverse(child => {
        //console.log(child.userData)
        if (child.userData.type == 'POI') {
          // POI buttons
          const POI = new CSS2DObject( document.getElementById(child.name) )
          POI.position.copy(child.position)
          TANK_OBJECT.clone.add( POI )

          child.getWorldPosition(STATE.ZONE_FOCUS[child.name].target)          

          POI.element.addEventListener('click', function(e){
            focusOnRegion(child.name)

            STATE.IS_FOCUSED = true 
            e.preventDefault()
          })

          points.push(child)
        }
      })

      STATE.ZONE_FOCUS.reset.position = STATE.WEBGL.camera.position.clone()

      // [NOTE] 탱크 mesh/uv 애니메이션
      TANK_OBJECT.clone.traverse((child) => {
        if(child.name === 'TANK_K9A1_Track') {
          STATE.UV_ANIMATED_OBJECTS.rails.mesh = child
        }
      })

      const INDOOR_MESH = ASSETS.K9.MODEL_FILES.find( obj => { return obj.name === "k9a1IndoorBg" } )
      const INDOOR_OBJECT = new StageObject({
        originalObject: INDOOR_MESH.asset.scene,
        clonedObject: INDOOR_MESH.asset.scene.clone(),
        objectName: 'k9a1IndoorBg',
        definition: INDOOR_BG_PROPERTIES,
      })
      STATE.WEBGL.scene.add(INDOOR_OBJECT.clone)

      const SNOW_MESH = ASSETS.K9.MODEL_FILES.find( obj => { return obj.name === "snowBg" } )
      const SNOW_OBJECT = new StageObject({
        originalObject: SNOW_MESH.asset.scene,
        clonedObject: SNOW_MESH.asset.scene.clone(),
        objectName: 'snowBg',
        definition: SNOW_BG_PROPERTIES,
      })
      STATE.WEBGL.scene.add(SNOW_OBJECT.clone)
      SNOW_OBJECT.clone.visible = false

      if(SNOW_MESH.asset.animations.length > 0){
        console.log(SNOW_MESH.asset.animations)
        STATE.ANIMATIONS._SNOW.mixer = new THREE.AnimationMixer( SNOW_OBJECT.clone )
        SNOW_MESH.asset.animations.forEach(anim => {
          STATE.ANIMATIONS._SNOW.mixer.clipAction( anim )
        })
        // STATE.ANIMATIONS._DESERT.mixer.clipAction( DESERT_MESH.asset.animations[0] ).play()
      }

      // [NOTE] 맵 mesh/uv 애니메이션
      SNOW_OBJECT.clone.traverse((child) => {
        // console.log(child.name)
        // UV
        if(child.name === 'BG_Snow_Ground_UV') {
          STATE.UV_ANIMATED_OBJECTS.snowFloor.mesh = child  
        }

        if(child.name === 'Speed_Line_UV') {
          STATE.UV_ANIMATED_OBJECTS.snowSpeedLine.mesh = child
        }

        // MESH
        if(child.name === 'BG_Snow_MountainBG_Desert') {
          STATE.ANIMATED_OBJECTS.snowMountain.mesh = child  
        }

        if(child.name === 'Dirt_L_Part_Seq') {
          // STATE.UV_ANIMATED_OBJECTS.tireLine.mesh = child
          setTimeout(function() {
            const tween = createSpriteTween(child, child.material.map, 60, 1, 1500)
            tween.start()
          }, 2000)
        }
      })
      
      STATE.WEBGL.cameraControls.addEventListener('control', function() {

        points.forEach(point => {
          const d = STATE.WEBGL.camera.position.distanceTo(point.position)
          console.log(point.name, d)
          if(d < 5.33) {
            gsap.to(`#${point.name}`, {autoAlpha: 1, duration: 1})
          } else {
            gsap.to(`#${point.name}`, {autoAlpha: 0, duration: 1})
          }
        })
      })

      break

    case 'REDBACK':
      setLight(STATE)

      const REDBACK_MESH = ASSETS.REDBACK.MODEL_FILES.find( obj => { return obj.name === "redback" } )
      const REDBACK_OBJECT = new StageObject({
        originalObject: REDBACK_MESH.asset.scene,
        clonedObject: REDBACK_MESH.asset.scene.clone(),
        objectName: 'redback',
        definition: REDBACK_PROPERTIES,
      })
      STATE.WEBGL.scene.add(REDBACK_OBJECT.clone)

      if(REDBACK_MESH.asset.animations.length > 0){
        STATE.ANIMATIONS._REDBACK.mixer = new THREE.AnimationMixer( REDBACK_OBJECT.clone )
        STATE.ANIMATIONS._REDBACK.mixer.clipAction( REDBACK_MESH.asset.animations[0] )
      }

      // [NOTE] ㅁㅔ시 visible, opacity 조정 시 여기서 캐치
      REDBACK_OBJECT.clone.traverse(child => {
        console.log(child.name)

        if(child.name === 'TANK_REDBACK_Track') {
          STATE.UV_ANIMATED_OBJECTS.redbackRails.mesh = child
        }

        //console.log(child.userData)
        if (child.userData.type == 'POI') {
          // POI buttons
          const POI = new CSS2DObject( document.getElementById(child.name) )
          POI.position.copy(child.position)
          REDBACK_OBJECT.clone.add( POI )

          child.getWorldPosition(STATE.ZONE_FOCUS[child.name].target)          

          POI.element.addEventListener('click', function(e){
            focusOnRegion(child.name)

            STATE.IS_FOCUSED = true 
            e.preventDefault()
          })
        }
      })

      STATE.ZONE_FOCUS.reset.position = STATE.WEBGL.camera.position.clone()

      // REDBACK INDOOR
      const REDBACK_INDOOR_MESH = ASSETS.REDBACK.MODEL_FILES.find( obj => { return obj.name === "redbackIndoorBg" } )
      const REDBACK_INDOOR_OBJECT = new StageObject({
        originalObject: REDBACK_INDOOR_MESH.asset.scene,
        clonedObject: REDBACK_INDOOR_MESH.asset.scene.clone(),
        objectName: 'redbackIndoorBg',
        definition: REDBACK_INDOOR_BG_PROPERTIES,
      })
      STATE.WEBGL.scene.add(REDBACK_INDOOR_OBJECT.clone)

      const DESERT_MESH = ASSETS.REDBACK.MODEL_FILES.find( obj => { return obj.name === "desertBg" } )
      const DESERT_OBJECT = new StageObject({
        originalObject: DESERT_MESH.asset.scene,
        clonedObject: DESERT_MESH.asset.scene.clone(),
        objectName: 'desertBg',
        definition: DESERT_BG_PROPERTIES,
      })
      STATE.WEBGL.scene.add(DESERT_OBJECT.clone)
      DESERT_OBJECT.clone.visible = false

      if(DESERT_MESH.asset.animations.length > 0){
        console.log(DESERT_MESH.asset.animations)
        STATE.ANIMATIONS._DESERT.mixer = new THREE.AnimationMixer( DESERT_OBJECT.clone )
        DESERT_MESH.asset.animations.forEach(anim => {
          STATE.ANIMATIONS._DESERT.mixer.clipAction( anim )
        })
        // STATE.ANIMATIONS._DESERT.mixer.clipAction( DESERT_MESH.asset.animations[0] ).play()
      }

      // [NOTE] 맵 mesh/uv 애니메이션
      DESERT_OBJECT.clone.traverse((child) => {
        console.log(child.name)
        // UV
        if(child.name === 'BG_DesertGround_UV') {
          STATE.UV_ANIMATED_OBJECTS.desertFloor.mesh = child  
        }

        if(child.name === 'Speed_Line_UV') {
          STATE.UV_ANIMATED_OBJECTS.speedLine.mesh = child
        }

        if(child.name === 'Tire_Line_UV') {
          STATE.UV_ANIMATED_OBJECTS.tireLine.mesh = child
        }

        if(child.name === 'Dirt_L_Part_Seq') {
          setTimeout(function() {
            const tween = createSpriteTween(child, child.material.map, 60, 1, 1500)
            tween.start()
          }, 2000)
        }

        // MESH
        if(child.name === 'BG_Desert_Mountain') {
          STATE.ANIMATED_OBJECTS.desertMountain.mesh = child
        }
      })
      break
  }

  /// UI [FIXME] 현재 2번 바인딩 됨..
  document.querySelectorAll('.btn-close').forEach(btnClose => {
    btnClose.addEventListener('click', function(e) {
      focusOnRegion('reset')
      // const $popup = document.querySelector('#point-popup')
      const $popup = this.closest('.poi-popup')
      gsap.to($popup, { autoAlpha: 0, duration: 0.5 })
      e.preventDefault()
      STATE.IS_FOCUSED = false
    })
  })

  document.querySelectorAll('.parts .part').forEach(part => {
    part.addEventListener('click', function() {
      const feature = this.getAttribute('data-feature')
      focusOnRegion(feature)
      STATE.IS_FOCUSED = true 
    })
  })
}

export function focusOnRegion( _region ){
  // console.log(window.UI.$currentPopup)
  if(window.UI.$currentPopup) {
    gsap.killTweensOf(window.UI.$currentPopup)
    gsap.to(window.UI.$currentPopup, { autoAlpha: 0, duration: 0.3 })
  }

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
      sendGLCustomEvent({msg: _region})
    }
  })
}

export function toggleStages( toggle, sceneName ) {
  let stagesObjects = STATE.WEBGL.scene.children.filter(function (obj) {return obj.sceneName === sceneName})
  if (stagesObjects != undefined) {
    for (let stagesObject of stagesObjects) {
      toggle ? stagesObject.visible = true : stagesObject.visible = false
    }
  }
}