import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(1, 1, 1),
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "KSLV_II_s": {
    "sRGBmode": true,
    "type": new THREE.MeshPhysicalMaterial(),
    "map": "KSLV_D.jpg",
    "roughnessMap": "KSLV_R.jpg",
    "roughness": 0.3,
    "metalnessMap": "KSLV_M.jpg",
    "metalness": 1,
    "normalMap": "KSLV_N.jpg",
    "envMapIntensity": 5,
    "flipY": false,
  },
  "KSLV_II_Insaid_s": {
    "sRGBmode": true,
    "type": new THREE.MeshPhysicalMaterial(),
    "roughness": 0.1,
    "metalness": 1,
    "envMapIntensity": 5,
    "flipY": false,
  }
}