import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(12, 12, 12),
  position: new THREE.Vector3(0, -1.0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "BG_Desert_HDR1": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "HDR/Ultimate_Skies_4k_0000.jpg",
    "reflectivity": 1.0,
    "flipY": false,
  },

  "Cloud_s1": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(238,200,63)"),
    "map": "Sky/Sky_Desert.jpg",
    "alphaMap": "Sky/Cloud_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    "emissive": new THREE.Color("rgb(214,133,133)"),
    "emissiveIntensity": 0.36,
  },

  "BG_Desert_Mountain_s1": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Mountian/BG_Desert_Mountain_D.jpg",
    "alphaMap": "Mountian/BG_Desert_Mountain_A.jpg",
    "transparent": true,
    "flipY": false,
  },

  "Grass_s1": {
    "type": new THREE.MeshStandardMaterial(),
    // "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Gress/Glass.jpg",
    "alphaMap": "Gress/Glass_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    // "mapTiling":{
    //   repeatX: 1,
    //   repeatY: 1,
    // },
    // "emissive": new THREE.Color("rgb(0,0,0)"),
    // "emissiveIntensity": 1.0,
    "roughness": 1.0,
    "metalness": 0,
  },

  "Grass_Load_s1": {
    "type": new THREE.MeshStandardMaterial(),
    // "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Gress/Glass.jpg",
    "alphaMap": "Gress/Glass_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    // "emissive": new THREE.Color("rgb(0,0,0)"),
    // "emissiveIntensity": 1.0,
    // "roughness": 1.0,
  },

  "BG_Desert_UG_UVani_s1": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Ground/T_Landscape_Soil_DH_Motion_Tile.png",
    "flipY": false,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    }
  },

  "Speed_Line_s1": {
    "type": new THREE.MeshStandardMaterial(),
    // "color": new THREE.Color("rgb(94,43,43)"),
    "alphaMap": "Speed_Line/Speed_Line_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    // "depthTest": true,
    "depthWrite": false,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    }
  },

  "Dirt": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(0,0,0)"),
    "map": "Dirt/Dust_num/NUM_0001.jpg",
    "alphaMap": "Dirt/Dust_num/NUM_0001.jpg",
    "transparent": true,
    "flipY": false,
    // "depthTest": false,
    "depthWrite": false,
  },

  "Tire_Line_s1": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(0,0,0)"),
    "map": "Tire/T_Landscape_Soil_DH_Tire.jpg",
    "alphaMap": "Tire/Tire_Alpha.jpg",
    "transparent": true,
    "flipY": false,
  },

  "BG_Desert_Floor_TankShadow1": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(0,0,0)"),
    "map": "Tank_Shadow/BG_Desert_Floor_TankShadow_D.jpg",
    "alphaMap": "Tank_Shadow/BG_Desert_Floor_TankShadow_A.jpg",
    "transparent": true,
    "flipY": false,
    "depthTest": true,
    "depthWrite": true,
  },
 

  // "BG_Desert_Floor_UVani_s": {
  //   "type": new THREE.MeshBasicMaterial(),
  //   "color": new THREE.Color("rgb(42,15,4)"),
  //   "alphaMap": "BG_Desert_Floor_UVani_A.jpg",
  //   "transparent": true,
  //   "opacity": 0.5,
  //   "flipY": false,
  // },
  // "BG_Desert_UG_UVani_s": {
  //   "type": new THREE.MeshBasicMaterial(),
  //   "color": new THREE.Color("rgb(255,255,255)"),
  //   "map": "BG_Desert_UG_UVani.jpg",
  //   "flipY": false,
  //   "mapTiling":{
  //     repeatX: 2,
  //     repeatY: 2,
  //   }
  // },

  

  // "BG_Desert_Mountain_s": {
  //   "type": new THREE.MeshBasicMaterial(),
  //   "color": new THREE.Color("rgb(255,255,255)"),
  //   "map": "BG_Desert_Mountain_D.jpg",
  //   "alphaMap": "BG_Desert_Mountain_A.jpg",
  //   "transparent": true,
  //   "flipY": false,
  //   "depthWrite": false,
  // },
  
  
} 