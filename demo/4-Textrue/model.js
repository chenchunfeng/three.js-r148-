import * as THREE from 'three'

// const geometry = new THREE.PlaneGeometry(100, 50);
// const geometry = new THREE.BoxGeometry(50, 50, 50);
// const geometry = new THREE.SphereGeometry(50, 2000, 2000);
// const geometry = new THREE.CircleGeometry(50, 500);

const vertices = new Float32Array([
  0, 0, 0, // 0
  200, 0, 0, // 1
  200, 100, 0, // 2
  0, 100, 0, // 3
])
// const vertices = new Float32Array([
//   0, 0, 0, // 0
//   50, 0, 0, // 1
//   50, 50, 0, // 2
//   50, 50, 0,
//   0, 50, 0, // 3
//   0, 0, 0,
// ])

const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

const indexes = new Uint16Array([
  0, 1, 2, 0, 2, 3
])

geometry.index = new THREE.BufferAttribute(indexes, 1)

const normal = new Uint8Array([
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
])

geometry.attributes.normal = new THREE.BufferAttribute(normal, 3);


const uv = new Float32Array([
  0.25, 0.25,
  0.75, 0.25,
  0.75, 0.75,
  0.25, 0.75
])
// const uv = new Float32Array([
//   0, 0,
//   1, 0,
//   1, 1,
//   1, 1,
//   0, 1,
//   0, 0
// ])
geometry.attributes.uv = new THREE.BufferAttribute(uv, 2);
const texture = new THREE.TextureLoader().load('./images/earth_atmos_2048.jpg');
console.log(texture);
const material = new THREE.MeshLambertMaterial({
  // color: 0x0000ff,
  map: texture,
  // wireframe: true
});

const mesh = new THREE.Mesh(geometry, material);

const circleMaterial = material.clone();
circleMaterial.map = new THREE.TextureLoader().load('./images/ca.jpeg');
const circle = new THREE.Mesh(new THREE.CircleGeometry(50), circleMaterial);
circle.position.x = -50;
circle.visible = false

const planeMaterial = material.clone();
const planeMap = new THREE.TextureLoader().load('./images/pic.jpg');

planeMap.wrapS = THREE.RepeatWrapping;
planeMap.wrapT = THREE.RepeatWrapping;

planeMap.repeat.x = 2;
// planeMap.repeat.y = 2;
console.log(planeMap.repeat)
planeMaterial.map = planeMap;
const plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 50), planeMaterial);
plane.position.x = -50;

const iconMaterial = material.clone();
const iconMap = new THREE.TextureLoader().load('./images/z1.png');

iconMap.wrapS = THREE.RepeatWrapping;
// iconMap.repeat.x = 2;

iconMap.offset.x = 0.5

iconMaterial.map = iconMap;
iconMaterial.transparent = true
iconMaterial.side = THREE.DoubleSide
const icon = new THREE.Mesh(new THREE.PlaneGeometry(200, 10), iconMaterial);
icon.position.x = -100;
icon.position.y = 50;



export { mesh, circle, plane, icon }

