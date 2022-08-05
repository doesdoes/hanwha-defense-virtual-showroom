(() => {

  //1
  const md = new MobileDetect(window.navigator.userAgent)
  const isMobile = md.mobile()
  const device = isMobile ? 'm_' : ''

  //2
  const lang = document.documentElement.lang === 'en' ? '_eng' : ''

  document.querySelectorAll('[data-tagging]').forEach(tag => {
    const tagging = `${device}${tag.dataset.tagging}${lang}`

    tag.addEventListener('click', function() {
      gtag('event', tagging)
    })
  })

  document.querySelectorAll('[data-tagging-suffix]').forEach(tag => {
    const taggingSuffix = tag.dataset.taggingSuffix
    const state = document.querySelector('.header[data-state]')
    const prd = state.dataset.state.split('-')[0].toLowerCase()

    tag.addEventListener('click', function() {
      const tagging = `${device}showroom_${prd}_${taggingSuffix}${lang}`
      console.log(prd, taggingSuffix, tagging)
      gtag('event', tagging)
    })
  })
})()