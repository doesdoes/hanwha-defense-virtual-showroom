import {gsap, Quint, Expo} from 'gsap/all'

(function() {
  const md = new MobileDetect(window.navigator.userAgent)
  const isMobile = md.mobile()


  const videoPromises = []
  // document.querySelectorAll('.gate video.in').forEach(video => {
  //   videoPromises.push(new Promise((resolve) => {
  //       video.src = video.dataset.src
  //       video.addEventListener('loadedmetadata', function() {
  //         resolve()
  //       })
  //     }))

  //   video.addEventListener('timeupdate', function() {
  //     if(this.duration - this.currentTime < 2) {
  //       startInMotion(this)
  //     }

  //     if(this.duration - this.currentTime < 0.1) {
  //       gsap.to(this, {autoAlpha: 0})
  //     }
  //   })

  // })

  // Promise.all(videoPromises).then(() => {
  //   document.querySelectorAll('.gate video.in').forEach(video => video.play())
  // })

  new Promise((resolve) => {

    document.querySelector('.gate video.in').addEventListener('loadedmetadata', function() {
      resolve()
    })

    document.querySelector('.gate video.in').addEventListener('timeupdate', function() {
      if(this.duration - this.currentTime < 0.05 && !isMobile) {
        document.querySelectorAll('.gate .product').forEach(entry => {
          startInMotion(entry)
        })
      }

      if(this.duration - this.currentTime < 0.2) {
        gsap.to(this, {autoAlpha: 0})
      }
    })
  })

  document.querySelector('.gate video.in').play()

  function startInMotion(entry) {
    const $entry =  entry.closest('[data-item]')
    if($entry.classList.contains('in')) return

    $entry.classList.add('in')
    const $tit = $entry.querySelector('.tit')
    const $desc = $entry.querySelector('.desc')
    const $func = $entry.querySelector('.func')
    gsap.to($tit, { y: 0, duration: 0.1, ease: Expo.easeInOut })
    gsap.to($desc, { y: 0, duration: 0.1, ease: Expo.easeInOut })
    gsap.to($func, { y: 0, duration: 0.1, ease: Expo.easeInOut })
  }

  
  // KSLV
  if(!isMobile) {
    const $entry = document.querySelector('.gate .entry')
    const $entryKSLV = $entry.querySelector('.entry__item--left .btn-entry-point')
    const $entryK9a1 = $entry.querySelector('.entry__item--top .btn-entry-point')
    const $entryRedback = $entry.querySelector('.entry__item--bottom .btn-entry-point')

    $entryKSLV.addEventListener('mouseenter', function() {
      $entry.classList.add('is-left')
    })
  
    $entryKSLV.addEventListener('mouseleave', function() {
      $entry.classList.remove('is-left')
    })
  
    //K9
    $entryK9a1.addEventListener('mouseenter', function() {
      $entry.classList.add('is-top')
    })
  
    $entryK9a1.addEventListener('mouseleave', function() {
      $entry.classList.remove('is-top')
    })
  
    // REDBACK
    $entryRedback.addEventListener('mouseenter', function() {
      $entry.classList.add('is-bottom')
    })
  
    $entryRedback.addEventListener('mouseleave', function() {
      $entry.classList.remove('is-bottom')
    })
  }


  // HTMLVideoElement.prototype.playBackwards = function() {
  //   this.pause();

  //   var video = this;

  //   var fps = 25;
  //   var intervalRewind = setInterval(function() {
  //       if(video.currentTime == 0){
  //          clearInterval(intervalRewind);
  //          video.pause();
  //       }
  //       else {
  //           video.currentTime += -(1/fps);
  //       }
  //   }, 1000 / fps);
  // };

})()