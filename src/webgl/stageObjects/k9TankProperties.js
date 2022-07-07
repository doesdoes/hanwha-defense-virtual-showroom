import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(10.5, 10.5, 10.5),
  position: new THREE.Vector3(0, -1.0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "K9A1_Head_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "TANK_K9A1_Head_CAMO.jpg",
    "emissiveMap": "TANK_K9A1_Head_CAMO.jpg",
    "normalMap": "TANK_K9A1_Head_H_N_1k.jpg",
    "flipY": false,
    "roughness": 0.5,
    "metalness": 0.1,
    "emissive": new THREE.Color("rgb(255,255,255)"),
    "emissiveIntensity": 0.1,
    // "transparent": true,
  },
  
  "K9A1_Body_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "TANK_K9A1_Body_CAMO.jpg",
    "emissiveMap": "TANK_K9A1_Body_CAMO.jpg",
    "normalMap": "TANK_K9A1_Body_H_N_2k.jpg",
    "flipY": false,
    "roughness": 0.5,
    "metalness": 0.1,
    "emissive": new THREE.Color("rgb(255,255,255)"),
    "emissiveIntensity": 0.1,
  },
  "K9A1_Track_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "TANK_K9A1_TrackWheel.jpg",
    "emissiveMap": "TANK_K9A1_TrackWheel.jpg",
    "normalMap": "TANK_K9A1_TrackWheel_N.jpg",
    "flipY": false,
    "side": THREE.DoubleSide,
    "roughness": 0.5,
    "metalness": 0.1,
    "emissive": new THREE.Color("rgb(255,255,255)"),
    "emissiveIntensity": 0.1,
  },
} 