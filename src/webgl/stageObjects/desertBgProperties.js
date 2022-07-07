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
    "map": "Sky/Sky_Desert.jpg",
    "reflectivity": 1.0,
    "roughness": 1.0,
    "flipY": false,
  },

  "Clous_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(238,200,63)"),
    "alphaMap": "Sky/Cloud_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    // "emissive": new THREE.Color("rgb(0,0,0)"),
    // "emissiveIntensity": 1.0,
    "depthWrite": false, 
  },

  "BG_Desert_Mountain_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Mountian/BG_Desert_Mountain_D.jpg",
    "alphaMap": "Mountian/BG_Desert_Mountain_A.jpg",
    "transparent": true,
    "flipY": false,
    "depthWrite": false,
  },

  "BG_Snow_Ground_UV_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Ground/T_Landscape_Soil_DH_Motion_Tile.jpg",
    "flipY": false,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    }
  },

  "Speed_Line_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(94,43,43)"),
    "alphaMap": "Speed_Line/Speed_Line_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    // "depthTest": true,
    "depthWrite": false,
    "opacity": 0.5,
    "alphaMapTiling":{
      repeatX: 5,
      repeatY: 5,
    }
  },

  // "Grass_s1": {
  //   "type": new THREE.MeshStandardMaterial(),
  //   "color": new THREE.Color("rgb(255,255,255)"),
  //   "map": "Gress/Glass.jpg",
  //   "transparent": true,
  //   "flipY": false,
  //   // "emissive": new THREE.Color("rgb(0,0,0)"),
  //   // "emissiveIntensity": 1.0,
  //   "roughness": 1.0,
  //   "metalness": 0,
  // },

  "Grass_S": {
    "type": new THREE.MeshStandardMaterial(),
    // "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Bush/Snow_Grass_Dif.jpg",
    "alphaMap": "Bush/Snow_Grass_Alpha.jpg",
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
    "map": "Tire/T_Landscape_Soil_DH_Tire.jpg",
    "alphaMap": "Tire/Tire_Alpha_Light.jpg",
    "transparent": true,
    "flipY": false,
    "emissive": new THREE.Color("rgb(0,0,0)"),
    "emissiveIntensity": 1.0,
  },

  "BG_Floor_TankShadow_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(87,66,66)"),
    // "map": "Tank_Shadow/BG_Desert_Floor_TankShadow_D.jpg",
    "alphaMap": "Tank_Shadow/BG_Desert_Floor_TankShadow_A.jpg",
    "transparent": true,
    "flipY": false,
    "depthTest": true,
    "depthWrite": true,
  },

  "Desert_Rock_Part_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Rock/T_Landscape_Soil_DH_Rock.jpg",
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
  "Desert_Soil_S": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Soil/Soil_Part.jpg",
    "alphaMap": "Soil/Soil_Part_Alpha.jpg",
    "transparent": true,
    "flipY": false,
    "depthWrite": false,
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