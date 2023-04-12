import {gsap, Quint, Expo} from 'gsap/all'

(function() {
  const md = new MobileDetect(window.navigator.userAgent)
  const isMobile = md.mobile()

  if(isMobile) {
    const videoInMobile = document.querySelector('.gate video.in-mobile')
    videoInMobile.play()
    videoInMobile.addEventListener('timeupdate', function() {
      if(this.duration - this.currentTime < 2) {

        document.querySelectorAll('.gate video.in').forEach(video => {
          startInMotion(video)
        })
      }
    })

  } else {
    const videoPromises = []
    document.querySelectorAll('.gate video.in').forEach(video => {
      videoPromises.push(new Promise((resolve) => {
          video.src = video.dataset.src
          video.addEventListener('loadedmetadata', function() {
            resolve()
          })
        }))

      video.addEventListener('timeupdate', function() {
        if(this.duration - this.currentTime < 2) {
          startInMotion(this)
        }

        if(this.duration - this.currentTime < 0.1) {
          gsap.to(this, {autoAlpha: 0})
        }
      })

    })

    Promise.all(videoPromises).then(() => {
      document.querySelectorAll('.gate video.in').forEach(video => video.play())
    })
  }

  function startInMotion(video) {
    const $entry =  video.closest('[data-item]')
    if($entry.classList.contains('in')) return

    $entry.classList.add('in')
    const $tit = $entry.querySelector('.tit')
    const $desc = $entry.querySelector('.desc')
    const $func = $entry.querySelector('.func')
    gsap.to($tit, { y: 0, duration: 1.01, ease: Expo.easeInOut })
    gsap.to($desc, { y: 0, delay: 0.1, duration: 1.01, ease: Expo.easeInOut })
    gsap.to($func, { y: 0, delay: 0.2, duration: 1.01, ease: Expo.easeInOut, onComplete: () => {
      
    }})
  }

  const $entry = document.querySelector('.gate .entry')
  const $entryKSLV = $entry.querySelector('.entry__item--left .btn-entry-point')
  const $kslvVideo = $entry.querySelector('.entry__item--left video.hover')
  const $entryK9a1 = $entry.querySelector('.entry__item--top .btn-entry-point')
  const $k9a1Video = $entry.querySelector('.entry__item--top video.hover')
  const $entryRedback = $entry.querySelector('.entry__item--bottom .btn-entry-point')
  const $redbackVideo = $entry.querySelector('.entry__item--bottom video.hover')
  console.log($redbackVideo)

  $entryKSLV.addEventListener('mouseenter', function() {
    $entry.classList.add('is-left')
    gsap.to('.entry__item--left video.in', {autoAlpha: 0})
    $kslvVideo.play()
  })

  $entryKSLV.addEventListener('mouseleave', function() {
    $entry.classList.remove('is-left')
    $kslvVideo.playBackwards()
    // gsap.to($k9a1Tit, { textFillColor: 'transparent' })
  })


  $entryK9a1.addEventListener('mouseenter', function() {
    $entry.classList.add('is-top')
    gsap.to('.entry__item--top video.in', {autoAlpha: 0})
    $k9a1Video.play()
    // gsap.to($k9a1Tit, { textFillColor: '#000' })
  })

  $entryK9a1.addEventListener('mouseleave', function() {
    $entry.classList.remove('is-top')
    $k9a1Video.playBackwards()
    // gsap.to($k9a1Tit, { textFillColor: 'transparent' })
  })

  $entryRedback.addEventListener('mouseenter', function() {
    $entry.classList.add('is-bottom')
    gsap.to('.entry__item--bottom video.in', {autoAlpha: 0})
    $redbackVideo.play()
    console.log('coucou')
    // gsap.to($redbackTit, { textFillColor: '#000' })
  })

  $entryRedback.addEventListener('mouseleave', function() {
    $entry.classList.remove('is-bottom')
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