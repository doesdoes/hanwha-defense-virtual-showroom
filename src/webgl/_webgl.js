import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import TWEEN from '@tweenjs/tween.js'
import { Webgl } from './class/Webgl.js'
import * as SCENE from './scene.js'
import * as LOADER from './loader.js'
import { STATE, ASSETS } from './global.js'

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
        STATE.ASSET_DOMAIN_PATH = `https://${host}/2022/showroom-light/assets`
        break
      default:
        STATE.ASSET_DOMAIN_PATH = `http://${host}/assets`
        break
    }
   
    STATE.DRACO_LOADER = new DRACOLoader()
    STATE.DRACO_LOADER.setDecoderPath( `${STATE.ASSET_DOMAIN_PATH}/draco/` )

    STATE.IS_MOBILE = _isMobile
    STATE.WEBGL = new Webgl({
      parentContainerClass: _parentContainerClass,
      container: document.getElementById(_containerId),
      sceneOptions: { backgroundColor: 0xd1e4f0 },
      cameraOptions: { fov: 45, near: 0.1, far: 1000, x: 5, y: 0.5, z: -1.8 },
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
          console.log('here');
          SCENE.toggleStages(true, 'indoorBg')
          SCENE.toggleStages(false, 'snowBg')
        }
        if ( event.key == '2' ) {
          SCENE.toggleStages(true, 'snowBg')
          SCENE.toggleStages(false, 'indoorBg')
        }

        if ( event.key == 'c' ) {
          console.log(STATE.WEBGL.camera.position)
        }

        if ( event.key == 'q' ) {
          SCENE.focusOnRegion('reset')
        }
      }, false)
    }

    let isSnow = false;
    document.querySelector('#change-condition').addEventListener('click', function(e) {
      console.log(isSnow)
      if(!isSnow) {
        isSnow = true
        // SCENE.toggleStages(true, 'snowBg')
        SCENE.toggleStages(true, 'desertBg')
        SCENE.toggleStages(false, 'redbackIndoorBg')
      } else {
        isSnow = false
        SCENE.toggleStages(true, 'redbackIndoorBg')
        // SCENE.toggleStages(false, 'snowBg')
        SCENE.toggleStages(false, 'desertBg')
      }
      e.preventDefault()
    })

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
      case 'K9':
        LOADER.loadGLTF(LOADING_MANAGER, ASSETS.K9.MODEL_FILES, STATE.ASSET_DOMAIN_PATH, STATE.DRACO_LOADER)
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
  function initScene(_sceneName){
    if(STATE.WEBGL.isDebug) console.log(`WEBGL: scene %c${_sceneName} %cinitialized!`,'color:#3c6bef;','color:#unherit;')

    //load stage
    switch (_sceneName) {
      case 'K9':
        SCENE.loadStage('K9')
        break
      case 'REDBACK':
        SCENE.loadStage('REDBACK')
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

    if(_sceneName === "K9") {
      SCENE.toggleStages(_toggle, 'k9Tank')
      SCENE.toggleStages(_toggle, 'indoorBg')
    } else {
      SCENE.toggleStages(_toggle, 'redback')
      SCENE.toggleStages(_toggle, 'redbackIndoorBg')
    }
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
