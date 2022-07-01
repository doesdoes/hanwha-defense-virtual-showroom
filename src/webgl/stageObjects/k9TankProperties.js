import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(0.5, 0.5, 0.5),
  position: new THREE.Vector3(1.3, -0.5, 0),
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
    "roughness": 0.5,
    "metalness": 0.1,
    "emissive": new THREE.Color("rgb(255,255,255)"),
    "emissiveIntensity": 1.0,
    // "transparent": true,
  },
  
  "TANK_K9A1_Body_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "TANK_K9A1_Body_CAMO.jpg",
    "emissiveMap": "TANK_K9A1_Body_CAMO.jpg",
    "normalMap": "TANK_K9A1_Body_H_N_2k.jpg",
    "flipY": false,
    "roughness": 0.5,
    "metalness": 0.1,
    "emissive": new THREE.Color("rgb(255,255,255)"),
    "emissiveIntensity": 1.0,
  },
  "TANK_K9A1_TrackWheel_s": {
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
    "emissiveIntensity": 1.0,
  },
} 