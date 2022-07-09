import {gsap} from 'gsap/all';
import { canvasButton } from './canvas-button';
import { sendGLCustomEvent } from './webgl/class/GLCustomEvent'
import './webgl/_webgl';
import * as THREE from 'three'
import { LoadingSpinner } from './webgl/class/Lloading-Spinner'

const $sound = document.querySelector('#sound');
const $audio = $sound.querySelector('.sound audio');

let IS_INIT_K9A1 = false
let IS_INIT_REDBACK = false

window.UI = {
  $currentPopup: '',
}

window.addEventListener('DOMContentLoaded', async (event) => {

  canvasButton()
  setContent()
  setUIEvent()

  // document.querySelectorAll('.entry__item .bttn').forEach(bttn => {
  document.querySelectorAll('.entry__item .btn').forEach(bttn => {
    bttn.addEventListener('click', function(e) {
      const item = this.getAttribute('data-item')
      toggleItem(item)

      e.preventDefault()
      e.stopPropagation()
    })
  })

  document.querySelector('.header .btn-back').addEventListener('click', function(e) {
    goToGate();

    e.preventDefault();
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
    // console.log(e.detail.msg)
    
    if(window.UI.$currentPopup) {
      gsap.killTweensOf(window.UI.$currentPopup)
      gsap.to(window.UI.$currentPopup, { autoAlpha: 0, duration: 0.3 })
    }
    const $popup = document.querySelector(`[data-popup=${e.detail.msg}]`)
    gsap.to($popup, { autoAlpha: 1, duration: 0.7 })
    window.UI.$currentPopup = $popup
  })

  function setContent() {
    gsap.set('.indicator-panel', { autoAlpha: 0, x: 20, pointerEvents: 'none' })
    gsap.set('.bot', {autoAlpha: 0, x: 20})
  }

  function goToGate() {
    gsap.to('.entry', { autoAlpha: 1 })
    gsap.to('#content-wrapper', { autoAlpha: 0 })
    document.querySelector('.header').setAttribute('data-state', 'gate')
    gsap.to('.indicator-panel', { autoAlpha: 0, x: 20, pointerEvents: 'none' })
    gsap.to('.bot', { autoAlpha: 0, x: 20 })

    document.querySelector('#change-condition-k9a1').setAttribute('data-bg', 'k9a1IndoorBg')
    document.querySelector('#change-condition-redback').setAttribute('data-bg', 'redbackIndoorBg')

    $sound.classList.remove('on')
    $audio.pause()
    $audio.currentTime = 0

    gsap.to('.poi-container', { autoAlpha: 0 })
  }

  function gateToWebglView(item) {
    gsap.to('.entry', {autoAlpha: 0})
    gsap.to('#content-wrapper', {autoAlpha: 1})
    document.querySelector('.header').setAttribute('data-state', 'showroom')
    document.body.setAttribute('data-state', item)

    gsap.to(`.indicator-panel[data-item="${item}"]`, { autoAlpha: 1, x: 0, delay: 0.5, duration: 0.7, pointerEvents: 'initial' })
    gsap.to('.bot', {autoAlpha: 1, x: 0, delay: 0.7, duration: 0.6})

    $sound.classList.add('on')
    $audio.volume = 0.0
    $audio.play()

    gsap.to('.poi-container', {autoAlpha: 1})
  }

  function toggleItem(item) {
    const loadingSpinner = new LoadingSpinner()

    if(item === 'k9a1') {
      if(IS_INIT_K9A1) {
        _WEBGL.toggleScene('REDBACK', false)
        _WEBGL.toggleScene('K9', true)
        _WEBGL.toggleRendering(true)
    
        gateToWebglView(item)
      } else {
        IS_INIT_K9A1 = true
        
        loadingSpinner.show()
        _WEBGL.loadAssets('K9', () => {
          MAIN_ASSET_LOADED = true
          _WEBGL.initScene('K9', () => {
            gateToWebglView(item)
            loadingSpinner.hide()
          })

          _WEBGL.toggleScene('REDBACK', false)
          _WEBGL.toggleScene('K9', true)
          _WEBGL.toggleRendering(true)
        })
      }
      
    } else {
      if(IS_INIT_REDBACK) {
        _WEBGL.toggleScene('K9', false)
        _WEBGL.toggleScene('REDBACK', true)
        _WEBGL.toggleRendering(true)

        gateToWebglView(item)
      } else {
        IS_INIT_REDBACK = true
        
        loadingSpinner.show()
        _WEBGL.loadAssets('REDBACK', () => {
          MAIN_ASSET_LOADED = true
          _WEBGL.initScene('REDBACK', () => {
            gateToWebglView(item)
            loadingSpinner.hide()
          })

          _WEBGL.toggleScene('K9', false)
          _WEBGL.toggleScene('REDBACK', true)
          _WEBGL.toggleRendering(true)
        })
      }
    }
  }

  // [NOTE] WEBGL
  let MAIN_ASSET_LOADED = false

  const md = new MobileDetect(window.navigator.userAgent)
  const isMobile = md.mobile()

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