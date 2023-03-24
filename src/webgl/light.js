import * as THREE from 'three'
import { STATE, LIGHTS } from './global.js'

export function initLights() {
  LIGHTS.TANK.drLightRight.position.set(-2.4, 4, -6.5)
  LIGHTS.TANK.drLightRight.shadow.camera.left = - 10
  LIGHTS.TANK.drLightRight.shadow.camera.right = 10
  LIGHTS.TANK.drLightRight.shadow.camera.top = 10
  LIGHTS.TANK.drLightRight.shadow.camera.bottom = - 10
  LIGHTS.TANK.drLightRight.shadow.mapSize.width = 2048
  LIGHTS.TANK.drLightRight.shadow.mapSize.height = 2048
  LIGHTS.TANK.drLightRight.castShadow = true
  LIGHTS.TANK.drLightRight.intensity = 0.4

  LIGHTS.TANK.drLightLeft.position.set(-2.6, 6, 6.5)
  LIGHTS.TANK.drLightLeft.shadow.camera.left = - 10
  LIGHTS.TANK.drLightLeft.shadow.camera.right = 10
  LIGHTS.TANK.drLightLeft.shadow.camera.top = 10
  LIGHTS.TANK.drLightLeft.shadow.camera.bottom = - 10
  LIGHTS.TANK.drLightLeft.shadow.mapSize.width = 2048
  LIGHTS.TANK.drLightLeft.shadow.mapSize.height = 2048
  LIGHTS.TANK.drLightLeft.castShadow = true
  LIGHTS.TANK.drLightLeft.intensity = 0.4
  
  const targetLeft = new THREE.Object3D()
  targetLeft.position.set(0, 0, 0.5)
  LIGHTS.TANK.drLightLeft.target = targetLeft
  LIGHTS.TANK.drLightLeft.target.updateMatrixWorld()

  const targetRight = new THREE.Object3D()
  targetRight.position.set(0, 0, -0.5)
  LIGHTS.TANK.drLightRight.target = targetRight
  LIGHTS.TANK.drLightRight.target.updateMatrixWorld()
}

export function updateLights(_scene) {
  if(_scene == 'kslv') {
    STATE.WEBGL.scene.remove( LIGHTS.TANK.drLightRight )
    STATE.WEBGL.scene.remove( LIGHTS.TANK.drLightLeft )
    STATE.WEBGL.scene.remove( LIGHTS.TANK.hemiLight )
  } else {
    STATE.WEBGL.scene.add( LIGHTS.TANK.drLightRight )
    STATE.WEBGL.scene.add( LIGHTS.TANK.drLightLeft )
    STATE.WEBGL.scene.add( LIGHTS.TANK.hemiLight )
  }
}

export function setHemisphereLightSnowDefault() {
  LIGHTS.TANK.hemiLight.color = new THREE.Color(0xf5f7fa)
  LIGHTS.TANK.hemiLight.groundColor = new THREE.Color(0xa6abb3)
  LIGHTS.TANK.hemiLight.intensity = 1.0
}

export function setHemisphereLightDesertDefault() {
  LIGHTS.TANK.hemiLight.color = new THREE.Color(0xFFFFFF)
  LIGHTS.TANK.hemiLight.groundColor = new THREE.Color(0x778DB1)
  LIGHTS.TANK.hemiLight.intensity = 0.5
}

export function setHemisphereLightDesert() {
  LIGHTS.TANK.hemiLight.color = new THREE.Color(0xfff0d8)
  LIGHTS.TANK.hemiLight.groundColor = new THREE.Color(0xFEF5EC)
  LIGHTS.TANK.hemiLight.intensity = 0.5
}

export function setHemisphereLightSnow() {
  LIGHTS.TANK.hemiLight.color = new THREE.Color(0xedf4fc)
  LIGHTS.TANK.hemiLight.groundColor = new THREE.Color(0x8493ad)
  LIGHTS.TANK.hemiLight.intensity = 1.0
}