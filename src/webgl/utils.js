import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'

export function lerp(start, end, amt){
  return (1 - amt) * start + amt * end
}

export function normalize(current, min, max) {
  return (current - min) / (max - min)
}

export function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

export function createSpriteTween( _mesh, _texture, _tilesHoriz, _tilesVert, _duration, _delay = 0 ){
  _mesh.material.map = _texture
  //_mesh.material.alphaMap = _texture

  // setup wrap of texture
  _texture.wrapS = _texture.wrapT = THREE.RepeatWrapping
  _texture.repeat.set( 1 / _tilesHoriz, 1 / _tilesVert )
  _texture.flipY = false

  const tileInfo = { currentTile: 0}
  return new TWEEN.Tween( tileInfo )
    .to( { currentTile: _tilesHoriz * _tilesVert}, _duration )
    .repeat(Infinity)
    .delay(_delay)
    .easing( TWEEN.Easing.Linear.None )
    .onStart( () => {} )
    .onUpdate( ( e, progress ) => {
      let tile = Math.round(tileInfo.currentTile)
      if (tile >= _tilesHoriz * _tilesVert) return

      let currentColumn = tile % _tilesHoriz
      _texture.offset.x = currentColumn / _tilesHoriz

      let currentRow = Math.floor( tile / _tilesHoriz )
      _texture.offset.y = currentRow / _tilesVert
    } )
    .onComplete( () => {})
}