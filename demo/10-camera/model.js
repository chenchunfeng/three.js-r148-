import * as THREE from 'three'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader();


const group = new THREE.Group();
group.name = 'total'

const highNumber = 6;
const lowNumber = 5;
const highGroup = new THREE.Group();
highGroup.name = 'high'
const highHelper = new THREE.AxesHelper(10);
// highGroup.add(highHelper)

const lowGroup = new THREE.Group();
lowGroup.name = 'low'
// const lowHelper = new THREE.AxesHelper(10);
// lowGroup.add(lowHelper)

for (let i = 0; i <= highNumber; i++) {
  const geometry = new THREE.BoxGeometry(5, 10, 2);
  const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = '高楼-' + i;
  mesh.position.x = i * 8;
  highGroup.add(mesh)
}

highGroup.position.y = 10
highGroup.position.x = 10

for (let i = 0; i <= lowNumber; i++) {
  const geometry = new THREE.BoxGeometry(5, 5, 2);
  const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = '低楼-' + i;
  // mesh.position.z = 15;
  mesh.position.x = i * 8;
  geometry.translate(5, 0, 0)
  // mesh.translateY(2.5)
  // mesh.translateZ(2.5)
  lowGroup.add(mesh)

  // const lowHelper = new THREE.AxesHelper(10);
  // mesh.add(lowHelper)
}

lowGroup.position.y = 10
lowGroup.position.x = 10
lowGroup.position.z = 20

// lowGroup.translateX(2.5)
group.add(highGroup);



const texture = new THREE.TextureLoader().load('./model/mobile/黑色.png')
texture.flipY = false;
loader.load('../model/鸭子/glTF/Duck.gltf', function (gltf) {

  const mobile = gltf.scene.children[0];
  group.add(mobile)

})



// 管道模型
const v0 = new THREE.Vector3(0, 0, 10);
const v1 = new THREE.Vector3(10, 50, 30);
const v2 = new THREE.Vector3(60, 0, 40);
const curve = new THREE.QuadraticBezierCurve3(v0, v1, v2);
const points = curve.getPoints(100);

// console.log(points);
// const geometry = new THREE.BufferGeometry();
// geometry.setFromPoints(points)

const tube = new THREE.TubeGeometry(curve, 100, 1, 16);
const tubeTexture = new THREE.TextureLoader().load('../images/staff_1024.jpg');
tubeTexture.wrapS = THREE.RepeatWrapping;
tubeTexture.wrapT = THREE.RepeatWrapping;
tubeTexture.repeat.x = 30;
tubeTexture.repeat.y = 2;
const material = new THREE.MeshLambertMaterial({ color: 0xff0044, side: THREE.DoubleSide, map: tubeTexture });
const tubeMesh = new THREE.Mesh(tube, material)
tubeMesh.name = 'tube'
group.add(tubeMesh)


export default group

