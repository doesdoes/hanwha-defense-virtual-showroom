# 더즈인터랙티브 한화디펜스 버추얼쇼룸 개발 가이드 v1

* HTML 표준과 시맨틱한 문서 작성을 원칙으로 했지만 작업자들의 편의와 의견 또한 균형 있게 많이 반영했습니다.

- - -

1. [환경 세팅](#basic)
    1. [설치](#install)
2. [폴더 구조](#structure)
3. [webgl](#webgl)
    1. [3D Object](#3dObject)
    2. [Scene 구성](#scene-structure)
    3. [Lighting](#lighting)
    4. [Camera](#camera)
    5. [Animation](#animation)
4. [Java Script](#java-script)
    1. [구조와 로드 순서](#js-structure)
    2. [공통 모듈](#js-module)
    3. [외부 라이브러리 vendors](#vendors)
5. [HTML](#html)
    1. [게이트](#gate)

- - -

## 환경 세팅 <a id="basic" href="#basic">#</a>

### 설치 <a id="install" href="#install">#</a>
설치 및 로컬 실행
```js
// node v14.18.1
// npm v6.14.15
npm i
npm run start
```

배포를 위해 번들링하기 위한 명령어도 있습니다.

```js
npm run build // 배포를 위한 번들링 만들기
```

- - -

## 폴더 구조 <a id="structure" href="#structure">#</a>

크게 public과 src로 나뉘어져 있는 쇼룸 소스는 호스팅되는 모든 리소스가 있는 public에 원본소스가 있는 src 경로의 파일들을 빌드하여 배포하고 확인합니다.

```
.
├── README.md (개발 가이드)
├── package.json
│
├── public/assets
│   ├── content
│   ├── css
│   ├── draco
│   ├── glb
│   └── textures
└── src
   ├── scss
   ├── webgl
   ├── app.js
   ├── gate.js
   ├── tagging.js
   └── translate-i18n.js
│
└── webpack.config.js
└── node_modules
```

- - -

## WEBGL <a id="webgl" href="#webgl">#</a>

### WEBGL 오브젝트 <a id="3dObject" href="#3dObject">#</a>

* 3d 화면을 구성하기 위해 three.js 라이브러리를 사용하며 3d 모델 파일은 glb를 사용합니다.
* 머티어리얼, 텍스쳐매핑을 위한 오브젝트 세팅은 /stageObjects 하위의 각 모델 별 js를 만들어 구성합니다.
* 이 파일에는 머티어리얼과 텍스쳐 정보가 모두 한 곳에 기술되어 있어 보이는 룩에 관련된 모든 설정이 이루어집니다.

```js
export const PROPERTIES = {
  scale: new THREE.Vector3(10.5, 10.5, 10.5),
  position: new THREE.Vector3(0, -1.0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "TANK_REDBACK_Head_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "RedBack_Head_D_Color.jpg",
    "emissiveMap": "RedBack_Head_D_Color.jpg",
    "normalMap": "RedBack_Head_N_Renamed.jpg",
    "flipY": false,
    "roughness": 1.0,
    "metalness": 0.0,
    "reflectivity": 0.5,
    "clearcoat": 1.0,
    "clearcoatRoughness": 0.4,
  },
```

### scene 구성 <a id="scene-structure" href="#scene-structure">#</a>

케이스 별 Scene 에 대한 정보값을 가집니다. 이곳에서 클릭포인트 설정, 애니메이션 세팅과 같은 Scene 구성을 합니다.
디펜스 쇼룸에선 제품 2종, 스테이지 2종해서 총 4가지 케이스가 있습니다. 

```js
switch (sceneName) {
    case 'K9A1':
      setLight(STATE)
      setHemisphereLightSnowDefault(STATE)
      const k9Points = [];
      let spriteObjectDust, spriteObjectWind, spriteObjectTrackSkid = null

      const TANK_MESH = ASSETS.K9A1.MODEL_FILES.find( obj => { return obj.name === "k9Tank" } )
      const TANK_OBJECT = new StageObject({
        originalObject: TANK_MESH.asset.scene,
        clonedObject: TANK_MESH.asset.scene.clone(),
        objectName: 'k9Tank',
        definition: K9_TANK_PROPERTIES,
      })
      STATE.WEBGL.scene.add(TANK_OBJECT.clone)

      if(TANK_MESH.asset.animations.length > 0){
        STATE.ANIMATIONS._k9Tank.mixer = new THREE.AnimationMixer( TANK_OBJECT.clone )
        TANK_MESH.asset.animations.forEach(anim => {
          STATE.ANIMATIONS._k9Tank.mixer.clipAction( anim )
        })
      }
      ...
```

### lighting <a id="lighting" href="#lighting">#</a>

쇼룸에 설정된 라이트는 총 3개로 2개의 directional light 와 1개의 hemishpere light를 사용합니다.
이 중 hemishpere light는 Scene의 오브젝트들의 색상에 영향을 끼칩니다.

```js
export function setHemisphereLightSnowDefault(STATE) {
  STATE.hemisphereLight.color = new THREE.Color(0xf5f7fa)
  STATE.hemisphereLight.groundColor = new THREE.Color(0xa6abb3)
  STATE.hemisphereLight.intensity = 1.0
}

export function setHemisphereLightDesertDefault(STATE) {
  STATE.hemisphereLight.color = new THREE.Color(0xFFFFFF)
  STATE.hemisphereLight.groundColor = new THREE.Color(0x778DB1)
  STATE.hemisphereLight.intensity = 0.5
}
```
- - -

### camera <a id="camera" href="#camera">#</a>

카메라 관련 속성은 기본 설정과 더불어 global.js쪽에서 클릭포인트 별 설정이 분기되어 있습니다.
기본 설정은 /class/Webgl.js 에 되어 있는데 CamerasControl 객체를 통해 카메라의 현재 시점과 위치를 결정합니다.

```js
// global.js
ZONE_FOCUS:{
  reset: {
    position: new THREE.Vector3(0,0,0),
    target: new THREE.Vector3(0,0,0),
    sobelObj: new THREE.Mesh(),
  },
  k9a1Origin: {
    position: new THREE.Vector3(3.99, 0.095, -2.94),
    positionM: new THREE.Vector3(8.59, 0.22, -6.35),
    target: new THREE.Vector3(0,0,0),
  },
  redbackOrigin: {
    position: new THREE.Vector3(2.87, -0.02, -2.37),
    positionM: new THREE.Vector3(6.74, -0.04, -5.56),
    target: new THREE.Vector3(0,0,0),
  },
  longerFiringRange: {
    position: new THREE.Vector3(3.8,-0.36,-1.47),
    target: new THREE.Vector3(0,0,0),
    minAzimuth: THREE.MathUtils.degToRad(60),
    maxAzimuth: THREE.MathUtils.degToRad(110),
    sobelObj: new THREE.Mesh(),
  },
```

### Animation <a id="animation" href="#animation">#</a>

쇼룸에 사용된 애니메이션은 2종인데 UV애니메이션과 메쉬 오브젝트 애니메이션입니다.
render 루프 내부에 애니메이션 플래그가 참일 경우 지정된 키에 해당하는 애니메이션이 재생됩니다.
이를 선언하는 부분은 scene.js에 위치합니다.


```js
function render( time ){
    requestAnimationFrame( render )

    if(window.isAnim) {
      // uv animations
      if (STATE.UV_ANIMATED_OBJECTS) {
        for (const key in STATE.UV_ANIMATED_OBJECTS) {
          STATE.UV_ANIMATED_OBJECTS[key].animate()
        }
      }

      // animations
      if (STATE.ANIMATED_OBJECTS) {
        for (const key in STATE.ANIMATED_OBJECTS) {
          STATE.ANIMATED_OBJECTS[key].animate()
        }
      }
    }
    ...
```

## Java Script <a id="java-script" href="#java-script">#</a>

### 구조와 로드 순서 <a id="js-structure" href="#js-structure">#</a>
공통 스크립트의 개념적 구조도는 아래와 같습니다. 프로젝트의 공통이 되는 베이스 모듈을 common.js 라는 하나의 스크립트로 로드하여 통합하고, 이를 각 페이지 단위의 스크립트에서 임포트합니다.

```
├── js/lib
    │   ├── 모듈 1
    │   ├── 모듈 2
    │   ├── 모듈 3
    │   ├── ...
    │   └── common
    ├── newsroom.js
    ├── whoweare.js
    ├── whatwedo.js
    └── index.js
```

각 스크립트는 main() 함수 내부에 위치하고 DOMContentLoaded를 통해 실행합니다.

### 공통 모듈 <a id="js-module" href="#js-module">#</a>
/js/lib/ 에 사이트에서 공통적으로 사용할 공통 모듈이 정의되어 있습니다. 주요 모듈은 다음과 같습니다.

* dropdown.js : 헤더 드롭다운 박스를 생성하는 동작시키는 코드입니다.
* indicator.js : change condition과 클릭 포인트 관련 UI 세트
* translate-i18n.js :  다국어 처리 모듈
* tagging.js : 태깅을 일괄 처리하기 위한 유틸리티
* util.js : 스프라이트 애니메이션 처리등과 같은 웹지엘 관련 유틸리티 함수 모음.

### 외부 라이브러리 vendors <a id="vendors" href="#vendors">#</a>

* three.js
* gsap
* i18next
* camera-controls
* lottie

- - -

## HTML <a id="html" href="#html">#</a>

### 게이트 <a id="gate" href="#gate">#</a>
게이트 부분은 웹지엘과는 별도의 퍼블리싱된 영역으로 데스크탑에선 2개의 영상을, 모바일에선 1개의 영상을 사용합니다.
영상이 재생되는 시간에 따라 버튼이 나오는 모션이 삽입되어 있습니다.

```js
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
```

데스크탑의 경우 버튼에 마우스 호버가 될 때 영상 리와인드가 필요하여 2개 영상을 동기화 시켜 처리했습니다.


- - -

Released under MIT by, and copyright 2022, @DOES Interactive


### 레퍼런스
* 에어비앤비 스타일 가이드 https://github.com/airbnb/css
* 레진 마크업 가이드 https://github.com/lezhin/markup-guide
* mdo 코드 가이드 https://codeguide.co/
* github css 가이드 https://primer.style/css/