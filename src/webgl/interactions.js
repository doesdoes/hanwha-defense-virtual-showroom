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
  document.querySelector('#change-condition').addEventListener('click', function(e) {
    this.blur()
    // const bg = this.getAttribute('data-bg')
    const viewState = document.body.getAttribute('data-state')

    switch (viewState) {
      case 'K9A1':
        document.body.setAttribute('data-state', 'K9A1-SNOW')
        // this.setAttribute('data-bg', 'snowBg')
        SCENE.toggleStages(true, 'snowBg')
        SCENE.toggleStages(false, 'k9a1IndoorBg')
        window.isAnim = true
        
        setHemisphereLightSnow(STATE)

        STATE.ANIMATIONS._k9Tank.mixer._actions.forEach(anim => {
          anim.play()
        })
        STATE.ANIMATIONS._SNOW.mixer._actions.forEach(anim => {
          anim.play()
        })
        break;
      case 'K9A1-SNOW':
        document.body.setAttribute('data-state', 'K9A1')
        // this.setAttribute('data-bg', 'k9a1IndoorBg')
        SCENE.toggleStages(false, 'snowBg')
        SCENE.toggleStages(true, 'k9a1IndoorBg')
        window.isAnim = false
    
        setHemisphereLightDefault(STATE)
  
        STATE.ANIMATIONS._k9Tank.mixer._actions.forEach(anim => {
          anim.stop()
        })
        // STATE.ANIMATIONS._SNOW.mixer._actions.forEach(anim => {
        //   anim.stop()
        // })
        STATE.ANIMATIONS._SNOW.mixer.stopAllAction()
        break;

      case 'REDBACK':
        document.body.setAttribute('data-state', 'REDBACK-DESERT')
        // this.setAttribute('data-bg', 'desertBg')
        SCENE.toggleStages(true, 'desertBg')
        SCENE.toggleStages(false, 'redbackIndoorBg')
        window.isAnim = true
        
        setHemisphereLightDesert(STATE)
  
        STATE.ANIMATIONS._REDBACK.mixer._actions.forEach(anim => {
          anim.play()
        })
        STATE.ANIMATIONS._DESERT.mixer._actions.forEach(anim => {
          anim.play()
        })
        break;

      case 'REDBACK-DESERT':
        document.body.setAttribute('data-state', 'REDBACK')
        // this.setAttribute('data-bg', 'redbackIndoorBg')
        SCENE.toggleStages(false, 'desertBg')
        SCENE.toggleStages(true, 'redbackIndoorBg')
        window.isAnim = false
    
        setHemisphereLightDefault(STATE)
  
        STATE.ANIMATIONS._REDBACK.mixer._actions.forEach(anim => {
          anim.stop()
        })
        STATE.ANIMATIONS._DESERT.mixer.stopAllAction()
      break;
    
      default:
        break;
    }
  
    // if(bg === 'k9a1IndoorBg') {
    //   document.body.setAttribute('data-state', 'K9A1-SNOW')
    //   this.setAttribute('data-bg', 'snowBg')
    //   SCENE.toggleStages(true, 'snowBg')
    //   SCENE.toggleStages(false, 'k9a1IndoorBg')
    //   window.isAnim = true
      
    //   setHemisphereLightSnow(STATE)

    //   STATE.ANIMATIONS._k9Tank.mixer._actions.forEach(anim => {
    //     anim.play()
    //   })
    //   STATE.ANIMATIONS._SNOW.mixer._actions.forEach(anim => {
    //     anim.play()
    //   })
      
    // } else {
    //   document.body.setAttribute('data-state', 'K9A1')
    //   this.setAttribute('data-bg', 'k9a1IndoorBg')
    //   SCENE.toggleStages(false, 'snowBg')
    //   SCENE.toggleStages(true, 'k9a1IndoorBg')
    //   window.isAnim = false
  
    //   setHemisphereLightDefault(STATE)

    //   STATE.ANIMATIONS._k9Tank.mixer._actions.forEach(anim => {
    //     anim.stop()
    //   })
    //   // STATE.ANIMATIONS._SNOW.mixer._actions.forEach(anim => {
    //   //   anim.stop()
    //   // })
    //   STATE.ANIMATIONS._SNOW.mixer.stopAllAction()
    // }
    e.preventDefault()
  })
  
  // document.querySelector('#change-condition-redback').addEventListener('click', function(e) {
  //   this.blur()
  //   const bg = this.getAttribute('data-bg')
    
  //   if(bg === 'redbackIndoorBg') {
  //     document.body.setAttribute('data-state', 'REDBACK-DESERT')
  //     this.setAttribute('data-bg', 'desertBg')
  //     SCENE.toggleStages(true, 'desertBg')
  //     SCENE.toggleStages(false, 'redbackIndoorBg')
  //     window.isAnim = true
      
  //     setHemisphereLightDesert(STATE)

  //     STATE.ANIMATIONS._REDBACK.mixer._actions.forEach(anim => {
  //       anim.play()
  //     })
  //     STATE.ANIMATIONS._DESERT.mixer._actions.forEach(anim => {
  //       anim.play()
  //     })
      
  //   } else {
  //     document.body.setAttribute('data-state', 'REDBACK')
  //     this.setAttribute('data-bg', 'redbackIndoorBg')
  //     SCENE.toggleStages(false, 'desertBg')
  //     SCENE.toggleStages(true, 'redbackIndoorBg')
  //     window.isAnim = false
  
  //     setHemisphereLightDefault(STATE)

  //     STATE.ANIMATIONS._REDBACK.mixer._actions.forEach(anim => {
  //       anim.stop()
  //     })
  //     STATE.ANIMATIONS._DESERT.mixer.stopAllAction()
  //   }
  //   e.preventDefault()
  // })
}