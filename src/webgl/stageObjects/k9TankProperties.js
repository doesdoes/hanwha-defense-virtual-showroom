import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(10.5, 10.5, 10.5),
  position: new THREE.Vector3(0, -1.0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "K9A1_Head_s": {
    "type": new THREE.MeshPhongMaterial(),
    "color": new THREE.Color("rgb(102,102,102)"),
    "specular": new THREE.Color("rgb(127,127,127)"),
    "map": "TANK_K9A1_Head_CAMO.jpg",
    "emissiveMap": "TANK_K9A1_Head_CAMO.jpg",
    "normalMap": "TANK_K9A1_Head_H_N_1k.jpg",
    "flipY": false,
    // "roughness": 0.5,
    // "metalness": 0.1,
    "shininess": 20,
    "reflectivity": 0.5,
    "emissive": new THREE.Color("rgb(0,0,0)"),
    "emissiveIntensity": 1.0,
    // "transparent": true,
  },
  
  "K9A1_Body_s": {
    "type": new THREE.MeshPhongMaterial(),
    "color": new THREE.Color("rgb(102,102,102)"),
    "specular": new THREE.Color("rgb(127,127,127)"),
    "map": "TANK_K9A1_Body_CAMO.jpg",
    "emissiveMap": "TANK_K9A1_Body_CAMO.jpg",
    "normalMap": "TANK_K9A1_Body_H_N_2k.jpg",
    "flipY": false,
    "shininess": 20,
    "reflectivity": 0.5,
    "emissive": new THREE.Color("rgb(0,0,0)"),
    "emissiveIntensity": 1.0,
  },
  "K9A1_Track_s": {
    "type": new THREE.MeshPhongMaterial(),
    "color": new THREE.Color("rgb(102,102,102)"),
    "specular": new THREE.Color("rgb(127,127,127)"),
    "map": "TANK_K9A1_TrackWheel.jpg",
    "emissiveMap": "TANK_K9A1_TrackWheel.jpg",
    "normalMap": "TANK_K9A1_TrackWheel_N.jpg",
    "flipY": false,
    "shininess": 20,
    "reflectivity": 0.5,
    "side": THREE.DoubleSide,
    "emissive": new THREE.Color("rgb(0,0,0)"),
    "emissiveIntensity": 1.0,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
  },
} 