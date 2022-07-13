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
    "map": "REDBACK_Head_s.jpg",
    "emissiveMap": "REDBACK_Head_s.jpg",
    "normalMap": "REDBACK_Head_N.jpg",
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
    "map": "REDBACK_Body_s.jpg",
    "emissiveMap": "REDBACK_Body_s.jpg",
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
    "map": "REDBACK_Track_s.jpg",
    "emissiveMap": "REDBACK_Track_s.jpg",
    // "normalMap": "TANK_K9A1_TrackWheel_N.jpg",
    "flipY": false,
    "roughness": 1.0,
    "metalness": 0.0,
    "reflectivity": 0.5,
    "clearcoat": 1.0,
    "clearcoatRoughness": 0.4,
    "side": THREE.DoubleSide,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
  },
  "TANK_REDBACK_Track_UVAni_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "REDBACK_Track_s.jpg",
    // "emissiveMap": "REDBACK_Track_s.jpg",
    // "normalMap": "REDBACK_Track_s_N.jpg",
    "flipY": false,
    "roughness": 1.0,
    "metalness": 0.0,
    "reflectivity": 0.5,
    "clearcoat": 1.0,
    "clearcoatRoughness": 0.4,
    "side": THREE.DoubleSide,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
  },

  "TANK_REDBACK_Wheel_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "REDBACK_Track_s.jpg",
    "flipY": false,
  },

  "BG_Desert_Floor_TankShadow_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(5,8,10)"),
    "transparent": true,
    "alphaMap": "BG_Snow_Floor_TankShadow_A.jpg",
  },
  "BG_Desert_TrackSkid_UVAni_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "alphaMap": "TrackSkid_A.jpg",
    "transparent": true,
    "opacity": 0.4,
    "alphaMapTiling":{
      repeatX: 1,
      repeatY: 1,
    }
  },
  "BG_Desert_Dust_SeqAni_s": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "alphaMap": "dirt_spritesheet_horizon.png",
    "transparent": true,
    "depthWrite": false,
  },
}