import { STATE } from './global.js'
import * as SCENE from './scene.js'
import { setHemisphereLightDefault, setHemisphereLightDesert, setHemisphereLightSnow } from './light.js';

export function registerEvents( ){
  document.addEventListener( 'mousemove', e => onMouseMove( e, STATE.WEBGL ), false )
  document.addEventListener( 'touchmove', e => onTouchMove( e, STATE.WEBGL ), false )
}

export function onMouseMove( e ){
  STATE.WEBGL.mouse.x = ( e.clientX / window.innerWidth * 2 ) - 1
  STATE.WEBGL.mouse.y = ( e.clientY / window.innerHeight * -2 ) + 1
}

export function onTouchMove( e ){
  STATE.WEBGL.mouse.x = ( e.touches[0].pageX / window.innerWidth ) * 2 - 1
  STATE.WEBGL.mouse.y = -( e.touches[0].pageY / window.innerHeight ) * 2 + 1
}

export function setCondition() {
  document.querySelector('#change-condition-k9a1').addEventListener('click', function(e) {
    const bg = this.getAttribute('data-bg')
  
    if(bg === 'k9a1IndoorBg') {
      this.setAttribute('data-bg', 'snowBg')
      SCENE.toggleStages(true, 'snowBg')
      SCENE.toggleStages(false, 'k9a1IndoorBg')
      window.isAnim = true
      
      setHemisphereLightSnow(STATE)
      
    } else {
      this.setAttribute('data-bg', 'k9a1IndoorBg')
      SCENE.toggleStages(false, 'snowBg')
      SCENE.toggleStages(true, 'k9a1IndoorBg')
      window.isAnim = false
  
      setHemisphereLightDefault(STATE)
    }
    e.preventDefault()
  })
  
  document.querySelector('#change-condition-redback').addEventListener('click', function(e) {
    const bg = this.getAttribute('data-bg')
    
    if(bg === 'redbackIndoorBg') {
      this.setAttribute('data-bg', 'desertBg')
      SCENE.toggleStages(true, 'desertBg')
      SCENE.toggleStages(false, 'redbackIndoorBg')
      window.isAnim = true
      
      setHemisphereLightDesert(STATE)
      
    } else {
      this.setAttribute('data-bg', 'redbackIndoorBg')
      SCENE.toggleStages(false, 'desertBg')
      SCENE.toggleStages(true, 'redbackIndoorBg')
      window.isAnim = false
  
      setHemisphereLightDefault(STATE)
    }
    e.preventDefault()
  })
}