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
    "type": new THREE.MeshBasicMaterial(),
    "map": "Space_Stars_BG.png",
    // "envMapIntensity": 10,
    "flipY": false,
  },
  "Earth_KarmanLine_s": {
    "sRGBmode": true,
    "type": new THREE.MeshBasicMaterial(),
    "map": "Earth_KarmanLine_D.png",
    "alphaMap": "Earth_KarmanLine_A.png",
    // "transparent": true,
    "opacity": 0.8,
    "blending": 2,
    "flipY": false,
    "side": THREE.DoubleSide
  },
  "Earth_Night_s": {
    "sRGBmode": true,
    "type": new THREE.MeshStandardMaterial(),
    "lightMap": "Earth_Night_D.jpg",
    "alphaMap": "Earth_Night_A.png",
    "transparent": true,
    "opacity": 0.95,
    "flipY": false,
    "envMapIntensity": 0.4,
    // "blending": 4,
    "lightMapIntensity": 0.8,
    // "depthWrite": false,
    "lightMapTiling":{ repeatX: 1, repeatY: 1, },
    "alphaMapTiling":{ repeatX: 1, repeatY: 1, },
  },
  "Earth_Day_s": {
    "sRGBmode": true,
    "type": new THREE.MeshBasicMaterial(),
    "map": "Earth_D.jpg",
    // "envMapIntensity": 15,
    "flipY": false,
    // "depthWrite": false,
    "mapTiling":{ repeatX: 1, repeatY: 1, },
  },
  "Earth_Cloud_s": {
    "sRGBmode": true,
    "type": new THREE.MeshBasicMaterial(),
    "map": "Earth_Cloud_D.jpg",
    "alphaMap": "Earth_Cloud_D.jpg",
    "transparent": true,
    "opacity": 1,
    "depthWrite": false,
    "flipY": false,
    "mapTiling":{ repeatX: 1, repeatY: 1, },
    "alphaMapTiling":{ repeatX: 1, repeatY: 1, },
    // "visible": false
  }
} 