import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(10, 10, 10),
  position: new THREE.Vector3(0, -0.4, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "BG_K9A1_obj": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "baked-BG_K9A1Shape.jpg",
    "flipY": false,
  },
} 