import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(10.5, 10.5, 10.5),
  position: new THREE.Vector3(0, -1.0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "TANK_K9A1_Head_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "TANK_K9A1_Head_CAMO.jpg",
    "emissiveMap": "TANK_K9A1_Head_CAMO.jpg",
    "normalMap": "TANK_K9A1_Head_H_N_1k.jpg",
    "flipY": false,
    "roughness": 1.0,
    "metalness": 0.0,
    "reflectivity": 0.5,
    "clearcoat": 1.0,
    "clearcoatRoughness": 0.4,
  },
  "TANK_K9A1_Body_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "specular": new THREE.Color("rgb(127,127,127)"),
    "map": "TANK_K9A1_Body_CAMO.jpg",
    "emissiveMap": "TANK_K9A1_Body_CAMO.jpg",
    "normalMap": "TANK_K9A1_Body_H_N_2k.jpg",
    "flipY": false,
    "roughness": 1.0,
    "metalness": 0.0,
    "reflectivity": 0.5,
    "clearcoat": 1.0,
    "clearcoatRoughness": 0.4,
  },
  "TANK_K9A1_Track_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "TANK_K9A1_TrackWheel.jpg",
    "emissiveMap": "TANK_K9A1_TrackWheel.jpg",
    "normalMap": "TANK_K9A1_TrackWheel_N.jpg",
    "flipY": false,
    "roughness": 1.0,
    "metalness": 0.0,
    "reflectivity": 0.5,
    "clearcoat": 1.0,
    "clearcoatRoughness": 0.4,
    "side": THREE.DoubleSide,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
  },
  "TANK_K9A1_Track_UVAni_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "TANK_K9A1_TrackWheel.jpg",
    "emissiveMap": "TANK_K9A1_TrackWheel.jpg",
    "normalMap": "TANK_K9A1_TrackWheel_N.jpg",
    "flipY": false,
    "roughness": 1.0,
    "metalness": 0.0,
    "reflectivity": 0.5,
    "clearcoat": 1.0,
    "clearcoatRoughness": 0.4,
    "side": THREE.DoubleSide,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
  },
  "BG_Snow_Floor_TankShadow_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(5,8,10)"),
    "transparent": true,
    "alphaMap": "BG_Snow_Floor_TankShadow_A.jpg",
  },
  "BG_Snow_TrackSkid_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "alphaMap": "TrackSkid_A.jpg",
    "transparent": true,
    "opacity": 0.4,
    "alphaMapTiling":{
      repeatX: 1,
      repeatY: 1,
    }
  },
  "BG_Snow_Dust_SeqAni_s": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "alphaMap": "dirt_spritesheet_horizon.png",
    "transparent": true,
    "depthWrite": false,
  }
} 