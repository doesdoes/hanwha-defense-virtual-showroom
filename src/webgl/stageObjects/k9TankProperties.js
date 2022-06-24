import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(10, 10, 10),
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "BG_K9A1_obj": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(200,200,200)"),
    "map": "baked-BG_K9A1Shape.jpg",
    // "alphaMap": "bg_alpha.png",
    "transparent": true,
  },
  
  "k9a1_body_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "k9a1_body.jpg",
    "flipY": false,
  },
  "k9a1_parts_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "k9a1_parts.jpg",
    "flipY": false,
  },

  "k9a1_wheel_01_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "k9a1_wheel_01.jpg",
    "flipY": false,
  },
  "k9a1_wheel_02_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "k9a1_wheel_02.jpg",
    "flipY": false,
  },
  "k9a1_wheel_front_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "k9a1_wheel_front.jpg",
    "flipY": false,
  },
  "k9a1_wheel_rear_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "k9a1_wheel_rear.jpg",
    "flipY": false,
  },
} 