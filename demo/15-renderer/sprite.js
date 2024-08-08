import * as THREE from 'three'

const texLoader = new THREE.TextureLoader();
const texture = texLoader.load("../images/warning-status.png");
const spriteMaterial = new THREE.SpriteMaterial({
  map: texture,
});
const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(10, 10, 1);
// sprite.position.y = 20;
export default sprite