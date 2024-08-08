import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader();


const group = new THREE.Group();
loader.load('../model/car/su7.glb', function (gltf) {
  const car = gltf.scene;
  group.add(car);
  const bar = document.getElementById('progressBar');
  bar.style.display = 'none';
}, function (xhr) {
  const node = document.getElementById('progress');
  const progress = Math.ceil(xhr.loaded / xhr.total * 100) + '%'
  console.log(progress);
  node.innerHTML = progress;
  node.style.width = progress

})

const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({ color: 0x0000ff })

const mesh = new THREE.Mesh(geometry, material);

export { mesh, group }

