
import i18next from 'i18next'

(() => {
  // console.log(document.documentElement.lang)

  i18next.init({
    lng: document.documentElement.lang,
    // debug: true,
    ns: ['GATE', 'K9A1', 'REDBACK'],
    defaultNs: 'GATE',
    resources: {
      ko: {
        'GATE': {
          'vsr00': '국내 독자 기술로 개발한 세계 최고의 자주포',
          'vsr01': '공격 능력과 방어 능력을 모두 갖춘 미래형 보병전투장갑차',
          'guide360': '',
          'guide1': '',
          'guide2': '',
          'guide3': '',
        },
        'K9A1': {
          'poi1': 'K9A1 자주포는 360도 전방위 공격이 가능한 자주포로, K307탄을 활용하여 40km의 화력 지원이 가능하고 NATO 규격탄과의 호환이 가능하도록 개발했습니다. 사격정보를 받은 뒤 기동간 60초 이내, 정지간 30초 이내 사격이 가능합니다.',
          'poi2': '',
          'poi3': '',
          'poi4': '',
          'poi5': '',
        },
        'REDBACK': {
          'poi1': '',
          'poi2': '',
          'poi3': '',
          'poi4': '',
          'poi5': '',
        },
      },
      en: {
        'GATE': {
          'vsr00': 'world best',
          'vsr01': 'HI',
          'guide360': '',
          'guide1': '',
          'guide2': '',
          'guide3': '',
        },
        'K9A1': {
          'poi1': 'The K9A1 self-propelled howitzer is capable of 360-degree attacks. In addition, using K307 rounds, it is possible to support 40km of firepower and is compatible with NATO standard ammunition. After receiving the shooting information, it can fire within 60 seconds between maneuvers and within 30 seconds between stops.',
          'poi2': '',
          'poi3': '',
          'poi4': '',
          'poi5': '',
        },
        'REDBACK': {
          'poi1': '',
          'poi2': '',
          'poi3': '',
          'poi4': '',
          'poi5': '',
        },
      },
    }
  }).then(function(t) {
    document.querySelectorAll('[data-i18n').forEach(element => {
      const key = element.getAttribute('data-i18n')
      element.innerHTML = i18next.t(key)
      // console.log(element, i18next.t('WEBGL:vsr01'), key)
    })
  });
  
})()