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
});