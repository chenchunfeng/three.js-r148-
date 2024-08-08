import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js';

import createGUI from './gui.js'


import { group } from './model.js'


const stats = new Stats();
document.body.appendChild(stats.domElement)

const scene = new THREE.Scene();


scene.add(group)


const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 8000)
camera.position.set(1.8, 1.8, 2.8)
// camera.lookAt(meshGroup.position)
// camera.lookAt(500, 0, 500);
scene.add(camera)


// 点光源
// const light = new THREE.PointLight(0xffffff, 1.0)
// light.position.set(-100, -100, -100);
// scene.add(light);


// const lightHelper = new THREE.PointLightHelper(light, 5)
// scene.add(lightHelper)

// const ambient = new THREE.AmbientLight(0xffffff, 0.4);
// scene.add(ambient);

// const direction = new THREE.DirectionalLight(0xffffff, 0.8);
// direction.position.set(50, 50, 50)
// scene.add(direction)
// scene.add(direction.target);

// const directionHelper = new THREE.DirectionalLightHelper(direction)
// scene.add(directionHelper)

const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);
renderer.render(scene, camera)
renderer.outputEncoding = THREE.sRGBEncoding
// console.log(renderer.outputEncoding);
document.body.appendChild(renderer.domElement)
// camera.lookAt(-0.04, 0.6, -0.13)

const control = new OrbitControls(camera, renderer.domElement)

// control.target.y = 2;

// control.target.set(0, 2, 0)
control.target.set(-0.04, 0.6, -0.13);
control.update()

// control.addEventListener('change', function () {
//   renderer.render(scene, camera)
// })

const clock = new THREE.Clock()
function render() {
  const delta = clock.getDelta() * 1000
  // console.log(delta)
  // rotateMesh.rotateY(0.01)
  // console.log(1000 / delta)
  // console.log(control.target)
  renderer.render(scene, camera)
  stats.update()
  window.requestAnimationFrame(render)

}

render()


window.onresize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;

  camera.updateProjectionMatrix()
}


// const gui = createGUI();
// // gui.close()
// gui.add(ambient, 'intensity').step(0.1).max(1).min(-1).onChange(value => {
//   console.log(value);
// })

// gui.add(direction.position, 'x').step(10).onChange(value => {
//   console.log(value);
// })
// gui.add(direction.position, 'y').step(10).onChange(value => {
//   console.log(value);
// })
// gui.add(direction.position, 'z').step(10).onChange(value => {
//   console.log(value);
// })



// const DirFolder = gui.addFolder('平行光')
// DirFolder.add(direction.target.position, 'z').step(10).onChange(value => {
//   directionHelper.update()
// })
// DirFolder.add(direction.target.position, 'x').name('平行光 target').step(10).onChange(value => {
//   directionHelper.update()
// })
// DirFolder.add(direction.target.position, 'y').step(10).onChange(value => {
//   directionHelper.update()
// })
// DirFolder.add(direction, 'intensity', 0, 1).step(0.1).onChange(value => {
//   console.log(value);
// })

// const meshFolder = gui.addFolder('材质')
// // meshFolder.add(material.wireframe, 'bool')
// const obj = {
//   color: 0x00ffff,
//   text: '123',
//   number: 123,
//   function: () => {
//     console.log('function')
//   },
//   array1: { test: 1 }
// }


// gui.add(obj, 'text').onChange(v => {
//   console.log(v)
// })
// gui.add(obj, 'number').onChange(v => {
//   console.log(v)
// })
// gui.add(obj, 'function').onChange(v => {
//   console.log(v)
// })
// gui.add(obj, 'array1').onChange(v => {
//   console.log(v)
// })

const cubeTexture = new THREE.CubeTextureLoader().setPath('./textures/cubeMaps/0/').load([
  'px.jpg',
  'nx.jpg',
  'py.jpg',
  'ny.jpg',
  'pz.jpg',
  'nz.jpg'
]);


scene.environment = cubeTexture
scene.background = cubeTexture