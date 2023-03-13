import * as THREE from 'three'
import {gsap} from 'gsap/all';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { StageObject } from './class/StageObject.js'
import { STATE, ASSETS } from './global.js'
import CameraControls from 'camera-controls'

import * as DESERT_BG_PROPERTIES from './stageObjects/desertBgProperties.js'
import * as K9_TANK_PROPERTIES from './stageObjects/k9TankProperties.js'
import * as INDOOR_BG_PROPERTIES from './stageObjects/indoorBgProperties.js'
import * as SNOW_BG_PROPERTIES from './stageObjects/snowBgProperties.js'

import * as REDBACK_PROPERTIES from './stageObjects/redbackProperties.js'
import * as REDBACK_INDOOR_BG_PROPERTIES from './stageObjects/redbackIndoorBgProperties.js'

import * as KSLV_PROPERTIES from './stageObjects/KSLVProperties.js'

import { sendGLCustomEvent } from './class/GLCustomEvent.js'

import { setLight, setHemisphereLightSnowDefault, setHemisphereLightDesertDefault } from './light.js'
import { createSpriteTween } from './utils.js'
import UILoadingManager from './class/UILoadingManager.js'

const md = new MobileDetect(window.navigator.userAgent)
const isMobile = md.mobile()

export function loadStage( sceneName, callback ) {
  const uiLoadingManager = new UILoadingManager()

  switch (sceneName) {
    case 'K9A1':
      setLight(STATE)
      setHemisphereLightSnowDefault(STATE)
      const k9Points = [];
      let spriteObjectDust, spriteObjectWind, spriteObjectTrackSkid = null

      const TANK_MESH = ASSETS.K9A1.MODEL_FILES.find( obj => { return obj.name === "k9Tank" } )
      const TANK_OBJECT = new StageObject({
        originalObject: TANK_MESH.asset.scene,
        clonedObject: TANK_MESH.asset.scene.clone(),
        objectName: 'k9Tank',
        definition: K9_TANK_PROPERTIES,
      })
      STATE.WEBGL.scene.add(TANK_OBJECT.clone)

      if(TANK_MESH.asset.animations.length > 0){
        STATE.ANIMATIONS._k9Tank.mixer = new THREE.AnimationMixer( TANK_OBJECT.clone )
        TANK_MESH.asset.animations.forEach(anim => {
          STATE.ANIMATIONS._k9Tank.mixer.clipAction( anim )
        })
      }

      // [NOTE] ㅁㅔ시 visible, opacity 조정 시 여기서 캐치
      TANK_OBJECT.clone.traverse(child => {
        // console.log(child.name)
        setSobelFocus(child)

        if (child.userData.type == 'POI') {
          // POI buttons
          const POI = new CSS2DObject( document.getElementById(child.name) )
          POI.position.copy(child.position)
          TANK_OBJECT.clone.add( POI )

          child.getWorldPosition(STATE.ZONE_FOCUS[child.name].target)
          STATE.ZONE_FOCUS[child.name].targetOffset && STATE.ZONE_FOCUS[child.name].target.add(STATE.ZONE_FOCUS[child.name].targetOffset)
          
          POI.element.addEventListener('click', function(e){
            STATE.IS_FOCUSED = true 
            focusOnRegion(child.name)
            e.preventDefault()
          })

          k9Points.push(child)
        }
      })

      const INDOOR_MESH = ASSETS.K9A1.MODEL_FILES.find( obj => { return obj.name === "k9a1IndoorBg" } )
      const INDOOR_OBJECT = new StageObject({
        originalObject: INDOOR_MESH.asset.scene,
        clonedObject: INDOOR_MESH.asset.scene.clone(),
        objectName: 'k9a1IndoorBg',
        definition: INDOOR_BG_PROPERTIES,
      })
      STATE.WEBGL.scene.add(INDOOR_OBJECT.clone)

      const SNOW_MESH = ASSETS.K9A1.MODEL_FILES.find( obj => { return obj.name === "snowBg" } )
      const SNOW_OBJECT = new StageObject({
        originalObject: SNOW_MESH.asset.scene,
        clonedObject: SNOW_MESH.asset.scene.clone(),
        objectName: 'snowBg',
        definition: SNOW_BG_PROPERTIES,
      })
      STATE.WEBGL.scene.add(SNOW_OBJECT.clone)
      SNOW_OBJECT.clone.visible = false

      if(SNOW_MESH.asset.animations.length > 0){
        STATE.ANIMATIONS._SNOW.mixer = new THREE.AnimationMixer( SNOW_OBJECT.clone )
        SNOW_MESH.asset.animations.forEach(anim => {
          STATE.ANIMATIONS._SNOW.mixer.clipAction( anim )
        })
        // STATE.ANIMATIONS._DESERT.mixer.clipAction( DESERT_MESH.asset.animations[0] ).play()
      }

      // [NOTE] 맵 mesh/uv 애니메이션
      SNOW_OBJECT.clone.traverse((child) => {
        // UV
        if(child.name === 'BG_Snow_Ground_UVAni') {
          STATE.UV_ANIMATED_OBJECTS.snowFloor.mesh = child  
        }

        if(child.name === 'BG_SpeedLine_UVAni') {
          spriteObjectWind = child
        }

        if(child.name === 'BG_Snow_Tree_Far_LoopAni'
        || child.name === 'BG_Snow_Tree_Near_LoopAni'
        || child.name === 'Snow_Rock_Part01'
        || child.name === 'Snow_Rock_Part02'
        || child.name === 'BG_Snow_Tree_Near_Shadow_LoopAni') {
          child.visible = false
        }
      })

      // [NOTE] 탱크 mesh/uv 애니메이션
      TANK_OBJECT.clone.traverse((child) => {
        if(child.name === 'Track_LT_UVAni') {
          STATE.UV_ANIMATED_OBJECTS.rails.mesh = child
        }

        if(child.name === 'BG_Snow_TrackSkid_UVAni') {
          child.visible = false
          spriteObjectTrackSkid = child
        }

        if(child.name === 'BG_Snow_Dust_SEQAni') {
          child.visible = false
          spriteObjectDust = child
        }
      })

      setUI(sceneName, k9Points)

      uiLoadingManager.waitTextures(function() {
        const tween = createSpriteTween(spriteObjectDust, spriteObjectDust.material.alphaMap, 60, 1, 1500)
        tween.start()

        const tweenWind = createSpriteTween(spriteObjectWind, spriteObjectWind.material.alphaMap, 76, 1, 2000)
        tweenWind.start()

        const tweenTrackSkid = createSpriteTween(spriteObjectTrackSkid, spriteObjectTrackSkid.material.alphaMap, 11, 1, 100)
        tweenTrackSkid.start()

        callback && callback()
      })

      break

    case 'REDBACK':
      setLight(STATE)
      setHemisphereLightDesertDefault(STATE)
      const redbackPoints = []
      let spriteDesertDust, spriteDesertWind, spriteDesertTrackSkid = null

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
        REDBACK_MESH.asset.animations.forEach(anim => {
          STATE.ANIMATIONS._REDBACK.mixer.clipAction( anim )
        })
      }

      // [NOTE] ㅁㅔ시 visible, opacity 조정 시 여기서 캐치
      REDBACK_OBJECT.clone.traverse(child => {
        // console.log(child.name)
        setSobelFocus(child)

        //console.log(child.userData)
        if (child.userData.type == 'POI') {
          // POI buttons
          const POI = new CSS2DObject( document.getElementById(child.name) )
          POI.position.copy(child.position)
          REDBACK_OBJECT.clone.add( POI )

          child.getWorldPosition(STATE.ZONE_FOCUS[child.name].target)
          STATE.ZONE_FOCUS[child.name].targetOffset && STATE.ZONE_FOCUS[child.name].target.add(STATE.ZONE_FOCUS[child.name].targetOffset)

          POI.element.addEventListener('click', function(e){
            STATE.IS_FOCUSED = true 
            focusOnRegion(child.name)
            e.preventDefault()
          })

          redbackPoints.push(child)
        }
      })

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
        // console.log(DESERT_MESH.asset.animations)
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
        if(child.name === 'BG_Desert_Ground_UVAni') {
          STATE.UV_ANIMATED_OBJECTS.desertFloor.mesh = child  
        }

        if(child.name === 'BG_SpeedLine_UVAni') {
          // STATE.UV_ANIMATED_OBJECTS.desertSpeedLine.mesh = child
          spriteDesertWind = child
        }

        if(child.name === 'Tire_Line_UV') {
          STATE.UV_ANIMATED_OBJECTS.tireLine.mesh = child
        }

        if(child.name === 'BG_Cloud_UVAni') {
          child.visible = false
        }

        // MESH
        
      })

      REDBACK_OBJECT.clone.traverse(child => {

        if(child.name === 'TANK_REDBACK_Track') {
          STATE.UV_ANIMATED_OBJECTS.redbackRails.mesh = child
        }

        if(child.name === 'BG_Desert_TrackSkid_SEQAni') {
          child.visible = false
          spriteDesertTrackSkid = child
        }

        if(child.name === 'BG_Desert_Dust_SEQAni') {
          child.visible = false
          spriteDesertDust = child
        }
      })

      setUI(sceneName, redbackPoints)

      uiLoadingManager.waitTextures(function() {
        const tween = createSpriteTween(spriteDesertDust, spriteDesertDust.material.alphaMap, 60, 1, 1500)
        tween.start()

        const tweenWind = createSpriteTween(spriteDesertWind, spriteDesertWind.material.alphaMap, 76, 1, 2000)
        tweenWind.start()

        const tweenTrackSkid = createSpriteTween(spriteDesertTrackSkid, spriteDesertTrackSkid.material.alphaMap, 11, 1, 100)
        tweenTrackSkid.start()
        
        callback && callback()
      })

      break

    case 'KSLV':
      const kslvPoints = []

      //setLight(STATE)

      STATE.WEBGL.cameraControls.mouseButtons.wheel = CameraControls.ACTION.DOLLY
      STATE.WEBGL.cameraControls.minPolarAngle = THREE.MathUtils.degToRad(0)
      STATE.WEBGL.cameraControls.maxPolarAngle = THREE.MathUtils.degToRad(180)
      
      const HDR_TEST = STATE.WEBGL.pmremGenerator.fromEquirectangular(ASSETS.KSLV.HDR_FILES.find( obj => { return obj.name === "test" } ).asset)
      STATE.WEBGL.scene.environment = HDR_TEST.texture
      STATE.WEBGL.renderer.outputEncoding = THREE.sRGBEncoding
      STATE.WEBGL.renderer.toneMapping = THREE.ACESFilmicToneMapping
      STATE.WEBGL.renderer.toneMappingExposure = 2.0

      const KSLV_MESH = ASSETS.KSLV.MODEL_FILES.find( obj => { return obj.name === "kslv" } )
      const KSLV_OBJECT = new StageObject({
        originalObject: KSLV_MESH.asset.scene,
        clonedObject: KSLV_MESH.asset.scene.clone(),
        objectName: 'kslv',
        definition: KSLV_PROPERTIES,
      })
      KSLV_OBJECT.clone.position.y = -20
      KSLV_OBJECT.clone.traverse(child => {
        setSobelFocus(child)

        if (child.userData.type == 'POI') {
          // POI buttons          
          const POI = new CSS2DObject( document.getElementById(child.name) )
          POI.position.copy(child.position)
          KSLV_OBJECT.clone.add( POI )

          child.getWorldPosition(STATE.ZONE_FOCUS[child.name].target)
          STATE.ZONE_FOCUS[child.name].targetOffset && STATE.ZONE_FOCUS[child.name].target.add(STATE.ZONE_FOCUS[child.name].targetOffset)
          
          POI.element.addEventListener('click', function(e){
            STATE.IS_FOCUSED = true 
            focusOnRegion(child.name)
            e.preventDefault()
          })

          kslvPoints.push(child)
        }
      })

      STATE.WEBGL.scene.add(KSLV_OBJECT.clone)

      const KSLV_DOME_MESH = ASSETS.KSLV.MODEL_FILES.find( obj => { return obj.name === "kslvDome" } )
      KSLV_DOME_MESH.asset.scene.traverse((child) => {
        if(child.name === 'atmosphere') {
          child.material.alphaMap = child.material.map
          child.material.transparent = true
          child.material.blending = 2
        }
      })
      
      STATE.WEBGL.scene.add(KSLV_DOME_MESH.asset.scene)

      const CAMERA_ANIM = ASSETS.KSLV.MODEL_FILES.find( obj => { return obj.name === "camera" } )

      setTimeout(() => {
        //focusOnRegion('kslvOrigin')
      }, 2000)

      if(CAMERA_ANIM.asset.animations.length > 0){
        STATE.ANIMATIONS._KSLV_CAMERA.mixer = new THREE.AnimationMixer( STATE.WEBGL.camera )
        CAMERA_ANIM.asset.animations.forEach(anim => {
          STATE.ANIMATIONS._KSLV_CAMERA.mixer.clipAction( anim )
        })

        //console.log(CAMERA_ANIM.asset.animations[0])
        //STATE.WEBGL.cameraControls.enabled = false

        setTimeout(() => {
          //STATE.ANIMATIONS._KSLV_CAMERA.mixer.clipAction( CAMERA_ANIM.asset.animations[0] ).play()
        }, 5000)
        //STATE.ANIMATIONS._KSLV_CAMERA.mixer.clipAction( CAMERA_ANIM.asset.animations[0] ).play()
      }

      setUI(sceneName, kslvPoints)

      callback && callback()
      break
  }
}

function setSobelFocus(mesh) {
  // console.log(mesh.name, mesh)
  switch (mesh.name) {

    // K9A1
    case 'Joint_TANK_K9A1_Head_Cannon_01':
      STATE.ZONE_FOCUS['longerFiringRange'].sobelObj = mesh
      break;
    case 'TANK_K9A1_Wheel_04_LT':
      STATE.ZONE_FOCUS['highMobility'].sobelObj = mesh
      break;
    
    // REDBACK
    case 'TANK_REDBACK_Cannon1':
      STATE.ZONE_FOCUS['mainArmamentSystem'].sobelObj = mesh
      break;
    case 'TANK_REDBACK_Body1':
      STATE.ZONE_FOCUS['bestMobility'].sobelObj = mesh
      STATE.ZONE_FOCUS['superiorProtection'].sobelObj = mesh
      break;
    case 'TANK_REDBACK_Track':
      STATE.ZONE_FOCUS['isuRubberTrack'].sobelObj = mesh
      break;
    default:
      break;
  }
}

function setUI(sceneName, points) {
  
  updatePointVisible(points)
  requestAnimationFrame(updatePoint)
  function updatePoint() {
    requestAnimationFrame(updatePoint)
    updatePointVisible(points)
  }

  document.querySelectorAll(`.popup-container[data-item="${sceneName}"] .btn-close`).forEach(btnClose => {
    btnClose.addEventListener('click', function(e) {
      focusOnRegion('reset')
      // const $popup = document.querySelector('#point-popup')
      const $popup = this.closest('.poi-popup')
      gsap.to($popup, { autoAlpha: 0, duration: 0.5 })
      e.preventDefault()
      STATE.IS_FOCUSED = false
    })
  })
}

function updatePointVisible(points) {
  points.forEach(point => {
    const d = STATE.WEBGL.camera.position.distanceTo(point.position)
    const state = document.body.getAttribute('data-state')
    const focus = document.body.getAttribute('data-focus')

    if(focus) {
      if(point.name === focus) {
        gsap.to(`#${point.name}`, {autoAlpha: 1, duration: 1})
      } else {
        gsap.to(`#${point.name}`, {autoAlpha: 0, duration: 1})
      }
    } else {

      let offset
      if(state === 'K9A1')
        offset = isMobile ? 10.7 : 4.9
      else if(state === 'REDBACK')
        offset = isMobile ? 8.7 : 3.7
      else 
        return

      // console.log(point.name, d, offset)

      if(d < offset) {
        gsap.to(`#${point.name}`, {autoAlpha: 1, duration: 1})
      } else {
        gsap.to(`#${point.name}`, {autoAlpha: 0, duration: 1})
      }
    }
  })
}

export function focusOnRegion( _region ) {  
  // console.log(STATE.ZONE_FOCUS.reset.position)
  if(window.UI.$currentPopup) {
    gsap.killTweensOf(window.UI.$currentPopup)
    gsap.to(window.UI.$currentPopup, { autoAlpha: 0, duration: 0.3 })
  }

  // [NOTE] FOR SOBEL EFFECT
  // STATE.WEBGL.sobelRenderPass.scene = STATE.ZONE_FOCUS[_region].sobelObj

  // console.log(_region, STATE.IS_FOCUSED)
  if(STATE.IS_FOCUSED && _region !== 'reset'){
    document.body.setAttribute('data-focus', _region)
    
    STATE.WEBGL.cameraControls.minAzimuthAngle = STATE.ZONE_FOCUS[_region].minAzimuth
    STATE.WEBGL.cameraControls.maxAzimuthAngle = STATE.ZONE_FOCUS[_region].maxAzimuth
  } else {
    document.body.setAttribute('data-focus', '')
    STATE.WEBGL.cameraControls.minAzimuthAngle = -Infinity
    STATE.WEBGL.cameraControls.maxAzimuthAngle = Infinity
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

    if(STATE.IS_FOCUSED) {
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

  setTimeout(function() {
    focusOnRegion('reset')
  }, 60)
}