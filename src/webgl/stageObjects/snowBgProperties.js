import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(12, 12, 12),
  position: new THREE.Vector3(0, -1.5, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "BG_Snow_HDR_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "HDR_Snow.jpg",
    "reflectivity": 1.0,
    "roughness": 1.0,
    "flipY": false,
  },

  "BG_Snow_Mountain_UVAni_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "BG_Snow_Mountain_D_02.jpg",
    "alphaMap": "BG_Snow_Mountain_A.jpg",
    "transparent": true,
    "flipY": false,
    "mapTiling":{
      repeatX: 1.09,
      repeatY: 1,
    },
    "alphaMapTiling":{
      repeatX: 1.09,
      repeatY: 1,
    },
  },

  "BG_Snow_Ground_UVAni_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "BG_Snow_Ground_Dif.jpg",
    "flipY": false,
    "mapTiling":{
      repeatX: 20,
      repeatY: 20,
    }
  },

  "BG_SpeedLine_UVAni_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "alphaMap": "spritesheet_wind.png",
    "transparent": true,
    // "opacity": 0.7,
    "side": THREE.DoubleSide,
    "depthWrite": false,
    "blending": THREE.AdditiveBlending,
  },

  "BG_Snow_Tree_Far_LoopAni_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Tree_Plan_GRP_Dif_02.jpg",
    "alphaMap": "Tree_Plan_GRP_Alpha.jpg",
    // "transparent": true,
    "flipY": false,
    // "depthWrite": false,
    "_alphaTest": 0.85,
  },

  "BG_Snow_Tree_Near_LoopAni_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "BG_Snow_Tree_D.jpg",
    "alphaMap": "BG_Snow_Tree_A.jpg",
    "transparent": true,
    "flipY": false,
  },

  "BG_Snow_Tree_Near_Shadow_LoopAni_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "BG_Snow_Tree_Shadow_D.jpg",
    "alphaMap": "BG_Snow_Tree_Shadow_A.jpg",
    "transparent": true,
    "flipY": false,
  },

  "BG_Snow_Rock_LoopAni_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "BG_Snow_Rock_D.jpg",
    "flipY": false,
  }
} 