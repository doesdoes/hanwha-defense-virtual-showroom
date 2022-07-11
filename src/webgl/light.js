import * as THREE from 'three'
import { GUI } from 'dat.gui'

let isLight = false;

export function setLight(STATE) {

  // [TODO] change color by scene
  if(isLight) return

  isLight = true

  const rightDirectionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 )
  rightDirectionalLight.position.set(-2.4, 4, -6.5)
  let targetRight = new THREE.Object3D()
  targetRight.translateX(0)
  targetRight.translateY(0)
  targetRight.translateZ(-0.5)
  rightDirectionalLight.target = targetRight
  rightDirectionalLight.target.updateMatrixWorld()

  const leftDirectionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 )
  leftDirectionalLight.position.set(-2.6, 6, 6.5)
  let targetLeft = new THREE.Object3D()
  targetLeft.translateX(0)
  targetLeft.translateY(0)
  targetLeft.translateZ(0.5)
  leftDirectionalLight.target = targetLeft
  leftDirectionalLight.target.updateMatrixWorld()

  let d = 10
  rightDirectionalLight.shadow.camera.left = - d
  rightDirectionalLight.shadow.camera.right = d
  rightDirectionalLight.shadow.camera.top = d
  rightDirectionalLight.shadow.camera.bottom = - d
  rightDirectionalLight.shadow.mapSize.width = 2048
  rightDirectionalLight.shadow.mapSize.height = 2048
  rightDirectionalLight.castShadow = true
  rightDirectionalLight.intensity = 0.6

  let leftD = 10
  leftDirectionalLight.shadow.camera.left = - leftD
  leftDirectionalLight.shadow.camera.right = leftD
  leftDirectionalLight.shadow.camera.top = leftD
  leftDirectionalLight.shadow.camera.bottom = - leftD
  leftDirectionalLight.shadow.mapSize.width = 2048
  leftDirectionalLight.shadow.mapSize.height = 2048
  leftDirectionalLight.castShadow = true
  leftDirectionalLight.intensity = 0.6

  STATE.hemisphereLight = new THREE.HemisphereLight( 0xFFFFFF, 0xFFFFFF, 1 )

  STATE.WEBGL.scene.add( rightDirectionalLight )
  STATE.WEBGL.scene.add( leftDirectionalLight )
  STATE.WEBGL.scene.add( STATE.hemisphereLight )

  // // [NOTE] HELPER
  // const drHelper = new THREE.DirectionalLightHelper( rightDirectionalLight, 1, '#0324fc' )
  // const leftDrHelper = new THREE.DirectionalLightHelper( leftDirectionalLight, 1, '#0324fc' )
  // const hemiHelper = new THREE.HemisphereLightHelper( STATE.hemisphereLight, 0.5, '#0324fc' )

  // STATE.WEBGL.scene.add( drHelper )
  // STATE.WEBGL.scene.add( leftDrHelper )
  // STATE.WEBGL.scene.add( hemiHelper )


  // // [NOTE] gui
  // document.querySelector('.header').style.zIndex = -1
  // const gui = new GUI()

  // const folderRight = gui.addFolder(`right light`)
  // // folderRight.open()
  // folderRight.add(rightDirectionalLight.position, 'x', -10, 10).onChange(updateLight)
  // folderRight.add(rightDirectionalLight.position, 'y', -10, 10).onChange(updateLight)
  // folderRight.add(rightDirectionalLight.position, 'z', -10, 10).onChange(updateLight)
  // folderRight.add(rightDirectionalLight, 'intensity', 0, 2)

  // const folderLeft = gui.addFolder(`left light`)
  // // folderLeft.open()
  // folderLeft.add(leftDirectionalLight.position, 'x', -10, 10).onChange(updateLight)
  // folderLeft.add(leftDirectionalLight.position, 'y', -10, 10).onChange(updateLight)
  // folderLeft.add(leftDirectionalLight.position, 'z', -10, 10).onChange(updateLight)
  // folderLeft.add(leftDirectionalLight, 'intensity', 0, 2)


  // function updateLight() {
  //   console.log(rightDirectionalLight)
  //   console.log(leftDirectionalLight)

  //   rightDirectionalLight.target.updateMatrixWorld()
  // }
 
}

export function setHemisphereLightDefault(STATE) {
  STATE.hemisphereLight.color = new THREE.Color(0xE0EEFF)
  STATE.hemisphereLight.groundColor = new THREE.Color(0x778DB1)
  STATE.hemisphereLight.intensity = 1.0
}

export function setHemisphereLightDesert(STATE) {
  STATE.hemisphereLight.color = new THREE.Color(0xFFE5B8)
  STATE.hemisphereLight.groundColor = new THREE.Color(0xFEF5EC)
  STATE.hemisphereLight.intensity = 1.0
}

export function setHemisphereLightSnow(STATE) {
  STATE.hemisphereLight.color = new THREE.Color(0xE0EEFF)
  STATE.hemisphereLight.groundColor = new THREE.Color(0x778DB1)
  STATE.hemisphereLight.intensity = 1.0
}
