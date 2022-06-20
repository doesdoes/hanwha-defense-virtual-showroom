import * as THREE from 'three'
import { STATE } from '../global.js'
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import CameraControls from 'camera-controls'
import { Tween } from '@tweenjs/tween.js'

CameraControls.install( { THREE: THREE } )

export class Webgl{
  constructor(_options){
    this.parentContainerClass = _options.parentContainerClass
    this.container = _options.container
    this.sceneOptions = _options.sceneOptions
    this.cameraOptions = _options.cameraOptions
    this.isDebug = _options.isDebug
    this.mouse = new THREE.Vector2(0,0)
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)

    this.canvasWidth = document.querySelector(this.parentContainerClass).offsetWidth
    this.canvasHeight = document.querySelector(this.parentContainerClass).offsetHeight

    this.init()
  }

  init(){
    //scene
    this.scene = new THREE.Scene()
    if (this.sceneOptions.backgroundColor != undefined)
      this.scene.background = new THREE.Color(this.sceneOptions.backgroundColor)

    //fog
    // const color = 0xBDC6D8
    // const near = 50
    // const far = 90
    // this.scene.fog = new THREE.Fog(color, near, far)

    const color = 0xffffff
    const density = 0.01
    this.scene.fog = new THREE.FogExp2(color, density)

    //renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  	this.renderer.setPixelRatio(this.pixelRatio)
  	this.renderer.setSize(this.canvasWidth, this.canvasHeight)
  	this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.outputEncoding = THREE.LinearEncoding
    this.container.appendChild(this.renderer.domElement)

    //css renderer
    this.labelRenderer = new CSS2DRenderer()
    this.labelRenderer.setSize( this.canvasWidth, this.canvasHeight )
    this.labelRenderer.domElement.style.position = 'absolute'
    this.labelRenderer.domElement.style.top = '0px'
    this.labelRenderer.domElement.style.pointerEvents = 'none'
    document.body.appendChild( this.labelRenderer.domElement )

    // camera view
    this.views = []
    this.views.push(new View({left: -0.5, bottom: 0, width: 1, height: 1, cameraOptions: this.cameraOptions, scene: this.scene, renderer: this.renderer, enabled: false}))
    this.views.push(new View({left: 0.5, bottom: 0, width: 1, height: 1, cameraOptions: this.cameraOptions, scene: this.scene, renderer: this.renderer}))

    // //camera
    // this.camera = new THREE.PerspectiveCamera(
    //   this.cameraOptions.fov,
    //   this.canvasWidth / this.canvasHeight,
    //   this.cameraOptions.near,
    //   this.cameraOptions.far
    // )
    // this.camera.position.set(this.cameraOptions.x, this.cameraOptions.y, this.cameraOptions.z)
    // this.camera.name = 'mainCamera'
    // this.scene.add(this.camera)


    //controls
    this.cameraControls = new CameraControls( this.views[0].camera, this.renderer.domElement )
    this.cameraControls.minDistance = 10
    this.cameraControls.maxDistance = 40
    this.cameraControls.minPolarAngle = THREE.MathUtils.degToRad(50)
    this.cameraControls.maxPolarAngle = THREE.MathUtils.degToRad(85)

    this.cameraControls.truckSpeed = 0
    //this.cameraControls.mouseButtons.wheel = CameraControls.ACTION.NONE

    this.userDragging = false
    this.disableAutoRotate = false

    const onRest = () => {
      this.cameraControls.removeEventListener('rest', onRest )
      this.userDragging = false
      this.disableAutoRotate = false
    }
    this.cameraControls.addEventListener('controlstart', () => {
      this.cameraControls.removeEventListener( 'rest', onRest )
      this.userDragging = true
      this.disableAutoRotate = true
    })
    this.cameraControls.addEventListener('controlend', () => {
      if ( this.cameraControls.active ) {
        this.cameraControls.addEventListener( 'rest', onRest )
      } else { onRest() }
    })
    this.cameraControls.addEventListener('transitionstart', () => {
      if ( this.userDragging ) return
      this.disableAutoRotate = true
      this.cameraControls.addEventListener( 'rest', onRest )
    })

    this.resizeCameraView(this.canvasWidth)

    //listeners
	  window.addEventListener('resize', this.onWindowResize.bind(this), false)
    this.onWindowResize()

    this.cameraControls.camera = this.views[1].camera;

    // setTimeout(() => {
    //   // const tween = new Tween(this.views[0]) // Create a new tween that modifies 'coords'.
    //   // .to({left: -1}, 1500) // Move to (300, 200) in 1 second.
    //   // // .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
    //   // .onUpdate(() => {
    //   //   // Called after tween.js updates 'coords'.
    //   //   // Move 'box' to the position described by 'coords' with a CSS translation.
    //   //   // box.style.setProperty('transform', `translate(${coords.x}px, ${coords.y}px)`)
    //   // })
    //   // .start() // Start the tween immediately.

    //   new Tween(this.views[1])
    //   .to({left: 0}, 1000)
    //   .onComplete(() => {
    //     // this.cameraControls.camera = this.views[0].camera;
    //   })
    //   .start()
    // }, 2000)
  }

  setLeftScene() {
    this.sceneFlag = 'left';
    new Tween(this.views[0])
      .to({left: 0}, 1000)
      .onComplete(() => {
        this.cameraControls.camera = this.views[0].camera;
      })
      .start()
  }

  setRightScene() {
    this.sceneFlag = 'right';
    new Tween(this.views[1])
      .to({left: 0}, 1000)
      .onComplete(() => {
        this.cameraControls.camera = this.views[1].camera;
      })
      .start()
  }

  resetScene() {
    new Tween(this.views[0])
      .to({left: -0.5}, 1000)
      .onComplete(() => {
        // this.cameraControls.camera = this.views[0].camera;
      })
      .start()

    new Tween(this.views[1])
      .to({left: 0.5}, 1000)
      .onComplete(() => {
        // this.cameraControls.camera = this.views[0].camera;
      })
      .start()
  }

  resizeCameraView(_width){
    if (_width < 750){
      if(!STATE.IS_FOCUSED) this.cameraControls.setPosition(12,30,35)
      STATE.ZONE_FOCUS.reset.position.set(11,25,30)
    }else if (_width < 1200){
      if(!STATE.IS_FOCUSED) this.cameraControls.setPosition(9,23,28)
      STATE.ZONE_FOCUS.reset.position.set(11,21,26)
    }else{
      if(!STATE.IS_FOCUSED) this.cameraControls.setPosition(5,12,17)
      STATE.ZONE_FOCUS.reset.position.set(5,12,17)
    }
  }

  onWindowResize(){
    let newWidth = document.querySelector(this.parentContainerClass).offsetWidth
    let newHeight = document.querySelector(this.parentContainerClass).offsetHeight

    // this.camera.aspect = newWidth / newHeight

    // this.resizeCameraView(newWidth)
    
  	// this.camera.updateProjectionMatrix()

    this.views.forEach(view => {
      view.camera.aspect = newWidth / newHeight

      this.resizeCameraView(newWidth, view)
      
      view.camera.updateProjectionMatrix()
    })

    this.renderer.setSize(newWidth, newHeight)
    this.labelRenderer.setSize(newWidth, newHeight)
  }
}

class View {
  constructor(opts) {
    this.left = opts.left
    this.bottom = opts.bottom
    this.width = opts.width
    this.height = opts.height
    this.cameraOptions = opts.cameraOptions

    //camera
    this.camera = new THREE.PerspectiveCamera(
      this.cameraOptions.fov,
      this.canvasWidth / this.canvasHeight,
      this.cameraOptions.near,
      this.cameraOptions.far
    )
    this.camera.position.set(this.cameraOptions.x, this.cameraOptions.y, this.cameraOptions.z)
    this.camera.name = 'mainCamera'
    opts.scene.add(this.camera)
  }
}