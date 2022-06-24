window.addEventListener('DOMContentLoaded', async (event) => {
  document.querySelector('.entry__item--left .btn').addEventListener('click', function() {
    _WEBGL.setLeftScene();
  })

  document.querySelector('.entry__item--right .btn').addEventListener('click', function() {
    _WEBGL.setRightScene();
  })

  document.querySelector('.header .btn--back').addEventListener('click', function() {
    _WEBGL.resetScene();
  })


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