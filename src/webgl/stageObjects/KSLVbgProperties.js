import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(1, 1, 1),
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "Galaxy_BG_s": {
    "sRGBmode": true,
    "type": new THREE.MeshBasicMaterial(),
    "map": "Galaxy_BG_D.jpg",
    "flipY": false,
  },
  "Earth_KarmanLine_s": {
    "sRGBmode": true,
    "type": new THREE.MeshStandardMaterial(),
    // "color": new THREE.Color("rgb(150,150,150)"),
    "map": "Earth_KarmanLine_D.jpg",
    "alphaMap": "Earth_KarmanLine_A.png",
    // "transparent": true,
    "envMapIntensity": 2,
    "opacity": 1,
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
    "envMapIntensity": 0,
    // "blending": 4,
    "lightMapIntensity": 0.8,
    // "depthWrite": false,
    "lightMapTiling":{ repeatX: 1, repeatY: 1, },
    "alphaMapTiling":{ repeatX: 1, repeatY: 1, },
  },
  "Earth_Day_s": {
    "sRGBmode": true,
    "type": new THREE.MeshStandardMaterial(),
    // "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Earth_Blue_D.jpg",
    // "normalMap": "Earth_N.jpg",
    "envMapIntensity": 2,
    "roughness": 0.5,
    "flipY": false,
    // "depthWrite": false,
    "mapTiling":{ repeatX: 1, repeatY: 1, },
  },
  "Earth_Cloud_s": {
    "sRGBmode": true,
    "type": new THREE.MeshStandardMaterial(),
    "map": "Earth_Cloud_D.jpg",
    "alphaMap": "Earth_Cloud_D.jpg",
    "envMapIntensity": 2,
    "transparent": true,
    "opacity": 0.5,
    "depthWrite": false,
    "flipY": false,
    "mapTiling":{ repeatX: 1, repeatY: 1, },
    "alphaMapTiling":{ repeatX: 1, repeatY: 1, },
    // "visible": false
  },
  "Cloud_Main_s": {
    "sRGBmode": true,
    "type": new THREE.MeshBasicMaterial(),
    "map": "Cloud_Main_D.jpg",
    "alphaMap": "Cloud_Main_D.jpg",
    "envMapIntensity": 0,
    "envMap": null,
    "transparent": true,
    "opacity": 0.25,
    "depthWrite": false,
    "flipY": false,
    "blending": 2
  },
  "Cloud_Small_s": {
    "sRGBmode": true,
    "type": new THREE.MeshBasicMaterial(),
    "map": "Cloud_Small_D.png",
    "alphaMap": "Cloud_Small_D.png",
    "envMapIntensity": 0,
    "envMap": null,
    "transparent": true,
    "opacity": 0.25,
    "depthWrite": false,
    "flipY": false,
    "blending": 2
  }
} 