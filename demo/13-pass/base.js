import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


import group from './model.js'



// 通道相关
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';




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

scene.add(direction)
scene.add(direction.target);




const directionHelper = new THREE.DirectionalLightHelper(direction)
scene.add(directionHelper)

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






const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const size = new THREE.Vector2();
renderer.getSize(size)
console.log(size);
const outlinePass = new OutlinePass(size, scene, camera);
outlinePass.selectedObjects = [];
//模型描边颜色，默认白色         
// outlinePass.visibleEdgeColor.set(0xffff00);
//高亮发光描边厚度
console.log(outlinePass.edgeThickness);
outlinePass.edgeThickness = 4;
outlinePass.edgeStrength = 6;
outlinePass.pulsePeriod = 2;

composer.addPass(renderPass)
composer.addPass(outlinePass)


document.getElementById('low').addEventListener('click', () => {
  const mesh = group.getObjectByName('low');
  outlinePass.selectedObjects = [mesh];
  outlinePass.visibleEdgeColor.set(0xff0000);
})
document.getElementById('high').addEventListener('click', () => {
  const mesh = group.getObjectByName('high');
  outlinePass.selectedObjects = [mesh];

  outlinePass.visibleEdgeColor.set(0xffff00);
  // debugger
})

// 处理后期处理锯齿
const pixelRatio = window.devicePixelRatio;
// console.log(size.x, width, pixelRatio);
const smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio);
composer.addPass(smaaPass)



function render() {
  const delta = clock.getDelta()
  // console.log(camera.position);
  control.update()
  // renderer.render(scene, camera)
  composer.render()
  stats.update()
  window.requestAnimationFrame(render)

}


const outlineFolder = gui.addFolder('边缘发光');
outlineFolder.addColor(outlinePass, 'visibleEdgeColor')
outlineFolder.add(outlinePass, 'edgeThickness', 0, 10);
outlineFolder.add(outlinePass, 'edgeStrength', 0, 10);
outlineFolder.add(outlinePass, 'pulsePeriod', 0, 10);


const bloomPass = new UnrealBloomPass();
composer.addPass(bloomPass)


const glitchPass = new GlitchPass();
// 设置glitchPass通道
composer.addPass(glitchPass);

render()