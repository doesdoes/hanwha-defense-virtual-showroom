import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(0.6, 0.6, 0.6),
  position: new THREE.Vector3(-0.75, -0.35, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "snow_Tex_02": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "baked-Aset_nature_embankment_L_vcyhedzga_LOD4Shape.jpg",
    "flipY": false,
  },
  "BG_Desert_Floor_UVani_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(42,15,4)"),
    "alphaMap": "BG_Desert_Floor_UVani_A.jpg",
    "transparent": true,
    "opacity": 0.5,
    "flipY": false,
  },
  "BG_Desert_Floor_TankShadow_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(9,3,1)"),
    "alphaMap": "BG_Desert_Floor_TankShadow_A.jpg",
    "transparent": true,
    "flipY": false,
    "opacity": 0.8,
  },
  "BG_Desert_UG_UVani_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "BG_Desert_UG_UVani.jpg",
    "flipY": false,
    "mapTiling":{
      repeatX: 2,
      repeatY: 2,
    }
  },
  "BG_Desert_EX1": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(102,102,102)"),
  },
  
} 