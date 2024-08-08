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
lowGroup.name = 'low'
for (let i = 0; i <= highNumber; i++) {
  const geometry = new THREE.BoxGeometry(5, 10, 2);
  const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = '高楼-' + i;
  mesh.position.x = i * 8;
  highGroup.add(mesh)
  mesh.receiveShadow = true;
  mesh.castShadow = true;
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
  geometry.translate(5, 0, 0)
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  lowGroup.add(mesh)
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
// plane.translateY(5)
plane.rotateX(-Math.PI / 2)

group.add(plane);


const axes = new THREE.AxesHelper(50)
group.add(axes);

const boxHelper = new THREE.BoxHelper(group)
group.add(boxHelper)


const texture = new THREE.TextureLoader().load('./textures/snow.png');
const spriteMaterial = new THREE.SpriteMaterial({ map: texture })
// console.log(texture);
// const sprite = new THREE.Sprite(spriteMaterial);
// sprite.position.set(10, 10, 10)


const snowGroup = new THREE.Group();
snowGroup.name = 'snow'
// 随机200 200 盒子内
for (let i = 1; i <= 10000; i++) {
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.position.set(200 * Math.random() - 10, 200 * Math.random(), 200 * Math.random() - 100)
  snowGroup.add(sprite)
}
group.add(snowGroup)

export default group

