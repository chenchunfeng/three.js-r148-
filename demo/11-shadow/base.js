import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';


import group from './model.js'





const scene = new THREE.Scene();


scene.add(group)


const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(60, width / height, 50, 8000)
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
camera.position.set(4, 28, 95)





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
direction.position.set(-50, 50, -50)





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

const box = new THREE.Box3().setFromObject(group);
console.log(box);
const size = new THREE.Vector3()
const center = new THREE.Vector3()

box.getSize(size);
box.getCenter(center)
console.log(size);
console.log(center);

control.target.set(center.x, center.y, center.z)
axes.position.set(center.x, center.y, center.z)
control.update()




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





const clock = new THREE.Clock();
const snow = group.getObjectByName('snow');
console.log(snow);
function render() {
  const delta = clock.getDelta()
  // console.log(delta);
  control.update()
  renderer.render(scene, camera)
  stats.update()
  window.requestAnimationFrame(render)

  snow.traverse(item => {
    if (item.isSprite) {
      if (item.position.y > 0) {
        item.position.y -= delta * 10
      } else {
        item.position.y = 200
      }

    }
  })


}

render()