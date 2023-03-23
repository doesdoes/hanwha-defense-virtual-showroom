import { STATE } from './webgl/global'
import * as SCENE from './webgl/scene'
import { setHemisphereLightSnowDefault, setHemisphereLightDesertDefault, setHemisphereLightSnow, setHemisphereLightDesert } from './webgl/light.js';

export function setIndicator() {
  document.querySelectorAll(`.indicator-panel .parts .part`).forEach(part => {
    part.addEventListener('click', function() {
      const feature = this.getAttribute('data-feature')
      STATE.IS_FOCUSED = true 
      SCENE.focusOnRegion(feature)
    })
  })
}

export function setCondition() {
  document.querySelector('#change-condition').addEventListener('click', function(e) {
    this.blur()
    // const bg = this.getAttribute('data-bg')
    const viewState = document.body.getAttribute('data-state')
    let snowSeqAni = STATE.WEBGL.scene.getObjectByName("BG_Snow_Dust_SEQAni", true);
    let snowTrackSkid = STATE.WEBGL.scene.getObjectByName("BG_Snow_TrackSkid_UVAni", true);
    let desertSeqAni = STATE.WEBGL.scene.getObjectByName("BG_Desert_Dust_SEQAni", true);
    let desertTrackSkid = STATE.WEBGL.scene.getObjectByName("BG_Desert_TrackSkid_SEQAni", true);

    switch (viewState) {
      case 'K9A1':
        document.body.setAttribute('data-state', 'K9A1-SNOW')
        // this.setAttribute('data-bg', 'snowBg')
        SCENE.toggleStages(true, 'snowBg')
        SCENE.toggleStages(false, 'k9a1IndoorBg')
        window.isAnim = true
      
        setHemisphereLightSnow(STATE)
        snowSeqAni.visible = true
        snowTrackSkid.visible = true

        STATE.ANIMATIONS._k9Tank.mixer._actions.forEach(anim => {
          anim.play()
        })
        // STATE.ANIMATIONS._SNOW.mixer._actions.forEach(anim => {
        //   anim.play()
        // })
        break;
      case 'K9A1-SNOW':
        document.body.setAttribute('data-state', 'K9A1')
        // this.setAttribute('data-bg', 'k9a1IndoorBg')
        SCENE.toggleStages(false, 'snowBg')
        SCENE.toggleStages(true, 'k9a1IndoorBg')
        window.isAnim = false
    
        setHemisphereLightSnowDefault(STATE)
        snowSeqAni.visible = false
        snowTrackSkid.visible = false
  
        STATE.ANIMATIONS._k9Tank.mixer.stopAllAction()
        // STATE.ANIMATIONS._SNOW.mixer.stopAllAction()
        break;

      case 'REDBACK':
        document.body.setAttribute('data-state', 'REDBACK-DESERT')
        // this.setAttribute('data-bg', 'desertBg')
        SCENE.toggleStages(true, 'desertBg')
        SCENE.toggleStages(false, 'redbackIndoorBg')
        window.isAnim = true
        
        setHemisphereLightDesert(STATE)
        desertSeqAni.visible = true
        desertTrackSkid.visible = true
  
        STATE.ANIMATIONS._REDBACK.mixer._actions.forEach(anim => {
          anim.play()
        })
        // STATE.ANIMATIONS._DESERT.mixer._actions.forEach(anim => {
        //   anim.play()
        // })
        break;

      case 'REDBACK-DESERT':
        document.body.setAttribute('data-state', 'REDBACK')
        // this.setAttribute('data-bg', 'redbackIndoorBg')
        SCENE.toggleStages(false, 'desertBg')
        SCENE.toggleStages(true, 'redbackIndoorBg')
        window.isAnim = false
    
        setHemisphereLightDesertDefault(STATE)
        desertSeqAni.visible = false
        desertTrackSkid.visible = false
  
        STATE.ANIMATIONS._REDBACK.mixer.stopAllAction()
        // STATE.ANIMATIONS._DESERT.mixer.stopAllAction()
      break;

      case 'KSLV':
        console.log(`change condition to galaxy`)
        
        document.body.setAttribute('data-state', 'KSLV-GALAXY')

        // SCENE.toggleStages(false, 'desertBg')
        // SCENE.toggleStages(true, 'redbackIndoorBg')
        //window.isAnim = false
      break;

      case 'KSLV-GALAXY':
        console.log(`change condition to launch base`)
        
        document.body.setAttribute('data-state', 'KSLV')

        // SCENE.toggleStages(false, 'desertBg')
        // SCENE.toggleStages(true, 'redbackIndoorBg')
        //window.isAnim = false
      break;
    
      default:
        break;
    }
    e.preventDefault()
  })
  
}