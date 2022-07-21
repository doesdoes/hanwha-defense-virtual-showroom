import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import TWEEN from '@tweenjs/tween.js'
import { Webgl } from './class/Webgl.js'
import * as SCENE from './scene.js'
import * as LOADER from './loader.js'
import { STATE, ASSETS } from './global.js'
import { setCondition } from './interactions'
import data from './data'
import { setIndicator } from './scene'

window.isAnim
window._WEBGL = (function() {
  /**
   * Create WEBGL context object
   *
   * @param {string} parentContainerClass class of the wrapper container
   * @param {string} _containerId id of the container holding the webgl scene
   * @param {boolean} _debug enable / disable debug
   * @param {boolean} _isMobile set target device
   */
  function createContext(_parentContainerClass, _containerId, _debug, _isMobile = false){
    let host = window.location.host

    switch (host) {
      case 'dev.does.kr':
        // STATE.ASSET_DOMAIN_PATH = `https://${host}/doeslab/technoring/assets`
        STATE.ASSET_DOMAIN_PATH = `https://${host}/2022/showroom/assets`
        break
      case 'hdw.doesbook.kr':
        // STATE.ASSET_DOMAIN_PATH = `https://${host}/doeslab/technoring/assets`
        STATE.ASSET_DOMAIN_PATH = `https://${host}/assets/webgl`
        break
      default:
        STATE.ASSET_DOMAIN_PATH = `http://${host}/assets/webgl`
        break
    }
   
    STATE.DRACO_LOADER = new DRACOLoader()
    STATE.DRACO_LOADER.setDecoderPath( `${STATE.ASSET_DOMAIN_PATH}/draco/` )

    STATE.IS_MOBILE = _isMobile
    STATE.WEBGL = new Webgl({
      parentContainerClass: _parentContainerClass,
      container: document.getElementById(_containerId),
      sceneOptions: { backgroundColor: 0xd1e4f0 },
      // k9a1 기준
      cameraOptions: { fov: 45, near: 0.1, far: 1000, x: 4.15, y: -0.01, z: -2.0 },
      isDebug: _debug
    })

    //start webgl render loop
    render()

    // for performance debugging
    if(STATE.WEBGL.isDebug){
      document.addEventListener( 'keyup', (event) => {
        if ( event.key == 'i' ){
          console.table( STATE.WEBGL.renderer.info.memory )
          console.table( STATE.WEBGL.renderer.info.render )
          console.log( STATE.WEBGL.scene )
        }
        if ( event.key == 'r' ) STATE.ENABLE_RENDERING ? toggleRendering( false ) : toggleRendering( true )

        if ( event.key == '1' ) {
          SCENE.toggleStages(true, 'k9a1IndoorBg')
          SCENE.toggleStages(false, 'snowBg')
        }
        if ( event.key == '2' ) {
          SCENE.toggleStages(true, 'snowBg')
          SCENE.toggleStages(false, 'k9a1IndoorBg')
        }

        if ( event.key == 'c' ) {
          console.log(STATE.WEBGL.camera.position, STATE.WEBGL.camera)
        }

        if ( event.key == 'q' ) {
          SCENE.focusOnRegion('reset')
        }

        // if ( event.key == 'a' ) {
        //   console.log(STATE.WEBGL.camera.position)

        //   STATE.WEBGL.cameraControls.setLookAt( 
        //     STATE.WEBGL.camera.position.x -= 0.01,
        //     STATE.WEBGL.camera.position.y,
        //     STATE.WEBGL.camera.position.z,
        //     0,
        //     0,
        //     0,
        //     false
        //   )
        // }

        // if ( event.key == 'd' ) {
        //   STATE.WEBGL.cameraControls.setLookAt( 
        //     STATE.WEBGL.camera.position.x += 0.01,
        //     STATE.WEBGL.camera.position.y,
        //     STATE.WEBGL.camera.position.z,
        //     0,
        //     0,
        //     0,
        //     false
        //   )
        // }

        // if ( event.key == 'w' ) {
        //   console.log(STATE.WEBGL.camera.position)

        //   STATE.WEBGL.cameraControls.setLookAt( 
        //     STATE.WEBGL.camera.position.x,
        //     STATE.WEBGL.camera.position.y -= 0.01,
        //     STATE.WEBGL.camera.position.z,
        //     0,
        //     0,
        //     0,
        //     false
        //   )

        //   console.log(STATE.WEBGL.camera.position)
        // }

        // if ( event.key == 's' ) {
        //   STATE.WEBGL.cameraControls.setLookAt( 
        //     STATE.WEBGL.camera.position.x,
        //     STATE.WEBGL.camera.position.y += 0.01,
        //     STATE.WEBGL.camera.position.z,
        //     0,
        //     0,
        //     0,
        //     false
        //   )
        // }

      }, false)
    }

    setCondition()
    setIndicator()

    if(STATE.WEBGL.isDebug) console.log(`WEBGL: context created!!`)
  }

  /**
   * Load WEBGL assets
   *
   * @param {string} sceneName name of the scene to load
   * @return {callback} return a callback when all assets are loaded
   */
  function loadAssets(_sceneName, _callback){
    const LOADING_MANAGER = new THREE.LoadingManager()
    LOADING_MANAGER.onProgress = ( url, itemsLoaded, itemsTotal ) => { if(STATE.WEBGL.isDebug) console.log( `%cLoading file: ${url} (${itemsLoaded}/${itemsTotal})`,'color:#787878;') }
    LOADING_MANAGER.onError = url => console.log('There was an error loading '+url)

    switch (_sceneName) {
      case 'K9A1':
        LOADER.loadGLTF(LOADING_MANAGER, ASSETS.K9A1.MODEL_FILES, STATE.ASSET_DOMAIN_PATH, STATE.DRACO_LOADER)
        break
      case 'REDBACK':
        LOADER.loadGLTF(LOADING_MANAGER, ASSETS.REDBACK.MODEL_FILES, STATE.ASSET_DOMAIN_PATH, STATE.DRACO_LOADER)
        break
    }

    LOADING_MANAGER.onLoad = function () {
      if(STATE.WEBGL.isDebug) console.log(`WEBGL: assets for %c${_sceneName} %cloaded!`,'color:#3c6bef;','color:#unherit;')
      return _callback()
    }
  }

  /**
   * Init stage scene
   *
   * @param {string} sceneName name of the scene to load
   * @return {void}
   */
  function initScene(_sceneName, callback){
    if(STATE.WEBGL.isDebug) console.log(`WEBGL: scene %c${_sceneName} %cinitialized!`,'color:#3c6bef;','color:#unherit;')

    //load stage
    switch (_sceneName) {
      case 'K9A1':
        SCENE.loadStage('K9A1', callback)
        break
      case 'REDBACK':
        SCENE.loadStage('REDBACK', callback)
        break
    }
  }

  /**
   * Toggle stage scene
   *
   * @param {string} sceneName name of the scene to toggle
   * @param {boolean} toggle enable / disable scene visibility
   * @return {void}
   */
  function toggleScene(_sceneName, _toggle){
    if(STATE.WEBGL.isDebug) console.log(`WEBGL: scene %c${_sceneName} %cvisibility: ${_toggle}!`,'color:#3c6bef;','color:#unherit;')

    if( _toggle ) STATE.CURRENT_SCENE.NAME = _sceneName
    // STATE.CURRENT_SCENE.VISIBLE = _toggle
    // SCENE.toggleStages(_toggle, _sceneName)
    //Update indicator
    
    const $condition = document.getElementById('change-condition')
    const $parts = document.querySelectorAll('.indicator-panel .part')

    if(_sceneName === "K9A1") {
      SCENE.toggleStages(_toggle, 'k9Tank')
      SCENE.toggleStages(_toggle, 'k9a1IndoorBg')
      SCENE.toggleStages(false, 'snowBg')

      $condition.setAttribute('data-item', 'k9a1IndoorBg')
      Array.from($parts).map((part, idx) => {
        const $txt = part.querySelector('.txt')
        const partData = data['k9a1-indicators'][idx]
        $txt.textContent = partData.title
        part.setAttribute('data-feature', partData.id)
      })

      if(_toggle) {
        STATE.ZONE_FOCUS.reset.position = STATE.ZONE_FOCUS.k9a1Origin.position
        SCENE.focusOnRegion('reset')
      }
    } else {
      SCENE.toggleStages(_toggle, 'redback')
      SCENE.toggleStages(_toggle, 'redbackIndoorBg')
      SCENE.toggleStages(false, 'desertBg')

      $condition.setAttribute('data-item', 'redbackIndoorBg')
      Array.from($parts).map((part, idx) => {
        const $txt = part.querySelector('.txt')
        const partData = data['redback-indicators'][idx]
        $txt.textContent = partData.title
        part.setAttribute('data-feature', partData.id)
      })
      if(_toggle) {
        STATE.ZONE_FOCUS.reset.position = STATE.ZONE_FOCUS.redbackOrigin.position
        SCENE.focusOnRegion('reset')
      }
    }

    // [TEMP]
    STATE.hemisphereLight.color = new THREE.Color(0xFFFFFF)
    STATE.hemisphereLight.groundColor = new THREE.Color(0xFFFFFF)
  }

  /**
   * Toggle webgl rendering
   *
   * @param {boolean} toggle enable / disable rendering
   * @return {void}
   */
  function toggleRendering( _toggle ){
    if(STATE.WEBGL.isDebug) console.log(`WEBGL: %crendering ${_toggle}!`,'color:#eb8334;')
    STATE.ENABLE_RENDERING = _toggle
  }

  function render( time ){
    requestAnimationFrame( render )

    if( !STATE.ENABLE_RENDERING ) return

    STATE.WEBGL.cameraControls.normalizeRotations()
    STATE.WEBGL.cameraControls.update( STATE.WEBGL.cameraClock.getDelta() )

    // update animation mixer
    const dTime = STATE.WEBGL.clock.getDelta()
    for (let key in STATE.ANIMATIONS) {
      if(STATE.ANIMATIONS[key].mixer) STATE.ANIMATIONS[key].mixer.update( dTime )
    }

    if(window.isAnim) {
      // uv animations
      if (STATE.UV_ANIMATED_OBJECTS) {
        for (const key in STATE.UV_ANIMATED_OBJECTS) {
          STATE.UV_ANIMATED_OBJECTS[key].animate()
        }
      }

      // animations
      if (STATE.ANIMATED_OBJECTS) {
        for (const key in STATE.ANIMATED_OBJECTS) {
          STATE.ANIMATED_OBJECTS[key].animate()
        }
      }
    }

    TWEEN.update( time )
    STATE.WEBGL.renderer.render( STATE.WEBGL.scene, STATE.WEBGL.camera )
    STATE.WEBGL.labelRenderer.render( STATE.WEBGL.scene, STATE.WEBGL.camera )
  }

  return {
    createContext: createContext,
    loadAssets: loadAssets, // glb only
    initScene: initScene, // include texture
    toggleScene: toggleScene,
    toggleRendering: toggleRendering,
  }
})()
