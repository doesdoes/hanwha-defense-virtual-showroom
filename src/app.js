import {gsap} from 'gsap/all';

window.addEventListener('DOMContentLoaded', async (event) => {
  document.querySelectorAll('.entry__item .bttn').forEach(bttn => {
    bttn.addEventListener('click', function() {
      const item = this.getAttribute('data-item');
      switch (item) {
        case 'k9-high':
        case 'k9-low':
        case 'redback-high':
        case 'redback-low':
          goToContent()
          break;
      
        default:
          break;
      }
    })
  })

  document.querySelector('.header .btn-back').addEventListener('click', function(e) {
    goToGate();

    e.preventDefault();
  })

  document.querySelector('#sound').addEventListener('click', function() {
    this.classList.toggle('on');

    // [TODO]
    if(this.class.classList.contain('on')) {

    } else {
      
    }
  })

  function goToContent() {
    gsap.to('.entry', {autoAlpha: 0})
    gsap.to('#content-wrapper', {autoAlpha: 1})
    document.querySelector('.header').setAttribute('data-state', 'showroom')
  }

  function goToGate() {
    gsap.to('.entry', {autoAlpha: 1})
    gsap.to('#content-wrapper', {autoAlpha: 0})
    document.querySelector('.header').setAttribute('data-state', 'gate')
  }


  // [NOTE] WEBGL
  // let MAIN_ASSET_LOADED = false

  // const md = new MobileDetect(window.navigator.userAgent)
  // const isMobile = md.mobile()

  // _WEBGL.createContext('.webgl-container', 'webgl', true, isMobile)
  
  // _WEBGL.loadAssets('K9', () => {    
  //   MAIN_ASSET_LOADED = true

  //   _WEBGL.initScene('K9') 
  //   _WEBGL.toggleScene('K9', true)
  //   _WEBGL.toggleRendering(true)
  // })
});