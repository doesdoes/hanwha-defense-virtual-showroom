import {gsap, Quint, Expo} from 'gsap/all'

(function() {
  const md = new MobileDetect(window.navigator.userAgent)
  const isMobile = md.mobile()

  document.querySelectorAll('.gate video.in').forEach(video => {
    if(isMobile) {
      video.oncanplay = function() {
        video.play()
      }
      video.play()

      video.addEventListener('ended', function() {
        // gsap.to(this, {autoAlpha: 0})

        startInMotion(this)
      }, false)
    } else {
      video.play()
      video.addEventListener('ended', function() {
        gsap.to(this, {autoAlpha: 0})
        startInMotion(this)
      }, false)
    }
  })

  function startInMotion(video) {
    const $entry =  video.closest('[data-item]')
    const $tit = $entry.querySelector('.tit')
    const $desc = $entry.querySelector('.desc')
    const $func = $entry.querySelector('.func')
    gsap.to($tit, { y: 0, duration: 1.01, ease: Expo.easeInOut })
    gsap.to($desc, { y: 0, delay: 0.1, duration: 1.01, ease: Expo.easeInOut })
    gsap.to($func, { y: 0, delay: 0.2, duration: 1.01, ease: Expo.easeInOut, onComplete: () => {
      
    }})
  }

  const $entryK9a1 = document.querySelector('.entry__item--left .btn-entry-point')
  const $k9a1Video = document.querySelector('.entry__item--left video.hover')
  const $k9a1Tit = document.querySelector('.entry__item--left .tit')
  const $entryRedback = document.querySelector('.entry__item--right .btn-entry-point')
  const $redbackVideo = document.querySelector('.entry__item--right video.hover')
  const $redbackTit = document.querySelector('.entry__item--right .tit')

  $entryK9a1.addEventListener('mouseenter', function() {
    gsap.to('.entry__item--left video.in', {autoAlpha: 0})
    $k9a1Video.play()
    // gsap.to($k9a1Tit, { textFillColor: '#000' })
  })

  $entryK9a1.addEventListener('mouseleave', function() {
    $k9a1Video.playBackwards()
    // gsap.to($k9a1Tit, { textFillColor: 'transparent' })
  })

  $entryRedback.addEventListener('mouseenter', function() {
    gsap.to('.entry__item--right video.in', {autoAlpha: 0})
    $redbackVideo.play()
    // gsap.to($redbackTit, { textFillColor: '#000' })
  })

  $entryRedback.addEventListener('mouseleave', function() {
    $redbackVideo.playBackwards()
    // gsap.to($redbackTit, { textFillColor: 'transparent' })
  })

  HTMLVideoElement.prototype.playBackwards = function() {
    this.pause();

    var video = this;

    var fps = 25;
    var intervalRewind = setInterval(function() {
        if(video.currentTime == 0){
           clearInterval(intervalRewind);
           video.pause();
        }
        else {
            video.currentTime += -(1/fps);
        }
    }, 1000 / fps);
};

})()