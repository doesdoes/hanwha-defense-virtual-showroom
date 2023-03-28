import * as THREE from 'three'

export const STATE = {
  IS_MOBILE: false,
  CURRENT_SCENE: {
    NAME: '',
    VISIBLE: false
  },

  movementX: 1.61,
  moveSpeedLine: 0.0156,
  tile: 0,

  ENABLE_MOUSE_INTERACTION: false,
  ENABLE_RENDERING: false,
  UV_ANIMATED_OBJECTS: {
    rails: {
      mesh: null,
      animate: function() {
        if(this.mesh && this.mesh.material.map != undefined) this.mesh.material.map.offset.x -= 0.0016
        if(this.mesh && this.mesh.material.specularMap != undefined) this.mesh.material.specularMap.offset.x -= 0.0016
        if(this.mesh && this.mesh.material.emissiveMap != undefined) this.mesh.material.emissiveMap.offset.x -= 0.0016
        if(this.mesh && this.mesh.material.normalMap != undefined) this.mesh.material.normalMap.offset.x -= 0.0016
      }
    },
    redbackRails: {
      mesh: null,
      animate: function() {
        if(this.mesh && this.mesh.material.map != undefined) this.mesh.material.map.offset.x += 0.0012
        if(this.mesh && this.mesh.material.specularMap != undefined) this.mesh.material.specularMap.offset.x += 0.0012
        if(this.mesh && this.mesh.material.emissiveMap != undefined) this.mesh.material.emissiveMap.offset.x += 0.0012
        if(this.mesh && this.mesh.material.normalMap != undefined) this.mesh.material.normalMap.offset.x += 0.0012
      }
    },
    desertSpeedLine: {
      mesh: null,
      animate: function() { 
        if(this.mesh && this.mesh.material.alphaMap != undefined) this.mesh.material.alphaMap.offset.y -= STATE.moveSpeedLine
      }
    },
    snowSpeedLine: {
      mesh: null,
      animate: function() { 
        if(this.mesh && this.mesh.material.alphaMap != undefined) this.mesh.material.alphaMap.offset.y -= STATE.moveSpeedLine
      }
    },
    snowFloor: {
      mesh: null,
      animate: function() { 
        if(this.mesh && this.mesh.material.map != undefined) this.mesh.material.map.offset.y += 0.020 
      }
    },
    desertFloor: {
      mesh: null,
      animate: function() { 
        if(this.mesh && this.mesh.material.map != undefined) this.mesh.material.map.offset.y += 0.03 
      }
    },
    snowMountain: {
      mesh: null,
      animate: function() { 
        if(this.mesh && this.mesh.material.map != undefined) {
          this.mesh.material.map.offset.x += 0.000120
          this.mesh.material.alphaMap.offset.x += 0.000120
        }
      }
    },
    desertMountain: {
      mesh: null,
      animate: function() { 
        if(this.mesh && this.mesh.material.map != undefined) {
          this.mesh.material.map.offset.x += 0.000120
          this.mesh.material.alphaMap.offset.x += 0.000120
        }
      }
    },
    tireLine: {
      mesh: null,
      animate: function() { 
        if(this.mesh && this.mesh.material.alphaMap != undefined) {
          this.mesh.material.alphaMap.offset.y -= 0.150
        }
      }
    },
    redbackTireLine: {
      mesh: null,
      animate: function() { 
        if(this.mesh && this.mesh.material.alphaMap != undefined) {
          this.mesh.material.alphaMap.offset.y -= 0.150
          this.mesh.material.map.offset.y -= 0.150
        }
      }
    },

    clouds: {
      mesh: null,
      animate: function() {
        if(this.mesh && this.mesh.material.map != undefined) 
          this.mesh.material.map.offset.x += 0.00006
      }
    },
    earthDay: {
      mesh: null,
      animate: function() {
        if(this.mesh && this.mesh.material.map != undefined) 
          this.mesh.material.map.offset.x -= 0.00005
      }
    },
    earthNight: {
      mesh: null,
      animate: function() {
        if(this.mesh && this.mesh.material.lightMap != undefined)
          this.mesh.material.lightMap.offset.x -= 0.00005
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
    snowMountain: {
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

    rocket: {
      mesh: null,
      animate: function() { 
        if(this.mesh) this.mesh.rotation.z -= 0.001 
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
    _SNOW: {
      mixer: null,
    },
    _DESERT: {
      mixer: null,
    },
    _KSLV: {
      mixer: null,
    },
    _KSLV_CAMERA: {
      mixer: null,
    },
  },
  IS_FOCUSED: false,
  ZONE_FOCUS:{
    reset: {
      position: new THREE.Vector3(0,0,0),
      target: new THREE.Vector3(0,0,0),
      sobelObj: new THREE.Mesh(),
    },

    k9a1Origin: {
      position: new THREE.Vector3(3.99, 0.095, -2.94),
      positionM: new THREE.Vector3(8.59, 0.22, -6.35),
      target: new THREE.Vector3(0,0,0),
      minAzimuth: -Infinity,
      maxAzimuth: Infinity,
    },
    redbackOrigin: {
      position: new THREE.Vector3(2.87, -0.02, -2.37),
      positionM: new THREE.Vector3(6.74, -0.04, -5.56),
      target: new THREE.Vector3(0,0,0),
      minAzimuth: -Infinity,
      maxAzimuth: Infinity,
    },
    kslvOrigin: {
      position: new THREE.Vector3(0, 0, 80),
      positionM: new THREE.Vector3(0, 0, 80),
      target: new THREE.Vector3(0,0,0),
      minAzimuth: -0.7,
      maxAzimuth: 0.7,
    },
    kslvGalaxyOrigin: {
      position: new THREE.Vector3(8.48, -2.99, -14.73),
      positionM: new THREE.Vector3(8.48, -2.99, -14.73),
      target: new THREE.Vector3(0,0,0),
      minAzimuth: 2.5,
      maxAzimuth: 3.1,
    },

    longerFiringRange: {
      position: new THREE.Vector3(3.8,-0.36,-1.47),
      target: new THREE.Vector3(0,0,0),
      minAzimuth: THREE.MathUtils.degToRad(60),
      maxAzimuth: THREE.MathUtils.degToRad(110),
      sobelObj: new THREE.Mesh(),
    },
    highMobility: {
      position: new THREE.Vector3(-0.34,-0.37,-3.26),
      target: new THREE.Vector3(0,0,0),
      targetOffset: new THREE.Vector3(0,0.5,0),
      minAzimuth: THREE.MathUtils.degToRad(150),
      maxAzimuth: THREE.MathUtils.degToRad(190),
      sobelObj: new THREE.Mesh(),
    },
    automaticControlSystem: {
      position: new THREE.Vector3(0.72,1.35,1.91),
      target: new THREE.Vector3(0,0,0),
      minAzimuth: THREE.MathUtils.degToRad(0),
      maxAzimuth: THREE.MathUtils.degToRad(60),
      sobelObj: new THREE.Mesh(),
    },
    ammunitionLoader: {
      position: new THREE.Vector3(-4.45,0.10,0.24),
      target: new THREE.Vector3(0,0,0),
      minAzimuth: THREE.MathUtils.degToRad(250),
      maxAzimuth: THREE.MathUtils.degToRad(300),
      sobelObj: new THREE.Mesh(),
    },
    irCamera: {
      position: new THREE.Vector3(3.8,-0.36,-1.47),
      target: new THREE.Vector3(0,0,0),
      targetOffset: new THREE.Vector3(0,0.5,0),
      minAzimuth: THREE.MathUtils.degToRad(60),
      maxAzimuth: THREE.MathUtils.degToRad(110),
      sobelObj: new THREE.Mesh(),
    },

    mainArmamentSystem: {
      position: new THREE.Vector3(1.76,-0.10,1.39),
      target: new THREE.Vector3(0,0,0),
      minAzimuth: THREE.MathUtils.degToRad(50),
      maxAzimuth: THREE.MathUtils.degToRad(110),
      sobelObj: new THREE.Mesh(),
    },
    antiTankArmamentSystem: {
      position: new THREE.Vector3(0.60,0.49,2.51),
      target: new THREE.Vector3(0,0,0),
      minAzimuth: THREE.MathUtils.degToRad(0),
      maxAzimuth: THREE.MathUtils.degToRad(40),
      sobelObj: new THREE.Mesh(),
    },
    bestMobility: {
      position: new THREE.Vector3(2.51,-0.69,0.52),
      target: new THREE.Vector3(0,0,0),
      targetOffset: new THREE.Vector3(0,0.2,0),
      minAzimuth: THREE.MathUtils.degToRad(60),
      maxAzimuth: THREE.MathUtils.degToRad(110),
      sobelObj: new THREE.Mesh(),
    },
    superiorProtection: {
      position: new THREE.Vector3(0.13,-0.217,2.70),
      target: new THREE.Vector3(0,0,0),
      minAzimuth: THREE.MathUtils.degToRad(0),
      maxAzimuth: THREE.MathUtils.degToRad(20),
      sobelObj: new THREE.Mesh(),
    },
    isuRubberTrack: {
      position: new THREE.Vector3(0.28,-0.59,-2.08),
      target: new THREE.Vector3(0,0,0),
      targetOffset: new THREE.Vector3(0,0.4,0),
      sobelObj: new THREE.Mesh(),
    },

    ton75classEngine: {
      position: new THREE.Vector3(-0.356, -22.09, 3.56),
      target: new THREE.Vector3(-0.38, -22.40, 1.82),
      minAzimuth: -Infinity,
      maxAzimuth: Infinity,
    },
    engineClustering: {
      position: new THREE.Vector3(5.6, -21.49, 2.96),
      target: new THREE.Vector3(1.26, -22.33, 0.74),
      // targetOffset: new THREE.Vector3(1,0,0),
      minAzimuth: -Infinity,
      maxAzimuth: Infinity,
    },
    liquidEngineFuelSystem: {
      position: new THREE.Vector3(10.09, -6.018, 14.71),
      target: new THREE.Vector3(0, -8.84, 2.30),
      minAzimuth: -Infinity,
      maxAzimuth: Infinity,
    },
    ton7classEngine: {
      position: new THREE.Vector3(1.172, -1.75, -11.80),
      target: new THREE.Vector3(0.8364, -1.3009, -5.1432),
      minAzimuth: -Infinity,
      maxAzimuth: Infinity,
    },
    collisionPreventionSystem: {
      position: new THREE.Vector3(7.13, 4.14, -3.42),
      target: new THREE.Vector3(2.1686, 2.8143, 2.6509),
      minAzimuth: -Infinity,
      maxAzimuth: Infinity,
    },
  }
}

export const LIGHTS = {
  TANK: {
    drLightRight: new THREE.DirectionalLight( 0xffffff, 1.0 ),
    drLightLeft: new THREE.DirectionalLight( 0xffffff, 1.0 ),
    hemiLight: new THREE.HemisphereLight( 0xFFFFFF, 0xFFFFFF, 1 )
  }
}

export const ASSETS = {
  K9A1: {
    MODEL_FILES: [
      {
        name: 'k9Tank',
        loaded: false,
        path : 'glb/k9a1.glb',
        asset: null
      },
      {
        name: 'k9a1IndoorBg',
        loaded: false,
        path : 'glb/k9a1-indoor-bg.glb',
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
    ],
    TEXTURES_FILES: []
  },
  KSLV: {
    MODEL_FILES: [
      {
        name: 'kslv',
        loaded: false,
        path : 'glb/KSLV.glb',
        asset: null
      },
      {
        name: 'kslvDome',
        loaded: false,
        path : 'glb/KSLV-dome.glb',
        asset: null
      },
      {
        name: 'camera',
        loaded: false,
        path : 'glb/camera.glb',
        asset: null
      },
      {
        name: 'kslvLauncher',
        loaded: false,
        path : 'glb/KSLV-launcher.glb',
        asset: null
      },
    ],
    TEXTURES_FILES: [],
    HDR_FILES: [
      {
        name: 'test',
        loaded: false,
        path : 'hdr/Galaxy_hdr.hdr',
        asset: null
      },
    ]
  }
}
