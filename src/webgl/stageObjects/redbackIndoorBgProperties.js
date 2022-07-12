import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(12, 12, 12),
  position: new THREE.Vector3(-0.2, -1, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "Floor_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Floor.jpg",
    "flipY": false,
  },
  "wall_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "wall.jpg",
    "flipY": false,
  },
} 