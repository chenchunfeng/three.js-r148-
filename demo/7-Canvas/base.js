import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import createGUI from './gui.js'


import { mesh, group } from './model.js'




const scene = new THREE.Scene();


scene.add(mesh)
scene.add(group)


const width = window.innerWidth - 200;
const height = window.innerHeight - 60;
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 8000)
camera.position.set(-14, 17, 36)
scene.add(camera)



const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
  logarithmicDepthBuffer: true,
  preserveDrawingBuffer: true
});
renderer.setSize(width, height);
renderer.render(scene, camera);
renderer.outputEncoding = THREE.sRGBEncoding

const node = document.getElementById('webgl')
node.appendChild(renderer.domElement)


const control = new OrbitControls(camera, renderer.domElement)
control.update()

// control.addEventListener('change', function () {
//   renderer.render(scene, camera)
// })

function render() {
  renderer.render(scene, camera)
  control.update()
  window.requestAnimationFrame(render)

  // console.log(camera.position)

}

render()


window.onresize = () => {
  const width = window.innerWidth - 200;
  const height = window.innerHeight - 60;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix()
}


// 添加灯光
const light = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(light)

const directLight = new THREE.DirectionalLight(0xffffff, 0.8);
directLight.position.set(15, 15, 15);

const targetObject = new THREE.Object3D();
targetObject.position.set(0, 8, 0);
directLight.target = targetObject;

const dirctHelper = new THREE.DirectionalLightHelper(directLight)


scene.add(directLight)
scene.add(targetObject)
scene.add(dirctHelper)



const gui = createGUI();

gui.add(targetObject.position, 'y', 0, 20).name('平行光x').onChange(() => {
  dirctHelper.update()
})

document.getElementById('red').addEventListener('click', function () {
  mesh.material.color.set(0xff0000);
})
document.getElementById('green').addEventListener('click', function () {
  mesh.material.color.set(0x00ff00);
})
document.getElementById('blue').addEventListener('click', function () {
  mesh.material.color.set(0x0000ff);
})
document.getElementById('download').addEventListener('click', function () {
  saveImage()
})

function saveImage() {
  const link = document.createElement('a');
  const canvas = renderer.domElement;
  link.href = canvas.toDataURL('image/png');
  link.download = 'threejs.png'
  link.click();

}