import * as THREE from 'three'

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

const loader = new GLTFLoader();


const group = new THREE.Group();
group.name = 'total'

const highNumber = 6;
const lowNumber = 5;
const highGroup = new THREE.Group();
highGroup.name = 'high'

const lowGroup = new THREE.Group();
lowGroup.name = 'low';

let duck;

await new Promise(resolve => {
  loader.load('../model/鸭子/glTF/Duck.gltf', (gltf) => {
    console.log(gltf.scene);
    duck = gltf.scene;
    resolve()
  })
})

for (let i = 0; i <= highNumber; i++) {
  const geometry = new THREE.BoxGeometry(5, 10, 2);
  const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = '高楼-' + i;
  mesh.position.x = i * 8;
  const subDuck = duck.clone();
  setParentObject(subDuck, mesh)
  subDuck.name = 'duck-' + i
  subDuck.position.z = 2
  subDuck.position.x = -4
  mesh.add(subDuck)
  highGroup.add(mesh)
  mesh.receiveShadow = true;
  mesh.castShadow = true;


  // const axes = new THREE.AxesHelper(10)
  // mesh.add(axes)
}

highGroup.position.y = 5
highGroup.position.x = 10

for (let i = 0; i <= lowNumber; i++) {
  const geometry = new THREE.BoxGeometry(5, 5, 2);
  const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = '低楼-' + i;
  // mesh.position.z = 15;
  mesh.position.x = i * 8;
  // geometry.translate(5, 0, 0)
  mesh.receiveShadow = true;
  mesh.castShadow = true;

  lowGroup.add(mesh);

  const helper = new THREE.BoxHelper(mesh)
  lowGroup.add(helper)
}

lowGroup.position.y = 2.5
lowGroup.position.x = 10
lowGroup.position.z = 10

// lowGroup.translateX(2.5)
group.add(highGroup);
group.add(lowGroup);


// 再添加一个平面做为地面
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshLambertMaterial({ color: 0x333333, side: THREE.DoubleSide });
// const material = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, material)
plane.receiveShadow = true;
plane.translateX(25)
plane.translateY(-0.1)
// plane.translateY(5)
plane.rotateX(-Math.PI / 2)
// const axes = new THREE.AxesHelper(5)
// plane.add(axes)


group.add(plane);

function setParentObject(sub, father) {
  sub.traverse(item => {
    if (item.isMesh) {
      item.father = father
    }
  })
}

// const axes = new THREE.AxesHelper(10)
// group.add(axes)

const geometry = new THREE.ConeGeometry(25, 80);
const mesh = new THREE.Mesh(geometry, material);
mesh.name = '锥仔'
mesh.translateX(-50)
group.add(mesh)
export default group

