import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(0.6, 0.6, 0.6),
  position: new THREE.Vector3(-0.75, -0.35, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "snow_Tex_04": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "baked-Aset_nature_embankment_L_vcyiccyga_LOD5Shape.jpg",
    "flipY": false,
  },
  "snow_Tex_03": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "baked-Aset_nature_snow_L_vefkajufa_LOD5Shape.jpg",
    "flipY": false,
  },
  "snow_Tex_01": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "baked-Aset_nature_embankment_L_vcytca0fa_LOD5Shape.jpg",
    "flipY": false,
  },


  "snow_Tex_02": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "baked-Aset_nature_embankment_L_vcyhedzga_LOD4Shape.jpg",
    "flipY": false,
  },
  
  "snow_Tex_05": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "baked-Aset_nature_snow_L_vdbmabvva_LOD5Shape.jpg",
    "flipY": false,
  },

  "lambert3": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "AM113_028_Picea1.png",
    "flipY": false,
  },
  "lambert4": {
    "type": new THREE.MeshBasicMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "AM113_028_Picea.jpeg",
    "flipY": false,
  },
  
  
  
  
} 