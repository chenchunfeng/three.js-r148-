import * as THREE from 'three'


// 已知两个点，使用样条或者bezier曲线画 

// 如地图平面上面的飞线
const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({ color: 0x0000ff })

const mesh = new THREE.Mesh(geometry, material);

mesh.material.opacity = 0;
mesh.material.transparent = true;

// const curve = new THREE.LineCurve(new THREE.Vector2(1, 1), new THREE.Vector2(20, 20))
// const curve = new THREE.ArcCurve(0, 0, 10, 0, Math.PI, true)
// const curve = new THREE.EllipseCurve(0, 0, 20, 5, 0, Math.PI, true)

const vertices = [
  new THREE.Vector3(-10, 0, 10),
  new THREE.Vector3(10, 0, -30)
]

const center = new THREE.Vector3((vertices[0].x + vertices[1].x) / 2, 10, (vertices[0].z + vertices[1].z) / 2)

console.log(vertices[0].z);
console.log(vertices[1]);
const curve = new THREE.QuadraticBezierCurve3(vertices[0], center, vertices[1])
// const points = curve.getPoints(20);
const points = curve.getSpacedPoints(30);  // 等距离取点
console.log(points);
const pointGeometry = new THREE.BufferGeometry();
vertices.push(center)
pointGeometry.setFromPoints(vertices);

const arcGeometry = new THREE.BufferGeometry();
arcGeometry.setFromPoints(points);
const point = new THREE.Points(pointGeometry, new THREE.PointsMaterial({ color: 0x00ff00, size: 0.5 }))
const line = new THREE.Line(arcGeometry, new THREE.PointsMaterial({ color: 0xff0000, size: 0.5 }))

export { mesh, point, line }

