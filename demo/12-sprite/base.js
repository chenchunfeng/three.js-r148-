import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


import group from './model.js'





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
camera.position.set(0, 100, 0)





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
direction.castShadow = true;
direction.position.set(-50, 50, -50)
direction.shadow.mapSize.set(1024, 1024)
direction.shadow.radius = 3

console.log(direction.shadow)
// console.log(direction.target.position);
const shadowCamera = direction.shadow.camera;
shadowCamera.left = -50;
shadowCamera.right = 20;
shadowCamera.top = 50;
shadowCamera.bottom = -20;
shadowCamera.near = 20;
shadowCamera.far = 140;
const shadowHelper = new THREE.CameraHelper(shadowCamera);


scene.add(shadowHelper)
scene.add(direction)
scene.add(direction.target);




const directionHelper = new THREE.DirectionalLightHelper(direction)
scene.add(directionHelper)

const axes = new THREE.AxesHelper(50)
scene.add(axes)

const renderer = new THREE.WebGLRenderer();
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
  // const k = width / height
  // camera.left = -s * k;
  // camera.right = s * k

  camera.updateProjectionMatrix()
}


const gui = new GUI();
gui.add(ambient, 'intensity').step(0.1).max(1).min(-1).onChange(value => {
  console.log(value);
})


const DirFolder = gui.addFolder('平行光target')
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
const positionFolder = gui.addFolder('平行光position')

positionFolder.add(direction.position, 'x').step(1).onChange(value => {
  directionHelper.update()
})
positionFolder.add(direction.position, 'y').step(1).onChange(value => {
  directionHelper.update()
})
positionFolder.add(direction.position, 'z').step(1).onChange(value => {
  directionHelper.update()
})

const obj = {
  color: 0x00ffff,
  text: '123',
  number: 123,
  function: () => {
    console.log('function')
  },
  array1: { test: 1 }
}


const shadowFolder = gui.addFolder('平行光相机');
shadowFolder.add(shadowCamera, 'left', -100, 0).step(1).onChange(v => {
  shadowCamera.updateProjectionMatrix();
  shadowHelper.update()
})
shadowFolder.add(shadowCamera, 'right', 0, 100).step(1).onChange(v => {
  shadowCamera.updateProjectionMatrix();
  shadowHelper.update()
})
shadowFolder.add(shadowCamera, 'top', 0, 100).step(1).onChange(v => {
  shadowCamera.updateProjectionMatrix();
  shadowHelper.update()
})
shadowFolder.add(shadowCamera, 'bottom', -100, 0).step(1).onChange(v => {
  shadowCamera.updateProjectionMatrix();
  shadowHelper.update()
})
shadowFolder.add(shadowCamera, 'near', 0, 2).step(0.1).onChange(v => {
  shadowCamera.updateProjectionMatrix();
  shadowHelper.update()
})
shadowFolder.add(shadowCamera, 'far', 0, 200).step(1).onChange(v => {
  shadowCamera.updateProjectionMatrix();
  shadowHelper.update()
})

const spotLight = new THREE.SpotLight(0xffffff, 5)

spotLight.position.set(0, 50, 0)
spotLight.angle = Math.PI / 10
spotLight.castShadow = true;
const spotLightHelper = new THREE.SpotLightHelper(spotLight)
console.log(spotLight.shadow);
scene.add(spotLight)
scene.add(spotLightHelper)

const loader = new THREE.TextureLoader().setPath('./textures/');
const filenames = ['disturb.jpg', 'colors.png', 'uv_grid_opengl.jpg'];

const textures = { none: null };

for (let i = 0; i < filenames.length; i++) {

  const filename = filenames[i];

  const texture = loader.load(filename);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.encoding = THREE.sRGBEncoding;

  textures[filename] = texture;

}

const spotFolder = gui.addFolder('聚光灯位置');
spotFolder.add(spotLight.position, 'x', -10, 10).step(1).onChange(v => {
  spotLightHelper.update()
})
spotFolder.add(spotLight.position, 'y', -10, 10).step(1).onChange(v => {
  spotLightHelper.update()
})
spotFolder.add(spotLight.position, 'z', -10, 10).step(1).onChange(v => {
  spotLightHelper.update()
})
spotFolder.add(spotLight, 'angle', 0, Math.PI / 2).step(0.01).onChange(v => {
  spotLightHelper.update()
})

const params = {
  map: null,
};

spotFolder.add(params, 'map', textures).onChange(function (val) {
  spotLight.map = val;
});

function render() {
  const delta = clock.getDelta()
  // console.log(camera.position);
  control.update()
  renderer.render(scene, camera)
  stats.update()
  window.requestAnimationFrame(render)
  const time = performance.now() / 3000;
  // console.log(time, Math.cos(time));

  spotLight.position.x = Math.cos(time) * 10;
  spotLight.position.z = Math.sin(time) * 10;

  spotLightHelper.update();

}

render()