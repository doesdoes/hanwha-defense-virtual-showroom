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
        STATE.ASSET_DOMAIN_PATH = `https://${host}/2022/showroom/assets`
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
      cameraOptions: { fov: 45, near: 1, far: 1000, x: 5, y: 12, z: 17 },
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

        // if ( event.key == '`' ) SCENE.focusOnRegion('reset')
        // if ( event.key == '1' ) SCENE.focusOnRegion('zone1')
        // if ( event.key == '2' ) SCENE.focusOnRegion('zone2')
      }, false)
    }

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
      case 'main':
        LOADER.loadGLTF(LOADING_MANAGER, ASSETS.MAIN.MODEL_FILES, STATE.ASSET_DOMAIN_PATH, STATE.DRACO_LOADER)
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
      case 'main':
        SCENE.loadStage('main')
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
    STATE.CURRENT_SCENE.VISIBLE = _toggle
    SCENE.toggleStages(_toggle, _sceneName)
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

  const clock = new THREE.Clock()
  let autoRotateDirection = 1

  function render( time ){
    requestAnimationFrame( render )

    if( !STATE.ENABLE_RENDERING ) return

    // uv animations
    // if (STATE.UV_ANIMATED_OBJECTS) {
    //   for (const key in STATE.UV_ANIMATED_OBJECTS) {
    //     STATE.UV_ANIMATED_OBJECTS[key].animate()
    //   }
    // }

    if( !STATE.WEBGL.disableAutoRotate && !STATE.IS_FOCUSED){
      if (STATE.WEBGL.cameraControls.azimuthAngle > 0.5) autoRotateDirection = -1
      if (STATE.WEBGL.cameraControls.azimuthAngle < 0.1) autoRotateDirection = 1   
      STATE.WEBGL.cameraControls.azimuthAngle += autoRotateDirection * clock.getDelta() * THREE.MathUtils.DEG2RAD 
    }

    STATE.WEBGL.cameraControls.normalizeRotations()
    STATE.WEBGL.cameraControls.update( clock.getDelta() )

    TWEEN.update( time )
    STATE.WEBGL.renderer.render( STATE.WEBGL.scene, STATE.WEBGL.camera )
    STATE.WEBGL.labelRenderer.render( STATE.WEBGL.scene, STATE.WEBGL.camera )
  }

  return {
    createContext: createContext,
    loadAssets: loadAssets,
    initScene: initScene,
    toggleScene: toggleScene,
    toggleRendering: toggleRendering,
  }
})()
