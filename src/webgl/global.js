import * as THREE from 'three'

export const STATE = {
  IS_MOBILE: false,
  CURRENT_SCENE: {
    NAME: '',
    VISIBLE: false
  },

  movementX: 1.61,
  moveSpeedLine: 0.0056,

  ENABLE_MOUSE_INTERACTION: false,
  ENABLE_RENDERING: false,
  UV_ANIMATED_OBJECTS: {
    desertFloor: {
      mesh: null,
      animate: function() { 
        if(this.mesh && this.mesh.material.map != undefined) this.mesh.material.map.offset.x += 0.001 
      }
    },
    rails: {
      mesh: null,
      animate: function() {
        if(this.mesh && this.mesh.material.map != undefined) this.mesh.material.map.offset.x -= 0.008 
      }
    },
    speedLine: {
      mesh: null,
      animate: function() { 
        // console.log(this.mesh)
        if(this.mesh && this.mesh.material.alphaMap != undefined) this.mesh.material.alphaMap.offset.y -= STATE.moveSpeedLine
      }
    },
    speedLine1: {
      mesh: null,
      animate: function() { 
        // console.log(this.mesh)
        if(this.mesh && this.mesh.material.alphaMap != undefined) this.mesh.material.alphaMap.offset.y -= STATE.moveSpeedLine
      }
    },
    speedLine2: {
      mesh: null,
      animate: function() { 
        // console.log(this.mesh)
        if(this.mesh && this.mesh.material.alphaMap != undefined) this.mesh.material.alphaMap.offset.y -= STATE.moveSpeedLine
      }
    },
  },
  ANIMATED_OBJECTS: {
    desertMountain: {
      mesh: null,
      animate: function() { 
        if(this.mesh) this.mesh.rotation.z += 0.0001 
      }
    },

    // [TODO] each..
    rock1: {
      mesh: null,
      animate: function() {
        if(this.mesh != undefined) {
          this.mesh.position.x -= STATE.movementX
          // console.log(this.mesh.position.x)
          if(this.mesh.position.x < -300) {
            this.mesh.position.x = 270
          }
        }
      }
    },
    rock2: {
      mesh: null,
      animate: function() {
        if(this.mesh != undefined) {
          this.mesh.position.x -= STATE.movementX
          // console.log(this.mesh.position.x)
          if(this.mesh.position.x < -300) {
            this.mesh.position.x = 270
          }
        }
      }
    },
    soil2: {
      mesh: null,
      animate: function() {
        if(this.mesh != undefined) {
          this.mesh.position.x -= STATE.movementX
          // console.log(this.mesh.position.x)
          if(this.mesh.position.x < -300) {
            this.mesh.position.x = 270
          }
        }
      }
    },

  },
  ANIMATIONS: {
    _k9Tank: {
      mixer: null,
    },
    _REDBACK: {
      mixer: null,
    },
  },
  IS_FOCUSED: false,
  ZONE_FOCUS:{
    reset: {
      position: new THREE.Vector3(0,0,0),
      target: new THREE.Vector3(0,0,0),
    },
    longFiringRange: {
      position: new THREE.Vector3(3.8,-0.36,-1.47),
      target: new THREE.Vector3(0,0,0),
    },
    mobility: {
      position: new THREE.Vector3(3.8,-0.36,-1.47),
      target: new THREE.Vector3(0,0,0),
    },
    automaticControlSystem: {
      position: new THREE.Vector3(3.8,-0.36,-1.47),
      target: new THREE.Vector3(0,0,0),
    },
    // funcPoint2: {
    //   position: new THREE.Vector3(-6,2,3),
    //   target: new THREE.Vector3(0,0,0),
    // },
    // straightLane: {
    //   position: new THREE.Vector3(-6,2,3),
    //   target: new THREE.Vector3(0,0,0),
    // },
    // shortTrack: {
    //   position: new THREE.Vector3(-6,2,3),
    //   target: new THREE.Vector3(0,0,0),
    // },
    // longTrack: {
    //   position: new THREE.Vector3(-6,2,3),
    //   target: new THREE.Vector3(0,0,0),
    // }
  }
}

export const ASSETS = {
  K9: {
    MODEL_FILES: [
      {
        name: 'k9Tank',
        loaded: false,
        path : 'glb/k9a1.glb',
        asset: null
      },
      {
        name: 'indoorBg',
        loaded: false,
        path : 'glb/indoor-bg.glb',
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
  REDBACK: {
    MODEL_FILES: [
      {
        name: 'redback',
        loaded: false,
        path : 'glb/redback.glb',
        asset: null
      },
      {
        name: 'redbackIndoorBg',
        loaded: false,
        path : 'glb/redback-indoor-bg.glb',
        asset: null
      },
      {
        name: 'desertBg',
        loaded: false,
        path : 'glb/desert-bg.glb',
        asset: null
      },
      // {
      //   name: 'snowBg',
      //   loaded: false,
      //   path : 'glb/snow-bg.glb',
      //   asset: null
      // }
    ],
    TEXTURES_FILES: []
  },
}
