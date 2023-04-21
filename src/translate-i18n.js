
import i18next from "i18next"

(() => {
  // console.log(document.documentElement.lang)

  i18next.init({
    lng: document.documentElement.lang,
    // debug: true,
    ns: ['GATE', 'K9A1', 'REDBACK', 'KSLV'],
    defaultNs: 'GATE',
    resources: {
      ko: {
        "GATE": {
          "vsr00": "국내 독자 기술로 개발한 세계 최고의 자주포",
          "vsr01": "공격 능력과 방어 능력을 모두 갖춘 미래형 보병전투장갑차",
          "guide360": "제품을 360도 돌려보고<br> 추가정보를 확인해보세요",
          "guide1": "제품명을 클릭해서 다른 제품의 쇼룸 이동해보세요",
          "guide2": "다양한 환경에서도 최적화되어있는 <span class='guide-product-name'>K9 자주포</span>의 모습을 확인해보세요",
          "guide3": "<span class='guide-product-name'>K9 자주포</span>에 대해 더 자세히 알아보세요",
          "close": "닫기",
        },
        "K9A1": {
          "title": "K9 자주포",
          "longerFiringRange": "K9 자주포 자주포는 360도 전방위 공격이 가능한 자주포로, K307탄을 활용하여 40km의 화력 지원이 가능하고 NATO 규격탄과의 호환이 가능하도록 개발했습니다. 사격정보를 받은 뒤 기동간 60초 이내, 정지간 30초 이내 사격이 가능합니다.",
          "highMobility": "K9 자주포 자주포의 강력한 파워팩은 유기압 현수장치와 결합되어, 최대 67km/h 빠른 속도와 높은 사격정확도. 그리고 사격 후의 신속한 진지 이탈이 가능하여 아군의 생존성을 높입니다.",
          "ammunitionLoader": "최대 48발의 탄약 적재 능력을 갖추고 있으며 탄약 적재로부터 이송, 장전까지의 전 과정을 자동화하여 신속한 집중 화력 제공이 가능합니다.",
          "automaticControlSystem": "자동 사격통제장치와 GPS를 적용하여 사격정확성과 효율성을 향상하였으며 디지털 지도와 전자식 교범을 탑재하여 운용 편의성을 증대하였습니다. ",
          "irCamera": "야간 기동성을 향상시키기 위하여 열상형 야간잠망경을 적용했으며 전/후방 카메라 장착을 통해, 감시경계 강화 및 아군의 생존성을 강화하였습니다.",
        },
        "REDBACK": {
          "mainArmamentSystem": "NATO 규격의 30mm탄 사격이 가능한 무장을 탑재하였고, 사용자의 요구에 따라 유/무인 포탑 선택 적용이 가능합니다.",
          "antiTankArmamentSystem": "전차 대응 능력 강화를 위해 대전차유도 미사일이 탑재되어 있습니다.",
          "bestMobility": "최대 속도 65km/h, 항속거리 600km 이상의 기동력과 종방향 60%, 횡방향 30% 경사 주행 능력을 갖추고 있습니다.",
          "superiorProtection": "STANAG LEVEL 6 의 방탄능력, STANAG LEVEL 4의 대전차 지뢰 방호력을 갖추고 있습니다. 또한 능동방어 시스템, RPG 방어시스템, BOMBLET 방어 능력을 갖추고 있습니다.",
          "isuRubberTrack": "ISU와 고무궤도를 장착하여 뛰어난 승차감과 안정된 기동성능을 확보하였습니다.",
        },
        "KSLV": {
          "ton75classEngine": "나로호 개발 당시 선행연구로 진행한 30톤급 액체 엔진 기술을 바탕으로 개발을 진행해, 연소불안정 현상의 기술적 한계를 극복하고 지상 연소시험과 시험발사체 발사를 통한 비행성능 시험을 거쳐 세계 7번째로 중대형 액체엔진 개발에 성공하였습니다​",
          "engineClustering": "75톤급 액체엔진 4기를 묶어 300톤의 추력을 내는 클러스터링(Clustering)방식을 활용하였으며, 4기의 엔진을 구조적 안정성을 유지하면서 마치 하나의 엔진처럼 동일한 추력을 내는 기술 개발에 기여하였습니다.​",
          "liquidEngineFuelSystem": "항우연과 한화는 국내 최초로 중형급 액체 발사체 추진공급계를 개발에 참여하였습니다. 균등한 추진제 공급을 통해 안정적인 발사 성능을 구현하며 공급 배관 및 충전 배출/개폐 밸브 등으로 구성됩니다. ",
          "ton7classEngine": "75톤급과 동일하게 가스발생기 사이클의 액체 엔진이며 누리호 3단에 장착됩니다​",
          "collisionPreventionSystem": "위성을 보호하는 페어링 분리를 제어하는 시스템입니다",
        },
      },
      en: {
        "GATE": {
          "vsr00": "The world's best self-propelled howitzer developed with Hanwha's technology",
          "vsr01": "The futuristic infantry fighting vehicle with state-of-art defensive & offensive technologies",
          "guide360": "Turn the product 360 degrees<br> and check for additional information",
          "guide1": "Click to go to other product's showroom",
          "guide2": "Check out the <span class='guide-product-name'>K9 SPH</span> that's optimized in any operational environment",
          "guide3": "Learn more about <span class='guide-product-name'>K9 SPH</span>",
          "close": "Close",
        },
        "K9A1": {
          "title": "K9 SPH",
          "longerFiringRange": "The K9 SPH self-propelled howitzer is capable of 360-degree attacks. In addition, using K307 rounds, it is possible to support 40km of firepower and is compatible with NATO standard ammunition. After receiving the shooting information, it can fire within 60 seconds between maneuvers and within 30 seconds between stops.",
          "highMobility": "The powerful power pack of the K9 SPH self-propelled howitzer is combined with a Hydropneumatic Suspension Unit, resulting in a high speed of up to 67 km/h and high firing accuracy. In addition, it can quickly leave the camp after firing, increasing the survivability of the allies.",
          "ammunitionLoader": "It is equipped with a loading capacity of up to 48 rounds, and it can rapidly provide concentrated firepower by automating the entire process from loading ammunition to transport and loading.",
          "automaticControlSystem": "The automatic fire control system and GPS were applied to improve shooting accuracy and efficiency, and the digital map and electronic manual were installed to increase operational convenience.",
          "irCamera": "To improve night mobility, a driver’s thermal night viewer was applied, and front and rear cameras were installed to strengthen the surveillance and vigilance and enhance the survivability of the allies.",
        },
        "REDBACK": {
          "mainArmamentSystem": "It is equipped with an armament capable of firing NATO standard 30mm bullets, and depending on the user's request, a manned/unmanned turret can be applied.",
          "antiTankArmamentSystem": "It is equipped with anti-tank guided missiles to enhance tank response capabilities.",
          "bestMobility": "It has a maximum speed of 65 km/h, the maneuverability of more than 600 km of range, and the ability to run on a slope of 60% longitudinally and 30% lateral.",
          "superiorProtection": "It has the bulletproof ability of STANAG LEVEL 6 and anti-tank mine protection of STANAG LEVEL 4. In addition, it is equipped with an active defense system, RPG defense system, and BOMBLET defense ability.",
          "isuRubberTrack": "ISU and rubber tracks are installed to ensure excellent ride quality and stable maneuverability.",
        },
        "KSLV": {
          "ton75classEngine": "Leveraging the 30-ton liquid engine technology we developed for the Naro rocket through preliminary research, we were able to surmount the technical obstacles related to combustion instability. Through static firing tests on the ground and test firing conducted to evaluate flight performance, we successfully developed a large liquid-propellant engine, becoming the 7th country in the world to achieve this feat. ​",
          "engineClustering": "Our development efforts involved utilizing a clustering method to combine four 75-ton liquid engines, generating a total thrust of 300 tons, and we were able to ensure structural stability of the engines while producing the same thrust as a single engine, thereby contributing to technological advancements. ​",
          "liquidEngineFuelSystem": "For the first time in Korea, the Korea Aerospace Research Institute and Hanwha Aerospace jointly developed a propulsion supply system for medium-sized liquid-propellant launch vehicles. This system consists of supply pipes, charging and discharge valves, and enables stable launch performance through uninterrupted fuel supply.",
          "ton7classEngine": "The third stage of the Nuri rocket will be outfitted with a liquid-propellant engine featuring a gas generator cycle identical to that of the 75-ton engine.",
          "collisionPreventionSystem": "This system is designed to control fairing separation to safeguard the satellite. ",
        },
      },
    }
  }).then(function(t) {
    document.querySelectorAll("[data-i18n").forEach(element => {
      const key = element.getAttribute("data-i18n")
      element.innerHTML = i18next.t(key)
      // console.log(element, i18next.t("WEBGL:vsr01"), key)
    })
  });
  
})()