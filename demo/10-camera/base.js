import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


import group from './model.js'
import { setBoundingBox } from './utils.js'




const scene = new THREE.Scene();


scene.add(group)


const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 8000)
// camera.position.set(10, 30, 50)
// camera.lookAt(meshGroup.position)
// camera.lookAt(500, 0, 500);

// 更换正投影相机，一般用于地图展示，没有远小近大效果
// 参数分别是 left right top bottom near far
// const k = width / height // 宽高比
// const s = 20;  // 可以理解为盒子的宽
// const left = -s * k;
// const right = s * k;
// const top = s;
// const bottom = -s
// const camera = new THREE.OrthographicCamera(left, right, top, bottom, 0.1, 8000)
// camera.position.set(0, 100, 0)


const box = new THREE.Box3();
box.expandByObject(group);
console.log(box);
const size = new THREE.Vector3()
const center = new THREE.Vector3()
box.getSize(size);
box.getCenter(center)
console.log('size', size);
console.log(center);
const edge = setBoundingBox(group)
group.add(edge)

camera.position.set(center.x, center.y + 100, center.z)
// scene.add(edge)

// camera.lookAt(center.x, center.y, center.z);

scene.add(camera)


// 点光源
// const light = new THREE.PointLight(0xffffff, 1.0)
// light.position.set(-100, -100, -100);
// scene.add(light);


// const lightHelper = new THREE.PointLightHelper(light, 5)
// scene.add(lightHelper)

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

const direction = new THREE.DirectionalLight(0xffffff, 0.8);
direction.position.set(100, 50, 0)
scene.add(direction)
scene.add(direction.target);

const directionHelper = new THREE.DirectionalLightHelper(direction)
scene.add(directionHelper)

const axes = new THREE.AxesHelper(50)
scene.add(axes)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.render(scene, camera)

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
const rotateMesh = group.getObjectByName('低楼-0')


control.target.set(center.x, center.y, center.z);
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(center.x, center.y, center.z)
const axesHelper = new THREE.AxesHelper(10)
mesh.add(axesHelper)
scene.add(mesh);

const clock = new THREE.Clock();
let angle = 0;
const radius = 50;
let rotateFlag = false;
let tubeFlag = false;


const tube = group.getObjectByName('tube');
const tubePoints = tube.geometry.parameters.path.getSpacedPoints(100);
let tubeIndex = 0;
// console.log('tubePoints', tubePoints);

let accumulatedTime = 0;

function render() {
  const delta = clock.getDelta()
  // console.log(delta)
  // rotateMesh.rotateY(0.01)
  // console.log(1000 / delta)



  // console.log(camera.position);

  // 相机动画


  if (rotateFlag) {
    angle += 0.01;
    camera.position.set(center.x + radius * Math.cos(angle), center.y + 100, center.z + radius * Math.sin(angle));
  }
  accumulatedTime += delta;
  if (accumulatedTime >= 0.16 && tubeFlag && tubeIndex < tubePoints.length - 1) {

    camera.position.set(tubePoints[tubeIndex].x, tubePoints[tubeIndex].y, tubePoints[tubeIndex].z);
    control.target.set(tubePoints[tubeIndex + 1].x, tubePoints[tubeIndex + 1].y, tubePoints[tubeIndex + 1].z);
    tubeIndex++;
    accumulatedTime = 0
  }

  // control.target.set(center.x, center.y, center.z);

  // camera.lookAt(center.x, center.y, center.z);
  // camera.lookAt(0, 0, 0);
  control.update()


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
  // const k = width / height
  // camera.left = -s * k;
  // camera.right = s * k

  camera.updateProjectionMatrix()
}


const gui = new GUI();
gui.close()
gui.add(ambient, 'intensity').step(0.1).max(1).min(-1).onChange(value => {
  console.log(value);
})

gui.add(direction.position, 'x').step(10).onChange(value => {
  console.log(value);
})
gui.add(direction.position, 'y').step(10).onChange(value => {
  console.log(value);
})
gui.add(direction.position, 'z').step(10).onChange(value => {
  console.log(value);
})



const DirFolder = gui.addFolder('平行光')
DirFolder.add(direction.target.position, 'z').step(10).onChange(value => {
  directionHelper.update()
})
DirFolder.add(direction.target.position, 'x').name('平行光 target').step(10).onChange(value => {
  directionHelper.update()
})
DirFolder.add(direction.target.position, 'y').step(10).onChange(value => {
  directionHelper.update()
})
DirFolder.add(direction, 'intensity', 0, 1).step(0.1).onChange(value => {
  console.log(value);
})

const meshFolder = gui.addFolder('材质')
// meshFolder.add(material.wireframe, 'bool')
const obj = {
  color: 0x00ffff,
  text: '123',
  number: 123,
  function: () => {
    console.log('function')
  },
  array1: { test: 1 }
}


gui.add(obj, 'text').onChange(v => {
  console.log(v)
})
gui.add(obj, 'number').onChange(v => {
  console.log(v)
})
gui.add(obj, 'function').onChange(v => {
  console.log(v)
})
// gui.add(obj, 'array1').onChange(v => {
//   console.log(v)
// })

document.getElementById('rotate-on').addEventListener('click', () => {
  rotateFlag = true;
})
document.getElementById('rotate-off').addEventListener('click', () => {
  rotateFlag = false;
})
document.getElementById('x').addEventListener('click', () => {
  rotateFlag = false;
  camera.position.set(center.x + 100, center.y, center.z);
  control.update()

})
document.getElementById('y').addEventListener('click', () => {
  rotateFlag = false;
  camera.position.set(center.x, center.y + 100, center.z);
  control.update()
})
document.getElementById('z').addEventListener('click', () => {
  rotateFlag = false;
  camera.position.set(center.x, center.y, center.z + 100);
  control.update()
})
document.getElementById('tube').addEventListener('click', () => {
  rotateFlag = false;
  tubeFlag = true;
  tubeIndex = 0;
  control.update()
})

control.maxDistance = 185;
// control.minDistance = 10;
control.enablePan = false;

// control.maxPolarAngle = Math.PI / 2;//默认值Math.PI
control.addEventListener('change', () => {
  console.log(control.getDistance());
})