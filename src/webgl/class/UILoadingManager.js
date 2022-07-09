let instance = null
export default class UILoadingManager {
  constructor() {
    if(instance) return instance

    this.texturePromise = []

    instance = this
  }

  addTexture(promise) {
    this.texturePromise.push(promise)
  }

  waitTextures(callback) {
    Promise.all(this.texturePromise).then((values) => {
      console.log('All textures are loaded')
      this.texturePromise = []
      callback && callback()
    });
  }
}