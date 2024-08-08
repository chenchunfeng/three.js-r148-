import * as THREE from 'three'


const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshLambertMaterial({ color: 0x0000ff })

const mesh = new THREE.Mesh(geometry, material);

mesh.material.opacity = 0;
mesh.material.transparent = true;

// const curve = new THREE.LineCurve(new THREE.Vector2(1, 1), new THREE.Vector2(20, 20))
// const curve = new THREE.ArcCurve(0, 0, 10, 0, Math.PI, true)
// const curve = new THREE.EllipseCurve(0, 0, 20, 5, 0, Math.PI, true)

const vertices = [
  new THREE.Vector2(10, 10),
  new THREE.Vector2(20, 2),
  new THREE.Vector2(30, 30)
]
console.log(vertices);
const curve = new THREE.QuadraticBezierCurve(vertices[0], vertices[1], vertices[2])
// const points = curve.getPoints(20);
const points = curve.getSpacedPoints(20);  // 等距离取点
console.log(points);
const pointGeometry = new THREE.BufferGeometry();
pointGeometry.setFromPoints(vertices);

const arcGeometry = new THREE.BufferGeometry();
arcGeometry.setFromPoints(points);
const point = new THREE.Points(pointGeometry, new THREE.PointsMaterial({ color: 0x00ff00, size: 0.5 }))
const line = new THREE.Line(arcGeometry, new THREE.PointsMaterial({ color: 0xff0000, size: 0.5 }))

export { mesh, point, line }

