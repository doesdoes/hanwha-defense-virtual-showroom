import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(0.5, 0.5, 0.5),
  position: new THREE.Vector3(1.3, -0.5, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "TANK_K9A1_Head_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "TANK_K9A1_Head_CAMO.jpg",
    "flipY": false,
    // "transparent": true,
  },
  
  "TANK_K9A1_Body_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "TANK_K9A1_Body_CAMO.jpg",
    "flipY": false,
  },
  "TANK_K9A1_TrackWheel_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "TANK_K9A1_TrackWheel.jpg",
    "flipY": false,
  },
} 