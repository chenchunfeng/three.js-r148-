import * as THREE from 'three'





// 使用latheGeometry 旋转成型


// 1.先定义一些点，曲线 直线的点都可以  绕y轴旋转

const point1 = [
  new THREE.Vector3(10, 5, 0),
  new THREE.Vector3(0, 10, 0),
  new THREE.Vector3(2, 20, 0)
]

const curve = new THREE.EllipseCurve(
  10,
  10,
  10,
  20,
  0,
  Math.PI / 2
);
// const curve = new THREE.ArcCurve(
//   10,
//   10,
//   10,
//   // -Math.PI / 4,
//   // Math.PI / 4
// );
// const points2 = curve.getPoints(5);
const points2 = curve.getSpacedPoints(50);

const point = new THREE.Group();

const pointGeometry = new THREE.BufferGeometry();
pointGeometry.setFromPoints(points2);
point.add(new THREE.Points(pointGeometry, new THREE.PointsMaterial({ color: 0xff0000, side: 0.1 })))






const line = new THREE.Group();




const mesh = new THREE.Group();

const lathe = new THREE.LatheGeometry(points2, 32);
const latheMaterial = new THREE.MeshLambertMaterial({ color: 0x004444, side: THREE.DoubleSide, wireframe: false })
mesh.add(new THREE.Mesh(lathe, latheMaterial))
export { mesh, point, line }