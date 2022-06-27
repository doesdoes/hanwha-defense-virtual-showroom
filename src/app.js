import {gsap} from 'gsap/all';
import { canvasButton } from './canvas-button';
import { sendGLCustomEvent } from './webgl/class/GLCustomEvent'

const $sound = document.querySelector('#sound');
const $audio = $sound.querySelector('.sound audio');
window.addEventListener('DOMContentLoaded', async (event) => {

  canvasButton();

  setContent()

  // document.querySelectorAll('.entry__item .bttn').forEach(bttn => {
  document.querySelectorAll('.entry__item .btn').forEach(bttn => {
    bttn.addEventListener('click', function(e) {
      goToContent()

      // const item = this.getAttribute('data-item');
      // switch (item) {
      //   case 'k9-high':
      //   case 'k9-low':
      //   case 'redback-high':
      //   case 'redback-low':
      //     goToContent()
      //     break;
      
      //   default:
      //     break;
      // }

      e.preventDefault()
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
    console.log(e.detail.msg)
    if(e.detail.msg === 'focus_point') {
      const $popup = document.querySelector('#point-popup')
      gsap.to($popup, { autoAlpha: 1, duration: 0.7 })
    }
  })

  function setContent() {
    gsap.set('.indicator-panel', {autoAlpha: 0, x: 20})
    gsap.set('.bot', {autoAlpha: 0, x: 20})
  }

  function goToContent() {
    gsap.to('.entry', {autoAlpha: 0})
    gsap.to('#content-wrapper', {autoAlpha: 1})
    document.querySelector('.header').setAttribute('data-state', 'showroom')

    gsap.to('.indicator-panel', {autoAlpha: 1, x: 0, delay: 0.5, duration: 0.7})
    gsap.to('.bot', {autoAlpha: 1, x: 0, delay: 0.7, duration: 0.6})

    $sound.classList.add('on')
    $audio.play()

    gsap.to('.poi-container', {autoAlpha: 1})
  }

  function goToGate() {
    gsap.to('.entry', {autoAlpha: 1})
    gsap.to('#content-wrapper', {autoAlpha: 0})
    document.querySelector('.header').setAttribute('data-state', 'gate')
    gsap.to('.indicator-panel', {autoAlpha: 0, x: 20})
    gsap.to('.bot', {autoAlpha: 0, x: 20})

    $sound.classList.remove('on')
    $audio.pause()
    $audio.currentTime = 0;

    gsap.to('.poi-container', {autoAlpha: 0})
  }


  // [NOTE] WEBGL
  let MAIN_ASSET_LOADED = false

  const md = new MobileDetect(window.navigator.userAgent)
  const isMobile = md.mobile()

  _WEBGL.createContext('.webgl-container', 'webgl', true, isMobile)
  
  _WEBGL.loadAssets('K9', () => {    
    MAIN_ASSET_LOADED = true

    _WEBGL.initScene('K9') 
    _WEBGL.toggleScene('K9', true)
    _WEBGL.toggleRendering(true)
  })
});