import * as THREE from 'three'

import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'


const loader = new GLTFLoader();


const group = new THREE.Group();
group.name = 'total'

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 })

const mesh = new THREE.Mesh(geometry, material)
mesh.name = 'Box'
mesh.visible = false
group.add(mesh)

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('./assets/draco/gltf/');
loader.setDRACOLoader(dracoLoader);


let mixer;
loader.load('./assets/LittlestTokyo.glb', (gltf) => {
  console.log(gltf.animations);

  const model = gltf.scene;
  model.scale.set(0.1, 0.1, 0.1);
  model.position.set(0, 5, 0);
  group.add(model)


  // 播放器
  mixer = new THREE.AnimationMixer(model);
  // 播放内容
  const clipAction = mixer.clipAction(gltf.animations[0]);
  clipAction.play();
  animate()
})


const clock = new THREE.Clock()
function animate() {
  const delta = clock.getDelta()
  mixer.update(delta)
  window.requestAnimationFrame(animate)
}

export default group

