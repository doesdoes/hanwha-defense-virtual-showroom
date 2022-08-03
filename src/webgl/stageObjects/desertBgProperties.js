import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(12, 12, 12),
  position: new THREE.Vector3(0, -1.5, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "BG_Desert_HDR_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Desert_Sky.jpg",
    "reflectivity": 1.0,
    "roughness": 1.0,
    "flipY": false,
  },

  "BG_Desert_Ground_UVAni_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Desert_ground.jpg",
    "flipY": false,
    "mapTiling":{
      repeatX: 15,
      repeatY: 15,
    }
  },

  "BG_Desert_Mountain_UVAni_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "BG_Desert_Mountain_D_02.jpg",
    "alphaMap": "BG_Desert_Mountain_A_02.jpg",
    "transparent": true,
    "flipY": false,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
    "alphaMapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
  },

  "BG_SpeedLine_UVAni_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(193,160,127)"),
    "alphaMap": "Speed_Line_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    "alphaMapTiling":{
      repeatX: 1,
      repeatY: 1,
    }
  },

  "BG_Dessert_Tree_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Tree_Plan_D.jpg",
    "alphaMap": "Tree_Plan_A.jpg",
    "transparent": true,
    "flipY": false,
    
  },

  "Props_shadow_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(167, 104, 72)"),
    "alphaMap": "prop_shadow.jpg",
    "flipY": false,
    "transparent": true,
  },

  "Grass_Part_s": {
    "type": new THREE.MeshBasicMaterial(),
    "map": "Desert_Grass_D.jpg",
    "alphaMap": "Desert_Grass_A.jpg",
    "transparent": true,
    "flipY": false,
  },

  "Desert_Rock_Part_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Desert_Rocks.jpg",
    "flipY": false,
  },

  "Desert_Soil_Part_s": {
    "type": new THREE.MeshBasicMaterial(),
    "map": "Soil_D.jpg",
    "flipY": false,
  },

  "Rock_Bush_Shadow_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(167, 104, 72)"),
    "alphaMap": "Rocks_Bush_Shadow_A.jpg",
    "flipY": false,
    "transparent": true,
  }
}