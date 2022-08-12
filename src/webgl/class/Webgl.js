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

    this.clock = new THREE.Clock()
    this.cameraClock = new THREE.Clock()

    //fog
    // const color = 0xBDC6D8
    // const near = 50
    // const far = 90
    // this.scene.fog = new THREE.Fog(color, near, far)

    const color = 0xffffff
    const density = 0.01
    // this.scene.fog = new THREE.FogExp2(color, density) // [NOTE] 3D 팀에서 포그를 뺀듯함..

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
    // this.views = []
    // this.views.push(new View({left: -0.5, bottom: 0, width: 1, height: 1, cameraOptions: this.cameraOptions, scene: this.scene, renderer: this.renderer, enabled: false}))
    // this.views.push(new View({left: 0.5, bottom: 0, width: 1, height: 1, cameraOptions: this.cameraOptions, scene: this.scene, renderer: this.renderer}))

    //camera
    this.camera = new THREE.PerspectiveCamera(
      this.cameraOptions.fov,
      this.canvasWidth / this.canvasHeight,
      this.cameraOptions.near,
      this.cameraOptions.far
    )
    this.camera.position.set(this.cameraOptions.x, this.cameraOptions.y, this.cameraOptions.z)
    this.camera.name = 'mainCamera'
    this.scene.add(this.camera)

    //controls
    this.cameraControls = new CameraControls( this.camera, this.renderer.domElement )
    // this.cameraControls.minDistance = 3
    // this.cameraControls.maxDistance = 7
    this.cameraControls.minPolarAngle = THREE.MathUtils.degToRad(60)
    this.cameraControls.maxPolarAngle = THREE.MathUtils.degToRad(95)

    // this.cameraControls.minAzimuthAngle = THREE.MathUtils.degToRad(60)
    // this.cameraControls.maxAzimuthAngle = THREE.MathUtils.degToRad(95)

    this.cameraControls.truckSpeed = 0
    // this.cameraControls.mouseButtons.wheel = CameraControls.ACTION.NONE

    this.userDragging = false
    // this.disableAutoRotate = true

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

    //listeners
	  window.addEventListener('resize', this.onWindowResize.bind(this), false)
    this.onWindowResize()
  }

  onWindowResize(){
    let newWidth = document.querySelector(this.parentContainerClass).offsetWidth
    let newHeight = document.querySelector(this.parentContainerClass).offsetHeight

    this.camera.aspect = newWidth / newHeight
    
  	this.camera.updateProjectionMatrix()

    this.renderer.setSize(newWidth, newHeight)
    this.labelRenderer.setSize(newWidth, newHeight)
  }
}