import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

import group from './model.js'
import './animation.js'







const scene = new THREE.Scene();


scene.add(group)


const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 8000)

camera.position.set(-3, 16, 60)







scene.add(camera)




// const ambient = new THREE.AmbientLight(0xffffff, 0.6);

// scene.add(ambient);

// const direction = new THREE.DirectionalLight(0xffffff, 0.8);
// direction.castShadow = true;
// direction.position.set(-50, 50, -50)
// direction.shadow.mapSize.set(1024, 1024)
// direction.shadow.radius = 3

// // console.log(direction.shadow)
// // console.log(direction.target.position);
// const shadowCamera = direction.shadow.camera;
// shadowCamera.left = -50;
// shadowCamera.right = 20;
// shadowCamera.top = 50;
// shadowCamera.bottom = -20;
// shadowCamera.near = 20;
// shadowCamera.far = 140;

// scene.add(direction)
// scene.add(direction.target);




// const directionHelper = new THREE.DirectionalLightHelper(direction)
// scene.add(directionHelper)

const axes = new THREE.AxesHelper(50)
scene.add(axes)

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.render(scene, camera)
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.VSMShadowMap

const node = document.getElementById('webgl')
node.appendChild(renderer.domElement)
const stats = new Stats();
node.appendChild(stats.domElement)

const control = new OrbitControls(camera, renderer.domElement)

// control.target.set(center.x, center.y, 0);
control.update()

// control.addEventListener('change', function () {
//   renderer.render(scene, camera)
// })


const clock = new THREE.Clock();








window.onresize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;


  camera.updateProjectionMatrix()
}


function render() {
  const delta = clock.getDelta()
  control.update()
  renderer.render(scene, camera)

  stats.update()
  window.requestAnimationFrame(render)


}

const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.background = new THREE.Color(0xbfe3dd);
scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
renderer.outputEncoding = THREE.sRGBEncoding;

render()

