import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(10.5, 10.5, 10.5),
  position: new THREE.Vector3(0, -1.0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "TANK_REDBACK_Head_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "RedBack_Head_D_Color.jpg",
    "emissiveMap": "RedBack_Head_D_Color.jpg",
    "normalMap": "RedBack_Head_N.jpg",
    "flipY": false,
    "roughness": 1.0,
    "metalness": 0.0,
    "reflectivity": 0.5,
    "clearcoat": 1.0,
    "clearcoatRoughness": 0.4,
  },
  
  "TANK_REDBACK_Body_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "REDBACK_BODY.jpg",
    "emissiveMap": "REDBACK_BODY.jpg",
    "normalMap": "REDBACK_Body_N.jpg",
    "flipY": false,
    "roughness": 1.0,
    "metalness": 0.0,
    "reflectivity": 0.5,
    "clearcoat": 1.0,
    "clearcoatRoughness": 0.4,
  },
  "TANK_REDBACK_Track_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "REDBACK_TrackWheel.jpg",
    "emissiveMap": "REDBACK_TrackWheel.jpg",
    "normalMap": "REDBACK_TrackWheel_N.jpg",
    "emissive": new THREE.Color("rgb(255,255,255)"),
    "emissiveIntensity": 3.0,
    "flipY": false,
    "roughness": 0.66,
    "metalness": 0.0,
    "reflectivity": 0.5,
    "clearcoat": 1.0,
    "clearcoatRoughness": 0.4,
    "side": THREE.DoubleSide,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
    "specularMapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
    "emissiveMapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
    "normalMapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
  },
  // "TANK_REDBACK_Track_UVAni_s": {
  //   "type": new THREE.MeshPhysicalMaterial(),
  //   "color": new THREE.Color("rgb(255,255,255)"),
  //   "map": "REDBACK_TrackWheel.jpg",
  //   "normalMap": "REDBACK_TrackWheel_N.jpg",
  //   "flipY": false,
  //   "roughness": 1.0,
  //   "metalness": 0.0,
  //   "reflectivity": 0.5,
  //   "clearcoat": 1.0,
  //   "clearcoatRoughness": 0.4,
  //   "side": THREE.DoubleSide,
  //   "mapTiling":{
  //     repeatX: 1,
  //     repeatY: 1,
  //   },
  //   "specularMapTiling":{
  //     repeatX: 1,
  //     repeatY: 1,
  //   },
  //   "emissiveMapTiling":{
  //     repeatX: 1,
  //     repeatY: 1,
  //   },
  //   "normalMapTiling":{
  //     repeatX: 1,
  //     repeatY: 1,
  //   },
  // },

  "TANK_REDBACK_Wheel_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "REDBACK_TrackWheel.jpg",
    "normalMap": "REDBACK_TrackWheel_N.jpg",
    "flipY": false,
  },

  "BG_Desert_Floor_TankShadow_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(43,29,18)"),
    "alphaMap": "BG_Desert_Floor_TankShadow_A.jpg",
    "transparent": true,
    "opacity": 0.4,
  },
  "BG_Desert_TrackSkid_UVAni_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "Tire_D.jpg",
    "alphaMap": "Tire_Alpha.jpg",
    "transparent": true,
    "opacity": 0.5,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
    "alphaMapTiling":{
      repeatX: 1,
      repeatY: 1,
    }
  },
  "BG_Desert_Dust_SeqAni_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(165,127,89)"),
    "alphaMap": "spritesheet_dirt.png",
    "transparent": true,
    "depthWrite": false,
  },
}