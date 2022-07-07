import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(12, 12, 12),
  position: new THREE.Vector3(0, -1.0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "BG_Snow_HDR_S": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Sky/BG_Snow_HDR_SkY_Clean.jpg",
    "reflectivity": 1.0,
    "roughness": 1.0,
    "flipY": false,
  },

  "Clous_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "alphaMap": "Cloud/snow_Cloud_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    // "emissive": new THREE.Color("rgb(0,0,0)"),
    // "emissiveIntensity": 1.0,
    "depthWrite": false, 
  },

  "BG_Snow_Mountain_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "BG_Snow_Mountain_D.jpg",
    "alphaMap": "BG_Snow_Mountain_A.jpg",
    "transparent": true,
    "flipY": false,
    // "depthWrite": false,
  },

  "BG_Snow_Ground_UV_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Ground/BG_Snow_Ground_Dif.jpg",
    "flipY": false,
    "mapTiling":{
      repeatX: 2,
      repeatY: 2,
    }
  },

  "Speed_Line_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "alphaMap": "Speed_Line/Speed_Line_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    // "depthTest": true,
    "depthWrite": false,
    "opacity": 1,
    "alphaMapTiling":{
      repeatX: 2,
      repeatY: 2,
    }
  },

  "Snow_Tree_Plan_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Tree_Plan/Tree_Plan_GRP_Dif.jpg",
    "alphaMap": "Tree_Plan/Tree_Plan_GRP_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    "opacity": 1.0,
    // "emissive": new THREE.Color("rgb(0,0,0)"),
    // "emissiveIntensity": 1.0,
    // "depthWrite": false,
  },

  "Glass_S": {
    "type": new THREE.MeshStandardMaterial(),
    // "color": new THREE.Color("rgb(255,255,255)"),
    "map": "grass/Snow_Grass_Dif.jpg",
    "alphaMap": "grass/Snow_Grass_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    // "emissive": new THREE.Color("rgb(0,0,0)"),
    // "emissiveIntensity": 1.0,
    // "roughness": 1.0,
  },

  "Dirt_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Dirt_Seq/Dirt_0001.jpg",
    "alphaMap": "Dirt_Seq/Dirt_0001.jpg",
    "transparent": true,
    "flipY": false,
    // "depthTest": false,
    "depthWrite": false,
  },

  "Tire_Line_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Tire_Line/Tire_Line_Dif.jpg",
    "alphaMap": "Tire_Line/Tire_Line_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    "emissive": new THREE.Color("rgb(0,0,0)"),
    "emissiveIntensity": 1.0,
  },

  "BG_Snow_Floor_TankShadow_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(92,98,127)"),
    // "map": "Tank_Shadow/BG_Desert_Floor_TankShadow_D.jpg",
    "alphaMap": "BG_Desert_Floor_TankShadow_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    // "depthTest": true,
    // "depthWrite": true,
  },

  "Snow_Rock_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "rock/Snow_Rock_Dif.jpg",
    "flipY": false,
  },
  "Small_bush_s1": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,236,184)"),
    "alphaMap": "Bush/Small_Tall_bush_Alpha.png",
    "transparent": true,
    "flipY": false,
    "depthWrite": false,
  },
  "bushgreen_bush_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Bush/bushgreen_D.jpg",
    "alphaMap": "Bush/bushgreen_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    "depthWrite": false,
  },
  "Tree_A_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Tree_MOD/Snow_Tree_A_Dif.jpg",
    "alphaMap": "Tree_MOD/Snow_Tree_A_Alpha.jpg",
    "transparent": true,
    "flipY": false,
  },
  "Tree_B_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Tree_MOD/Snow_Tree_B_Dif.jpg",
    "alphaMap": "Tree_MOD/Snow_Tree_B_Alpha.jpg",
    "transparent": true,
    "flipY": false,
  },
  "Snow_Soil_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Snow_Soil/Snow_Soil.jpg",
    "alphaMap": "Snow_Soil/Soil_Part_Alpha.jpg",
    "transparent": true,
    "flipY": false,
  },
  "Branch_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Branch/Branch_Dif.jpg",
    "alphaMap": "Branch/Branch_Dif.jpg",
    "transparent": true,
    "flipY": false,
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