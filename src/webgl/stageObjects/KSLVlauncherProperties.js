import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(1, 1, 1),
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "lambert1.001": {
    "sRGBmode": true,
    "aoMap": "KSLV_D.jpg",
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "envMapIntensity": 1,
    "roughness": 0.2,
    "metalness": 0.75,
    "flipY": false,
  },
  "Material #40": {
    "sRGBmode": true,
    "aoMap": "KSLV_D.jpg",
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "envMapIntensity": 1,
    "roughness": 0.2,
    "metalness": 0.75,
    "flipY": false,
  },
  "Material #45": {
    "sRGBmode": true,
    "aoMap": "KSLV_D.jpg",
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "envMapIntensity": 1,
    "roughness": 0.2,
    "metalness": 0.75,
    "flipY": false,
  },
  "Material": {
    "sRGBmode": true,
    "aoMap": "KSLV_D.jpg",
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "envMapIntensity": 1,
    "roughness": 0.2,
    "metalness": 0.75,
    "flipY": false,
  },
  "VRayMtl34": {
    "sRGBmode": true,
    "aoMap": "KSLV_D.jpg",
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "envMapIntensity": 1,
    "roughness": 0.2,
    "metalness": 0.75,
    "flipY": false,
  },
  "glow_01": {
    "sRGBmode": true,
    "aoMap": "KSLV_D.jpg",
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "envMapIntensity": 1,
    "roughness": 0.2,
    "metalness": 0.75,
    "flipY": false,
  },
} 