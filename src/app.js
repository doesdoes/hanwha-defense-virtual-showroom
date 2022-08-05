import './translate-i18n'
import {gsap, Quint} from 'gsap/all'
import { canvasButton } from './canvas-button'
import './dropdown'
import { sendGLCustomEvent } from './webgl/class/GLCustomEvent'
import './webgl/_webgl'
import './gate'
import './orientation'
import * as THREE from 'three'
import { LoadingSpinner } from './webgl/class/Lloading-Spinner'
import "@lottiefiles/lottie-player";
import './tagging'

const $sound = document.querySelector('#sound');
const $audio = $sound.querySelector('.sound audio');

let IS_INIT_K9A1 = false
let IS_INIT_REDBACK = false
const md = new MobileDetect(window.navigator.userAgent)
const isMobile = md.mobile()

window.UI = {
  $currentPopup: '',
}

window.addEventListener('DOMContentLoaded', async (event) => {

  canvasButton()
  setContent()
  setUIEvent()

  if(isMobile) {
    // document.querySelectorAll('.entry__item').forEach($entryItem => {
    //   $entryItem.addEventListener('click', function() {
    //     const item = this.getAttribute('data-item')
    //     toggleItem(item)
    //   })
    // })

    const $conditionWrap = document.querySelector('.indicator-panel .condition-wrap')
    const $bot = document.querySelector('.bot')
    $bot.appendChild($conditionWrap)
  }
  
  document.querySelectorAll('.btn-entry-point').forEach(bttn => {
    bttn.addEventListener('click', function(e) {
      const item = this.getAttribute('data-item')
      toggleItem(item)

      e.preventDefault()
    })
  })

  document.querySelector('.header .btn-back').addEventListener('click', function(e) {
    goToGate()

    e.preventDefault()
  })

  document.querySelector('#sound').addEventListener('click', function() {
    this.classList.toggle('on');

    // [TODO]
    if($sound.classList.contains('on')) {
      $audio.play()
    } else {
      $audio.pause()
    }
  })

  window.addEventListener('GLCustomEvent', function(e) {
    
    if(window.UI.$currentPopup) {
      gsap.killTweensOf(window.UI.$currentPopup)
      gsap.to(window.UI.$currentPopup, { autoAlpha: 0, scale: 0.5, duration: 0.3 })
    }
    const $popup = document.querySelector(`[data-popup=${e.detail.msg}]`)
    if($popup) {
      console.log(e.detail.msg, $popup)
      gsap.set($popup, { scale: 0.5 })
      gsap.to($popup, { autoAlpha: 1, scale: 1, duration: 0.7, ease: Quint.easeInOut })
      window.UI.$currentPopup = $popup

      const video = $popup.querySelector('video')
      if(video) {
        video.currentTime = 0
        video.play()
        const visualMedia = video.closest('.visual-media')
        visualMedia.classList.add('playing')
      }
    }
  })

  function gateToWebglView(item) {

    function showUI() {
      gsap.to(`.indicator-panel`, { autoAlpha: 1, x: 0, delay: 0.5, duration: 0.7, pointerEvents: 'initial' })
      gsap.to('.bot', {autoAlpha: 1, x: 0, delay: 0.7, duration: 0.6})

      $sound.classList.add('on')
      $audio.volume = 0.5
      // $audio.volume = 0 // [DEBUG]
      $audio.play()

      gsap.to('.poi-container', {autoAlpha: 1})
    }

    if(document.querySelector('.main').classList.contains('begin')) {

      const step1Controller = new AbortController();
      const step2Controller = new AbortController();
      const guideSteps = []
      guideSteps.push(() => {
        return new Promise((resolve, reject) => {
          document.body.setAttribute('data-state', 'guide-step-1')
          gsap.to('.guide360__visual', { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.2 })
          gsap.to('.guide360__desc', { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.3 })
          const dCall = gsap.delayedCall(2, () => {
            resolve()
            guide.next()
          })

          step1Controller.signal.addEventListener('abort', () => {
            console.log('abort 0 ')
            dCall && dCall.kill()
            resolve()
            guide.next()
          })
        })
      })

      guideSteps.push(() => {
        return new Promise((resolve, reject) => {
          showUI()
          const dCall1 = gsap.delayedCall(0.5, () => {
            document.body.setAttribute('data-state', 'guide-step-2')
          })
          const dCall2 = gsap.delayedCall(10, () => {
            resolve()
            guide.next()
          })

          step2Controller.signal.addEventListener('abort', () => {
            dCall1 && dCall1.kill()
            dCall2 && dCall2.kill()
            resolve()
            guide.next()
          })
        })
      })
      guideSteps.push(() => {
        return new Promise((resolve, reject) => {
          document.querySelector('.main').classList.remove('begin')
          document.body.setAttribute('data-state', item)
          console.log('end')
          resolve()

        })
      })

      async function* genGuide() {
        for (let i = 0; i < guideSteps.length; i++) {
          yield await guideSteps[i]()
        }
      }

      
      const guide = genGuide()
      guide.next()

      document.querySelector('.btn-close-guide').addEventListener('click', function(e) {
        step2Controller.abort()
        e.preventDefault()
      })

      window.addEventListener('click', function() {
        
        
        const state = document.body.getAttribute('data-state')
        switch (state) {
          case 'guide-step-1':
            step1Controller.abort()
            break;
          case 'guide-step-2':
            step2Controller.abort()
            break;
        
          default:
            break;
        }
      })
      
    } else {
      showUI()
      document.body.setAttribute('data-state', item)
    }

    gsap.to('.gate', {autoAlpha: 0})
    gsap.to('#content-wrapper', {autoAlpha: 1})
    document.querySelector('.header').setAttribute('data-state', 'showroom')
    document.querySelector('.header .dropdown.kind .dropdown__selection').textContent = item
  }

  function setContent() {
    gsap.set('.indicator-panel', { autoAlpha: 0, x: 20, pointerEvents: 'none' })
    gsap.set('.bot', {autoAlpha: 0, x: 20})
  }

  function goToGate() {
    gsap.to('.gate', { autoAlpha: 1 })
    gsap.to('#content-wrapper', { autoAlpha: 0 })
    document.querySelector('.header').setAttribute('data-state', 'gate')
    gsap.to('.indicator-panel', { autoAlpha: 0, x: 20, pointerEvents: 'none' })
    gsap.to('.bot', { autoAlpha: 0, x: 20 })

    // document.querySelector('#change-condition-k9a1').setAttribute('data-bg', 'k9a1IndoorBg')
    // document.querySelector('#change-condition-redback').setAttribute('data-bg', 'redbackIndoorBg')

    $sound.classList.remove('on')
    $audio.pause()
    $audio.currentTime = 0

    gsap.to('.poi-container', { autoAlpha: 0 })
  }

  function toggleItem(item) {
    const loadingSpinner = new LoadingSpinner()
    window.isAnim = false

    if(item === 'K9A1') {
      if(IS_INIT_K9A1) {
        _WEBGL.toggleScene('REDBACK', false)
        _WEBGL.toggleScene('K9A1', true)
        _WEBGL.toggleRendering(true)
    
        gateToWebglView(item)
      } else {
        IS_INIT_K9A1 = true
        
        loadingSpinner.show()
        _WEBGL.loadAssets('K9A1', () => {
          MAIN_ASSET_LOADED = true
          _WEBGL.initScene('K9A1', () => {
            setTimeout(function() {
              gateToWebglView(item)

              _WEBGL.toggleScene('REDBACK', false)
              _WEBGL.toggleScene('K9A1', true)
              _WEBGL.toggleRendering(true)

              loadingSpinner.hide()
            }, 50)
          })
        })
      }
      
    } else {
      if(IS_INIT_REDBACK) {
        _WEBGL.toggleScene('K9A1', false)
        _WEBGL.toggleScene('REDBACK', true)
        _WEBGL.toggleRendering(true)

        gateToWebglView(item)
      } else {
        IS_INIT_REDBACK = true
        
        loadingSpinner.show()
        _WEBGL.loadAssets('REDBACK', () => {
          MAIN_ASSET_LOADED = true
          _WEBGL.initScene('REDBACK', () => {
            setTimeout(function() {
              gateToWebglView(item)

              _WEBGL.toggleScene('K9A1', false)
              _WEBGL.toggleScene('REDBACK', true)
              _WEBGL.toggleRendering(true)

              loadingSpinner.hide()
            }, 50)
          })
        })
      }
    }
  }

  // [NOTE] WEBGL
  let MAIN_ASSET_LOADED = false

  _WEBGL.createContext('.webgl-container', 'webgl', true, isMobile)
});

function setUIEvent() {
  document.querySelectorAll('.visual-media').forEach(media => {
    const video = media.querySelector('video')

    media.addEventListener('click', function(e) {
      toggleVideo(video)
      
      e.preventDefault()
      e.stopPropagation()
    })
  })
}

function toggleVideo(video) {
  const visualMedia = video.closest('.visual-media')
  if(video.paused) {
    video.play()
    visualMedia.classList.add('playing')
  } else {
    video.pause()
    visualMedia.classList.remove('playing')
  }
}

function turnoffVideo(video) {
  const visualMedia = video.closest('.visual-media')
  video.pause()
  video.currentTime = 0
  visualMedia.classList.remove('playing')
}