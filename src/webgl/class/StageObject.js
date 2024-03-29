import * as THREE from 'three'
import { STATE } from '../global.js'
import UILoadingManager from './UILoadingManager.js'

export class StageObject{
  constructor(_options){
    this.original = _options.originalObject
    this.clone = _options.clonedObject
    this.name = _options.objectName
    this.definition = _options.definition
    this.clone.position.copy( this.definition.PROPERTIES.position )
    this.texturesPath = `${STATE.ASSET_DOMAIN_PATH}/textures/${this.name}/${_options.definition.PROPERTIES.texturesQuality}/`

    this.loadedTextures = {
      map: {},
      emissiveMap: {},
      alphaMap: {},
      aoMap: {},
      metalnessMap: {},
      roughnessMap: {},
      specularMap: {},
      normalMap: {},
      bumpMap: {},
      displacementMap: {},
      envMap: {},
      lightMap: {},
    }

    this.loadingManagerLoaded = false
    this.pendingTexturesUpdated = false
    this.needToBeUpdated = []

    this.LOADING_MANAGER = new THREE.LoadingManager()
    this.LOADING_MANAGER.onProgress = ( url, itemsLoaded, itemsTotal ) => { if(STATE.WEBGL.isDebug) console.log( `%cTextures loading: ${url} (${itemsLoaded}/${itemsTotal})`,'color:#787878;') }
    this.LOADING_MANAGER.onError = ( url ) => {console.log( 'There was an error loading ' + url )}
    
    const uiLoadingManager = new UILoadingManager()
    uiLoadingManager.addTexture(new Promise((resolve, reject) => {
      this.LOADING_MANAGER.onLoad = () => {
        this.loadingManagerLoaded = true
        if (!this.pendingTexturesUpdated) this.updatePendingTexures()
        resolve()
      }
    }))

    this.textureLoader = new THREE.TextureLoader(this.LOADING_MANAGER)

    this.updateProperties()
    this.updateMaterial(this.clone, true)
  }

  updatePendingTexures(){
    this.pendingTexturesUpdated = true
    for (let mesh of this.needToBeUpdated){
      mesh.mesh.material.dispose()
      mesh.mesh.material = mesh.clonedMaterial
      mesh.clonedMaterial.dispose()
    }
    this.needToBeUpdated = []
  }

  toggleVisibility(_toggle){
    this.clone.visible = _toggle
  }

  updateProperties(){
    this.clone.scale.copy( this.definition.PROPERTIES.scale )
    this.clone.position.copy( this.definition.PROPERTIES.position )
    this.clone.rotation.copy( this.definition.PROPERTIES.rotation )
  }

  async updateMaterial(object, loadTextures = false){
    this.pendingTexturesUpdated = false

    object.traverse( async child => {
      child.sceneName = this.name
      if( child.material ){
        if (!this.definition.MATERIALS[child.material.name]) return

        let cloneMat = this.definition.MATERIALS[child.material.name].type
        cloneMat.name = child.material.name // copy material name from the orginal material

        // textures
        if(loadTextures){
          for(let mapKey in this.loadedTextures){            
            if(this.definition.MATERIALS[cloneMat.name][mapKey] != undefined){
              let matKey = child.material.name
              let file = this.definition.MATERIALS[cloneMat.name][mapKey]

              if (this.loadedTextures[mapKey][matKey]) {
                cloneMat[mapKey] = this.loadedTextures[mapKey][matKey] // get texture from class memory
              }else{
                this.loadingManagerLoaded = false
                let mapText = this.textureLoader.load( this.texturesPath + file )
                if(this.definition.MATERIALS[child.material.name].sRGBmode) {
                  mapText.encoding = (mapKey == 'map' || mapKey == 'emissiveMap' || mapKey == 'envMap') ? THREE.sRGBEncoding : THREE.LinearEncoding
                }else {
                  mapText.encoding = THREE.LinearEncoding
                }
                mapText.mapping = THREE.EquirectangularReflectionMapping
                cloneMat[mapKey] = mapText

                if(this.definition.MATERIALS[child.material.name].flipY  != undefined) mapText.flipY = this.definition.MATERIALS[child.material.name].flipY

                // tiling
                if(mapKey == "map" || mapKey == "alphaMap" || mapKey == "emissiveMap" || mapKey == "normalMap" || mapKey == "specularMap" || mapKey == "lightMap") {                  
                  let tiling
                  switch (mapKey) {
                    case 'map':
                      tiling = this.definition.MATERIALS[child.material.name].mapTiling
                      break;
                    case 'alphaMap':
                      tiling = this.definition.MATERIALS[child.material.name].alphaMapTiling
                      break;
                    case 'emissiveMap':
                      tiling = this.definition.MATERIALS[child.material.name].emissiveMapTiling
                      break;
                    case 'normalMap':
                      tiling = this.definition.MATERIALS[child.material.name].normalMapTiling
                      break;
                    case 'specularMap':
                      tiling = this.definition.MATERIALS[child.material.name].specularMapTiling
                      break;
                    case 'lightMap':
                      tiling = this.definition.MATERIALS[child.material.name].lightMapTiling
                      break;
                  }

                  if(tiling != undefined) {
                    mapText.wrapS = THREE.RepeatWrapping
                    mapText.wrapT = THREE.RepeatWrapping
                    mapText.repeat.set(tiling.repeatX, tiling.repeatY)
                  }
                }

                this.loadedTextures[mapKey][matKey] = mapText // keep texture in the class memory
              }
            }
          }
        }

        for (let key in cloneMat) 
          if(!(key in this.loadedTextures) && !key.includes('type') && this.definition.MATERIALS[cloneMat.name][key] != undefined)
            cloneMat[key] = this.definition.MATERIALS[cloneMat.name][key]
        
        this.needToBeUpdated.push( {mesh: child, clonedMaterial: cloneMat} )

        if(STATE.WEBGL.isDebug) if(cloneMat.name == "Launcher_Prop_s") console.log(cloneMat)
      }
    })

    if(!this.pendingTexturesUpdated && this.loadingManagerLoaded){
      this.updatePendingTexures()
    }
  }
}
