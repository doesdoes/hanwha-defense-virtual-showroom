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

import { setLight, setHemisphereLightSnowDefault, setHemisphereLightDesertDefault } from './light.js'
import { createSpriteTween } from './utils.js'
import UILoadingManager from './class/UILoadingManager.js'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader.js';

let sobelRenderPass;
let focusObject = new THREE.Mesh();
let longerFiringRange;
let head;
let track;

export function loadStage( sceneName, callback ) {
  const uiLoadingManager = new UILoadingManager()

  let glowScene;
  glowScene = new THREE.Scene()
  const sobelLayer = new THREE.Layers();
  sobelLayer.set(glowScene);

  switch (sceneName) {
    case 'K9A1':
      setLight(STATE)
      setHemisphereLightSnowDefault(STATE)
      const k9Points = [];

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

      // glowScene.add(TANK_OBJECT.clone)
      
    
      // [NOTE] ㅁㅔ시 visible, opacity 조정 시 여기서 캐치
      TANK_OBJECT.clone.traverse(child => {
        // console.log(child.name)
        if(child.name === 'Joint_TANK_K9A1_Head_Cannon_01') {
          longerFiringRange = child
        }

        if(child.name === 'TANK_K9A1_Head') {
          head = child
        }

        if(child.name === 'TANK_K9A1_Wheel_04_LT') {
          track = child
        }

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

      // [TODO] 카메라 시점 변경 후 다른 씬으로 가면 초기화가 틀어지는데 글로벌 기준 변수를 둘 것
      // STATE.ZONE_FOCUS.reset.position = STATE.WEBGL.camera.position.clone()

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
        console.log(child.name)
        // UV
        if(child.name === 'BG_Snow_Ground_UVAni') {
          STATE.UV_ANIMATED_OBJECTS.snowFloor.mesh = child  
        }

        if(child.name === 'BG_SpeedLine_UVAni') {
          STATE.UV_ANIMATED_OBJECTS.snowSpeedLine.mesh = child
        }

        if(child.name === 'BG_Snow_Mountain_UVAni') {
          STATE.UV_ANIMATED_OBJECTS.snowMountain.mesh = child
        }

        if(child.name === 'BG_Snow_Tree_Far_LoopAni') {
          child.visible = false
        }
      })

      // [NOTE] 탱크 mesh/uv 애니메이션
      TANK_OBJECT.clone.traverse((child) => {
        console.log(child.name)
        if(child.name === 'TANK_K9A1_Track_UVAni') {
          STATE.UV_ANIMATED_OBJECTS.rails.mesh = child
        }

        if(child.name === 'BG_Snow_TrackSkid_UVAni') {
          STATE.UV_ANIMATED_OBJECTS.tireLine.mesh = child
          child.visible = false
        }

        if(child.name === 'BG_Snow_Dust_SEQAni') {
          child.visible = false
          uiLoadingManager.waitTextures(function() {
            const tween = createSpriteTween(child, child.material.alphaMap, 60, 1, 1500)
            tween.start()
            callback && callback()
          })
        }
      })

      STATE.WEBGL.sobelComposer = new EffectComposer( STATE.WEBGL.renderer );
      STATE.WEBGL.finalComposer = new EffectComposer( STATE.WEBGL.renderer );

      STATE.WEBGL.sobelComposer.renderToScreen = false;

      // base model
      const renderScene = new RenderPass( STATE.WEBGL.scene, STATE.WEBGL.camera );
      STATE.WEBGL.sobelComposer.addPass( renderScene );

      sobelRenderPass = new RenderPass( focusObject, STATE.WEBGL.camera );
      STATE.WEBGL.sobelComposer.addPass( sobelRenderPass);

      // color to grayscale conversion
      const effectGrayScale = new ShaderPass( LuminosityShader );
      STATE.WEBGL.sobelComposer.addPass( effectGrayScale );

      // Sobel operator
      const effectSobel = new ShaderPass( SobelOperatorShader );
      effectSobel.uniforms[ 'resolution' ].value.x = window.innerWidth * window.devicePixelRatio;
      effectSobel.uniforms[ 'resolution' ].value.y = window.innerHeight * window.devicePixelRatio;
      STATE.WEBGL.sobelComposer.addPass( effectSobel );

      const finalPass = new ShaderPass(
        new THREE.ShaderMaterial({
          uniforms: {
            baseTexture: { value: null },
            sobelTexture: { value: STATE.WEBGL.sobelComposer.renderTarget2.texture }
          },
          vertexShader: document.getElementById('vertexshader').textContent,
          fragmentShader: document.getElementById('fragmentshader').textContent,
          defines: {}
        }), 'baseTexture'
      )
      // finalPass.needsSwap = true;

      STATE.WEBGL.finalComposer.addPass( renderScene );
      STATE.WEBGL.finalComposer.addPass( finalPass );

      setUI(sceneName, k9Points)
      break

    case 'REDBACK':
      setLight(STATE)
      setHemisphereLightDesertDefault(STATE)
      const redbackPoints = []

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

      // [TODO] 카메라 시점 변경 후 다른 씬으로 가면 초기화가 틀어지는데 글로벌 기준 변수를 둘 것
      // STATE.ZONE_FOCUS.reset.position = STATE.WEBGL.camera.position.clone()

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
          STATE.UV_ANIMATED_OBJECTS.desertSpeedLine.mesh = child
        }

        if(child.name === 'Tire_Line_UV') {
          STATE.UV_ANIMATED_OBJECTS.tireLine.mesh = child
        }

        if(child.name === 'BG_Desert_Mountain_UVAni') {
          STATE.UV_ANIMATED_OBJECTS.desertMountain.mesh = child
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

        if(child.name === 'BG_Desert_TrackSkid_UVAni') {
          STATE.UV_ANIMATED_OBJECTS.redbackTireLine.mesh = child
          child.visible = false
        }

        if(child.name === 'BG_Desert_Dust_SEQAni') {
          child.visible = false
          uiLoadingManager.waitTextures(function() {
            const tween = createSpriteTween(child, child.material.alphaMap, 60, 1, 1500)
            tween.start()
            
            callback && callback()
          })
        }
      })

      setUI(sceneName, redbackPoints)
      break
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

    // console.log(point.name, d, offset)
    if(focus) {
      if(point.name === focus) {
        gsap.to(`#${point.name}`, {autoAlpha: 1, duration: 1})
      } else {
        gsap.to(`#${point.name}`, {autoAlpha: 0, duration: 1})
      }
    } else {

      let offset
      if(state === 'K9A1')
        offset = 4.9
      else if(state === 'REDBACK')
        offset = 3.7
      else 
        return

      if(d < offset) {
        gsap.to(`#${point.name}`, {autoAlpha: 1, duration: 1})
      } else {
        gsap.to(`#${point.name}`, {autoAlpha: 0, duration: 1})
      }
    }
  })
}

export function focusOnRegion( _region ){
  // console.log(STATE.ZONE_FOCUS.reset.position)
  if(window.UI.$currentPopup) {
    gsap.killTweensOf(window.UI.$currentPopup)
    gsap.to(window.UI.$currentPopup, { autoAlpha: 0, duration: 0.3 })
  }

  if(_region === 'longerFiringRange')
    sobelRenderPass.scene = longerFiringRange

  if(_region === 'highMobility')
    sobelRenderPass.scene = track

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

  console.log(STATE.ZONE_FOCUS[_region].glowObject)
  STATE.CUR_GLOWOBJECT = STATE.ZONE_FOCUS[_region].glowObject;

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