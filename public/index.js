window.addEventListener('DOMContentLoaded', async (event) => {

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
})