import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(10.5, 10.5, 10.5),
  position: new THREE.Vector3(0, -1.0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "REDBACK_Head_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "REDBACK_Head_s.png",
    "emissiveMap": "REDBACK_Head_s.png",
    // "normalMap": "TANK_K9A1_Head_H_N_1k.jpg",
    "flipY": false,
    "roughness": 0.5,
    "metalness": 0.1,
    "emissive": new THREE.Color("rgb(255,255,255)"),
    "emissiveIntensity": 0.1,
    // "transparent": true,
  },
  
  "REDBACK_Body_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "REDBACK_Body_s.png",
    "emissiveMap": "REDBACK_Body_s.png",
    // "normalMap": "TANK_K9A1_Body_H_N_2k.jpg",
    "flipY": false,
    "roughness": 0.5,
    "metalness": 0.1,
    "emissive": new THREE.Color("rgb(255,255,255)"),
    "emissiveIntensity": 0.1,
  },
  "REDBACK_Track_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "REDBACK_Track_s.png",
    "emissiveMap": "REDBACK_Track_s.png",
    // "normalMap": "TANK_K9A1_TrackWheel_N.jpg",
    "flipY": false,
    "side": THREE.DoubleSide,
    "roughness": 0.5,
    "metalness": 0.1,
    "emissive": new THREE.Color("rgb(255,255,255)"),
    "emissiveIntensity": 0.1,
  },
} 