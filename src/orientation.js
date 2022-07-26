(() => {
  const $landscapelLayoutInfo = document.getElementById('landscape-layout-info')
  function doOnOrientationChange() {
    switch(window.orientation) {
      case 90:
      case -90:
        $landscapelLayoutInfo.style.visibility = 'visible'
        console.log('landscape')
        break;
      case 0:
      case 180:
        $landscapelLayoutInfo.style.visibility = 'hidden'
        console.log('portrait')
        break;
      default:
        break;
    }
}

  window.addEventListener('orientationchange', doOnOrientationChange);
  doOnOrientationChange()
})()