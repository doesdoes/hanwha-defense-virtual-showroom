import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(1, 1, 1),
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "Launcher_Floor_Base_s": {
    "sRGBmode": true,
    "type": new THREE.MeshPhysicalMaterial(),
    "map": "Floor_Base_D.jpg",
    "aoMap": "Launcher_Floor_Base_AO.jpg",
    "envMapIntensity": 1.0,
    "flipY": false,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
  },
  "Launcher_Floor_Main_s": {
    "sRGBmode": true,
    "type": new THREE.MeshPhysicalMaterial(),
    "map": "Floor_Main_D.jpg",
    "aoMap": "Launcher_Floor_Main_AO.jpg",
    "envMapIntensity": 1.0,
    "flipY": false,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
  },
  "Launcher_Floor_Center_s": {
    "sRGBmode": true,
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(51,76,77)"),
    "aoMap": "Launcher_Floor_Center_AO.jpg",
    "metalness": 0.35,
    "roughness": 0.47,
    "envMapIntensity": 1.0,
    "flipY": false,
  },
  "Launcher_Main_s": {
    "sRGBmode": true,
    "type": new THREE.MeshPhysicalMaterial(),
    "map": "Launcher_D.jpg",
    "aoMap": "Launcher_Main_AO.jpg",
    "roughnessMap": "Launcher_ORM.jpg",
    "metalnessMap": "Launcher_ORM.jpg",
    "metalness": 0.8,
    "roughness": 0.6,
    "envMapIntensity": 1,
    "flipY": false,
  },
  "Launchingpad_s": {
    "sRGBmode": true,
    "type": new THREE.MeshPhysicalMaterial(),
    "map": "Launchingpad_D.jpg",
    "aoMap": "Launchingpad_AO.jpg",
    "roughnessMap": "Launchingpad_R.jpg",
    "metalnessMap": "Launchingpad_M.jpg",
    "normalMap": "Launchingpad_N.jpg",
    "metalness": 1,
    "roughness": 0.5,
    "envMapIntensity": 1,
    "flipY": false,
  },
  "Launcher_Prop_s": {
    "sRGBmode": true,
    "type": new THREE.MeshPhysicalMaterial(),
    "map": "Launcher_D.jpg",
    "aoMap": "Launcher_Prop_AO.jpg",
    "roughnessMap": "Launcher_ORM.jpg",
    "metalnessMap": "Launcher_ORM.jpg",
    "metalness": 0.5,
    "roughness": 0.5,
    "envMapIntensity": 1.0,
    "flipY": false,
  },
  // "Launcher_Floor_Light_s": {
  //   "sRGBmode": true,
  //   "type": new THREE.MeshPhysicalMaterial(),
  //   "envMapIntensity": 1.5,
  //   "flipY": false,
  // },
} 