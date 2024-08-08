import * as THREE from 'three'



const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
  0, 0, 0,   // 0
  10, 0, 0,  // 1
  10, 10, 0, // 2
  0, 10, 0,  // 3
]);

// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);

const indexes = new Uint16Array([0, 1, 2, 2, 3, 0]);
geometry.index = new THREE.BufferAttribute(indexes, 1);


const normal = new Float32Array([
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
]);
geometry.setAttribute('normal', new THREE.BufferAttribute(normal, 3));
// const material = new THREE.PointsMaterial({ color: 0xff0000, size: 1 });
// const point = new THREE.Points(geometry, material);
// export default point;

// const material = new THREE.LineBasicMaterial({ color: 0x00ffff });
// const line = new THREE.Line(geometry, material)
// const line = new THREE.LineLoop(geometry, material)
// const line = new THREE.LineSegments(geometry, material)
// export default line;

// const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.FrontSide, wireframe: false })
const material = new THREE.MeshLambertMaterial({ color: 0xff0000, side: THREE.DoubleSide, wireframe: false })
const mesh = new THREE.Mesh(geometry, material);

// geometry.scale(2, 2, 1)
// geometry.translate(10, 10, 0)
// geometry.center()
// geometry.rotateY(Math.PI / 2)
mesh.scale.x = 2
mesh.scale.y = 2
// mesh.translateX(20)
// console.log(mesh.position);
// console.log(mesh.rotation);
const angle = new THREE.Euler(Math.PI / 4, 0, 0)
// console.log(angle);
// mesh.rotation.copy(angle);

// mesh.rotation.x = Math.PI / 4;

const dir = new THREE.Vector3(10, 10, 0);
// mesh.rotateOnAxis(dir.normalize(), Math.PI / 2)
// mesh.translateOnAxis(dir.normalize(), 10)
const mesh1 = mesh.clone();

mesh.translateX(30)
mesh1.material = mesh1.material.clone();
mesh1.material.color.set(0xffff00)
mesh.geometry.center()
mesh1.position.copy(mesh.position)
mesh1.position.setY(20)
export { mesh, mesh1 }

