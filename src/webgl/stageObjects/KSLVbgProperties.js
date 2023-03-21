import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(1, 1, 1),
  // scale: new THREE.Vector3(0.04, 0.04, 0.04),
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "Galaxy_s": {
    "sRGBmode": true,
    "type": new THREE.MeshPhysicalMaterial(),
    "map": "Milkyway_BG.jpg",
    "flipY": false,
  },
  "Earth_KarmanLine_s": {
    "sRGBmode": true,
    "type": new THREE.MeshPhysicalMaterial(),
    "map": "Earth_KarmanLine_D.png",
    "alphaMap": "Earth_KarmanLine_A.png",
    // "transparent": true,
    "blending": 2,
    "flipY": false,
  },
  "Earth_Night_s": {
    "sRGBmode": true,
    "type": new THREE.MeshBasicMaterial(),
    "lightMap": "Earth_Night_D.jpg",
    "alphaMap": "Earth_Night_A.png",
    "transparent": true,
    "flipY": false,
    "lightMapIntensity": 0.2,
    "lightMapTiling":{ repeatX: 1, repeatY: 1, },
    "alphaMapTiling":{ repeatX: 1, repeatY: 1, },
  },
  "Earth_Day_s": {
    "sRGBmode": true,
    "type": new THREE.MeshBasicMaterial(),
    "map": "Earth_D.jpg",
    "flipY": false,
    "mapTiling":{ repeatX: 1, repeatY: 1, },
  },
  "Earth_Cloud_s": {
    "sRGBmode": true,
    "type": new THREE.MeshBasicMaterial(),
    "map": "Earth_Cloud_D.jpg",
    "alphaMap": "Earth_Cloud_D.jpg",
    "transparent": true,
    "opacity": 0.5,
    "flipY": false,
    "mapTiling":{ repeatX: 1, repeatY: 1, },
    "alphaMapTiling":{ repeatX: 1, repeatY: 1, },
  }
} 