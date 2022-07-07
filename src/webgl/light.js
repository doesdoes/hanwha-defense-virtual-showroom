import * as THREE from 'three'
import { GUI } from 'dat.gui'

let isLight = false;

export default function setLight(STATE) {

  // [TODO] change color by scene
  if(isLight) return

  isLight = true

  const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 )
  directionalLight.position.set(-2.4, 4, -6.3)

  const leftDirectionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 )
  leftDirectionalLight.position.set(-0.6, 6, 8.5)

  let d = 10
  directionalLight.shadow.camera.left = - d
  directionalLight.shadow.camera.right = d
  directionalLight.shadow.camera.top = d
  directionalLight.shadow.camera.bottom = - d
  directionalLight.shadow.mapSize.width = 2048
  directionalLight.shadow.mapSize.height = 2048
  directionalLight.castShadow = true
  directionalLight.intensity = 0.7

  let leftD = 10
  leftDirectionalLight.shadow.camera.left = - leftD
  leftDirectionalLight.shadow.camera.right = leftD
  leftDirectionalLight.shadow.camera.top = leftD
  leftDirectionalLight.shadow.camera.bottom = - leftD
  leftDirectionalLight.shadow.mapSize.width = 2048
  leftDirectionalLight.shadow.mapSize.height = 2048
  leftDirectionalLight.castShadow = true
  leftDirectionalLight.intensity = 0.7

  // desert
  // const hemisphereLight = new THREE.HemisphereLight( 0xFEC6B4, 0x955E50, 1 )

  // snow
  const hemisphereLight = new THREE.HemisphereLight( 0xDBF3FF, 0xFFFFFF, 1 )

  STATE.WEBGL.scene.add( directionalLight )
  STATE.WEBGL.scene.add( leftDirectionalLight )
  STATE.WEBGL.scene.add( hemisphereLight )

  const drHelper = new THREE.DirectionalLightHelper( directionalLight, 1, '#0324fc' )
  const leftDrHelper = new THREE.DirectionalLightHelper( leftDirectionalLight, 1, '#0324fc' )
  const hemiHelper = new THREE.HemisphereLightHelper( hemisphereLight, 0.5, '#0324fc' )

  // STATE.WEBGL.scene.add( drHelper )
  // STATE.WEBGL.scene.add( leftDrHelper )
  // STATE.WEBGL.scene.add( hemiHelper )


  // [NOTE] gui
  // document.querySelector('.header').style.zIndex = -1
  // const gui = new GUI()

  // const folderRight = gui.addFolder(`right light`)
  // // folderRight.open()
  // folderRight.add(directionalLight.position, 'x', -10, 10).onChange(updateLight)
  // folderRight.add(directionalLight.position, 'y', -10, 10).onChange(updateLight)
  // folderRight.add(directionalLight.position, 'z', -10, 10).onChange(updateLight)
  // folderRight.add(directionalLight, 'intensity', 0, 2)

  // const folderLeft = gui.addFolder(`left light`)
  // // folderLeft.open()
  // folderLeft.add(leftDirectionalLight.position, 'x', -10, 10).onChange(updateLight)
  // folderLeft.add(leftDirectionalLight.position, 'y', -10, 10).onChange(updateLight)
  // folderLeft.add(leftDirectionalLight.position, 'z', -10, 10).onChange(updateLight)
  // folderLeft.add(leftDirectionalLight, 'intensity', 0, 2)


  // function updateLight() {
  //   console.log(directionalLight)
  //   console.log(leftDirectionalLight)

  //   directionalLight.target.updateMatrixWorld()
  // }
 
}