import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(1, 1, 1),
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "Launcher_Floor_s": {
    "sRGBmode": true,
    "type": new THREE.MeshPhysicalMaterial(),
    "map": "Launcher_D.jpg",
    "aoMap": "Launcher_Floor_AO.jpg",
    "roughnessMap": "Launcher_ORM.jpg",
    "metalnessMap": "Launcher_ORM.jpg",
    "envMapIntensity": 1,
    "flipY": false,
  },
  "Launcher_Main_s": {
    "sRGBmode": true,
    "type": new THREE.MeshPhysicalMaterial(),
    "map": "Launcher_D.jpg",
    "aoMap": "Launcher_Main_AO.jpg",
    "roughnessMap": "Launcher_ORM.jpg",
    "metalnessMap": "Launcher_ORM.jpg",
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
    "envMapIntensity": 1,
    "flipY": false,
  },
  "Launcher_Floor_Light_s": {
    "sRGBmode": true,
    "type": new THREE.MeshPhysicalMaterial(),
    "envMapIntensity": 1,
    "flipY": false,
  },
} 