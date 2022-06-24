import * as THREE from 'three'

export const STATE = {
  IS_MOBILE: false,
  CURRENT_SCENE: {
    NAME: '',
    VISIBLE: false
  },
  ENABLE_MOUSE_INTERACTION: false,
  ENABLE_RENDERING: false,
  UV_ANIMATED_OBJECTS: {
    // desertFloor: {
    //   mesh: null,
    //   animate: function() { 
    //     if(this.mesh.material.map != undefined) this.mesh.material.map.offset.x += 0.006 
    //   }
    // },
    // rails: {
    //   mesh: null,
    //   animate: function() { 
    //     if(this.mesh.material.map != undefined) this.mesh.material.map.offset.x -= 0.008 
    //   }
    // }
  },
  ANIMATED_OBJECTS: {
    // desertMountain: {
    //   mesh: null,
    //   animate: function() { 
    //     this.mesh.rotation.z += 0.0001 
    //   }
    // }
  },
  IS_FOCUSED: false,
  ZONE_FOCUS:{
    reset: {
      position: new THREE.Vector3(0,0,0),
      target: new THREE.Vector3(0,0,0),
    },
    funcPoint1: {
      position: new THREE.Vector3(4.8,1,3),
      target: new THREE.Vector3(0,0,0),
    },
    funcPoint2: {
      position: new THREE.Vector3(-6,2,3),
      target: new THREE.Vector3(0,0,0),
    },
    straightLane: {
      position: new THREE.Vector3(-6,2,3),
      target: new THREE.Vector3(0,0,0),
    },
    shortTrack: {
      position: new THREE.Vector3(-6,2,3),
      target: new THREE.Vector3(0,0,0),
    },
    longTrack: {
      position: new THREE.Vector3(-6,2,3),
      target: new THREE.Vector3(0,0,0),
    }
  }
}

export const ASSETS = {
  K9: {
    MODEL_FILES: [
      {
        name: 'k9Tank',
        loaded: false,
        path : 'glb/k9-tank.glb',
        asset: null
      },
      {
        name: 'desertBg',
        loaded: false,
        path : 'glb/desert-bg.glb',
        asset: null
      },
      {
        name: 'indoorBg',
        loaded: false,
        path : 'glb/indoor-bg.glb',
        asset: null
      }
    ],
    TEXTURES_FILES: []
  },
  REDBACK: {
    MODEL_FILES: [
      {
        name: 'k9Tank',
        loaded: false,
        path : 'glb/k9-tank.glb',
        asset: null
      },
      {
        name: 'snowBg',
        loaded: false,
        path : 'glb/snow-bg.glb',
        asset: null
      }
    ],
    TEXTURES_FILES: []
  },
}
