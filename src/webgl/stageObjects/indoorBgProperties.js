import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(12, 12, 12),
  position: new THREE.Vector3(0, -1, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "SRoom_IN_K9A1_BG_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "K9A1_Ground.jpg",
    "flipY": false,
  },
} 