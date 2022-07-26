import * as THREE from 'three'

export const PROPERTIES = {
  scale: new THREE.Vector3(10.5, 10.5, 10.5),
  position: new THREE.Vector3(0, -1.0, 0),
  rotation: new THREE.Euler(0, 0, 0),
  texturesQuality: "medium"
}

export const MATERIALS = {
  "TANK_K9A1_Head_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "TANK_K9A1_Head_CAMO.jpg",
    "emissiveMap": "TANK_K9A1_Head_CAMO.jpg",
    "normalMap": "TANK_K9A1_Head_H_N_1k.jpg",
    "flipY": false,
    "roughness": 1.0,
    "metalness": 0.0,
    "reflectivity": 0.5,
    "clearcoat": 1.0,
    "clearcoatRoughness": 0.4,
  },
  "TANK_K9A1_Body_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "specular": new THREE.Color("rgb(127,127,127)"),
    "map": "TANK_K9A1_Body_CAMO.jpg",
    "emissiveMap": "TANK_K9A1_Body_CAMO.jpg",
    "normalMap": "TANK_K9A1_Body_H_N_2k.jpg",
    "flipY": false,
    "roughness": 1.0,
    "metalness": 0.0,
    "reflectivity": 0.5,
    "clearcoat": 1.0,
    "clearcoatRoughness": 0.4,
  },
  "TANK_K9A1_Track_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "TANK_K9A1_TrackWheel.jpg",
    "emissiveMap": "TANK_K9A1_TrackWheel.jpg",
    "normalMap": "TANK_K9A1_TrackWheel_N.jpg",
    "flipY": false,
    "roughness": 1.0,
    "metalness": 0.0,
    "reflectivity": 0.5,
    "clearcoat": 1.0,
    "clearcoatRoughness": 0.4,
    "side": THREE.DoubleSide,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
  },
  "TANK_K9A1_Track_UVAni_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "map": "TANK_K9A1_TrackWheel.jpg",
    "emissiveMap": "TANK_K9A1_TrackWheel.jpg",
    "normalMap": "TANK_K9A1_TrackWheel_N.jpg",
    "flipY": false,
    "roughness": 1.0,
    "metalness": 0.0,
    "reflectivity": 0.5,
    "clearcoat": 1.0,
    "clearcoatRoughness": 0.4,
    "side": THREE.DoubleSide,
    "mapTiling":{
      repeatX: 1,
      repeatY: 1,
    },
  },
  "BG_Snow_Floor_TankShadow_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(15,23,40)"),
    "transparent": true,
    "alphaMap": "BG_Snow_Floor_TankShadow_A.jpg",
  },
  "BG_Snow_TrackSkid_s": {
    "type": new THREE.MeshPhysicalMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "alphaMap": "TrackSkid_A.jpg",
    "transparent": true,
    "opacity": 0.4,
    "alphaMapTiling":{
      repeatX: 1,
      repeatY: 1,
    }
  },
  "BG_Snow_Dust_SeqAni_s": {
    "type": new THREE.MeshStandardMaterial(),
    "color": new THREE.Color("rgb(255,255,255)"),
    "alphaMap": "dirt_spritesheet_horizon.png",
    "transparent": true,
    "depthWrite": false,
  },
  // "Glow_Effect": {
  //   "type": new THREE.ShaderMaterial(),
  //   "uniforms": 
  //   { 
  //     "s":   { type: "f", value: -1.0},
  //     "b":   { type: "f", value: 1.0},
  //     "p":   { type: "f", value: 2.0 },
  //     glowColor: { type: "c", value: new THREE.Color(0x00ffff) }
  //   },
  //   "vertexShader": `
  //   varying vec3 vNormal;
  //   varying vec3 vPositionNormal;
  //   void main() 
  //   {
  //     vNormal = normalize( normalMatrix * normal ); // 转换到视图空间
  //     vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);
  //     gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  //   }
  //   `,
  //   "fragmentShader": `
  //   uniform vec3 glowColor;
  //   uniform float b;
  //   uniform float p;
  //   uniform float s;
  //   varying vec3 vNormal;
  //   varying vec3 vPositionNormal;
  //   void main() 
  //   {
  //     float a = pow( b + s * abs(dot(vNormal, vPositionNormal)), p );
  //     gl_FragColor = vec4( glowColor, a );
  //   }
  //   `,
  //   "side": THREE.BackSide,
  //   // "blending": THREE.MultiplyBlending,
  //   "transparent": true,
  //   "opacity": 0.1,
  // },

  "Glow_Effect": {
    "type": new THREE.ShaderMaterial(),
    "uniforms": 
    { 
      coefficient: {
        // value: coefficient,
        value: 0.5,
      },
      color: {
        // value: new Color(color),
        value: new THREE.Color(0xffffff),
        // value: new THREE.Color('gold'),
      },
      power: {
        // value: power,
        value: 1,
      },
      // glowColor: { type: "c", value: new THREE.Color(0x00ffff) }
    },
    "vertexShader": `
    varying vec3 vVertexWorldPosition;
    varying vec3 vVertexNormal;
    void main() {
      vVertexNormal	= normalize(normalMatrix * normal);
      vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    "fragmentShader": `
    uniform vec3 color;
    uniform float coefficient;
    uniform float power;
    varying vec3 vVertexNormal;
    varying vec3 vVertexWorldPosition;
    void main() {
      vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
      vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
      viewCameraToVertex = normalize(viewCameraToVertex);
      float intensity	= pow(
        coefficient + dot(vVertexNormal, viewCameraToVertex),
        power
      );
      gl_FragColor = vec4(color, intensity);
    }
    `,
    "side": THREE.BackSide,
    // "blending": THREE.MultiplyBlending,
    "transparent": true,
  },
} 