import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader();
const group = new THREE.Group();

const texture = new THREE.TextureLoader().load('./model/mobile/黑色.png')
texture.flipY = false;
loader.load('./model/mobile/手机模型.glb', function (gltf) {
  // loader.load('./model/鸭子/glTF/Duck.gltf', function (gltf) {
  // loader.load('./model/圆柱.glb', function (gltf) {
  // loader.load('./model/圆柱.gltf', function (gltf) {
  console.log(gltf.scene);
  const mobile = gltf.scene.children[0];
  group.add(mobile)

  // const mobile2 = mobile.clone();
  // mobile2.material = mobile2.material.clone()
  // mobile2.material.map = texture
  // mobile2.translateX(100)
  // group.add(mobile2)

  // group.traverse(item => {
  //   if (item.isMesh) console.log(item.name, item)
  // })
  // console.log(gltf.scene.children[0].material.map.flipY);
})




const geometry = new THREE.SphereGeometry(0.05)
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 })

const sphere = new THREE.Mesh(geometry, material)
sphere.position.set(-0.04, 0.6, -0.13)

export { group, sphere }

