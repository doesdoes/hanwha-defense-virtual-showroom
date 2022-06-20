import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(0.33, 0.33, 0.33),
  position: new THREE.Vector3(0, 0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

// export const MATERIALS = {
//   "bg": {
//     "type": new THREE.MeshBasicMaterial(),
//     "color": new THREE.Color("rgb(200,200,200)"),
//     "map": "bg.jpg",
//     "alphaMap": "bg_alpha.png",
//     "transparent": true,
//   },
//   "cloud": {
//     "type": new THREE.MeshBasicMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "cloud.png",
//     "transparent": true,
//     "opacity": 0.15,
//     "depthWrite": false,
//     "mapTiling": { 
//       "repeatX": 1,
//       "repeatY": 1,
//     },
//   },
//   "Bush": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "Bush.jpg",
//   },
//   "road01": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "road01.png",
//     "mapTiling": { 
//       "repeatX": 1,
//       "repeatY": 50,
//     },
//   },
//   "road02": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "road02.png",
//     "mapTiling": { 
//       "repeatX": 1,
//       "repeatY": 100,
//     },
//   },
//   "Road Lines": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//   },
//   "Asphalt": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(230,230,230)"),
//     "map": "Asphalt.jpg",
//     "mapTiling": { 
//       "repeatX": 20,
//       "repeatY": 20,
//     },
//   },
//   "Asphalt_dark": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "Asphalt_dark.jpg",
//     "mapTiling": { 
//       "repeatX": 20,
//       "repeatY": 20,
//     },
//   },
//   "Asphalt_light": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "Asphalt_light.jpg",
//     "mapTiling": { 
//       "repeatX": 20,
//       "repeatY": 20,
//     },
//   },
//   "Material_30": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(98,98,98)"),
//   },
//   "Building_bake": {
//     "type": new THREE.MeshBasicMaterial(),
//     "color": new THREE.Color("rgb(230,230,230)"),
//     "map": "Building_bake.jpg",
//   },
//   "concreat_offroad": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "concreat_offroad.jpg",
//     "mapTiling": { 
//       "repeatX": 20,
//       "repeatY": 20,
//     },
//   },
//   "gate.Material": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(86,86,86)"),
//   },
//   "Grass": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(235,235,235)"),
//     "map": "Grass_bake.jpg",
//     "aoMap": "occ_grass_map.jpg",
//     "aoMapIntensity": 1.5,
//   },
//   "Material_31": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(197,197,197)"),
//   },
//   "mud bumper": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "mud bumper.jpg",
//     "mapTiling": { 
//       "repeatX": 5,
//       "repeatY": 5,
//     },
//   },
//   "sand bumper": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "sand bumper.jpg",
//     "mapTiling": { 
//       "repeatX": 5,
//       "repeatY": 5,
//     },
//   },
//   "offroad grass": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "offroad grass.jpg",
//     "mapTiling": { 
//       "repeatX": 5,
//       "repeatY": 5,
//     },
//   },
//   "outside_concreate": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "outside_concreate.png",
//   },
//   "offroad grass": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "offroad grass.jpg",
//     "mapTiling": { 
//       "repeatX": 5,
//       "repeatY": 5,
//     },
//   },
//   "outside_con2": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(127,127,127)"),
//   },
//   "pebble bumper": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "pebble bumper.jpg",
//     "mapTiling": { 
//       "repeatX": 5,
//       "repeatY": 5,
//     },
//   },
//   "sand ground": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "sand ground.jpg",
//     "mapTiling": { 
//       "repeatX": 5,
//       "repeatY": 5,
//     },
//   },
//   "stone bumper": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "stone bumper.jpg",
//     "mapTiling": { 
//       "repeatX": 5,
//       "repeatY": 5,
//     },
//   },
//   "technoringText.material": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(25,25,25)"),
//   },
//   "tree": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "tree.jpg",
//   },
//   "tree base": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(95,81,77)"),
//   },
//   "road03": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "road03.jpg",
//     "mapTiling": { 
//       "repeatX": 1,
//       "repeatY": 50,
//     },
//   },
//   "water": {
//     "type": new THREE.MeshBasicMaterial(),
//     "color": new THREE.Color("rgb(164,175,183)"),
//     "transparent": true,
//     "opacity": 0.3,
//   },
//   "white_road": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "white_road.jpg",
//     "mapTiling": { 
//       "repeatX": 20,
//       "repeatY": 20,
//     },
//   },
//   "windowFrame.material": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(61,61,61)"),
//   },
//   "wood bumper": {
//     "type": new THREE.MeshPhongMaterial(),
//     "color": new THREE.Color("rgb(255,255,255)"),
//     "map": "wood bumper.jpg",
//     "mapTiling": { 
//       "repeatX": 1,
//       "repeatY": 1,
//     },
//   },
// } 

export const MATERIALS = {
  "BG_K9A1_obj": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(200,200,200)"),
    "map": "baked-BG_K9A1Shape.jpg",
    // "alphaMap": "bg_alpha.png",
    "transparent": true,
  },
  
  "k9a1_body_s": {
    "type": new THREE.MeshPhongMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "k9a1_body.jpg",
  },
  "k9a1_parts_s": {
    "type": new THREE.MeshPhongMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "k9a1_parts.jpg",
  },

  "k9a1_wheel_01_s": {
    "type": new THREE.MeshPhongMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "k9a1_wheel_01.jpg",
  },
  "k9a1_wheel_02_s": {
    "type": new THREE.MeshPhongMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "k9a1_wheel_02.jpg",
  },
  "k9a1_wheel_front_s": {
    "type": new THREE.MeshPhongMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "k9a1_wheel_front.jpg",
  },
  "k9a1_wheel_rear_s": {
    "type": new THREE.MeshPhongMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "k9a1_wheel_rear.jpg",
  },
} 