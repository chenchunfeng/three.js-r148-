import * as THREE from 'three'


const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({ color: 0x0000ff })

const mesh = new THREE.Mesh(geometry, material);

mesh.material.opacity = 0;
mesh.material.transparent = true;

// const curve = new THREE.Curve()
// console.log(curve)
const arcGeometry = new THREE.BufferGeometry();
let arr = [];
// xoy平面上画圆
const radius = 10;
const num = 5;
const position = { x: 10, y: 10 }


for (let i = 0; i < num + 1; i++) {
  const angle = 2 * Math.PI / num * i;
  // const angle = Math.PI / num * i; // 半圆
  arr.push(radius * Math.cos(angle) + position.x, radius * Math.sin(angle) + position.y, 0);
}
console.log(arr.length);
const pointArray = new Float32Array(arr);

const vertices = new THREE.BufferAttribute(pointArray, 3);
arcGeometry.setAttribute('position', vertices);
// const point = new THREE.Points(arcGeometry, new THREE.PointsMaterial({ color: 0xff0000, size: 0.5 }))
// const point = new THREE.Line(arcGeometry, new THREE.LineBasicMaterial({ color: 0xff0000 }))
const point = new THREE.LineLoop(arcGeometry, new THREE.LineBasicMaterial({ color: 0xff0000 }))
// const point = new THREE.LineSegments(arcGeometry, new THREE.LineBasicMaterial({ color: 0xff0000 }))

export { mesh, point }

