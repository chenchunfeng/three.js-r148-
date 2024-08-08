import * as THREE from 'three'





// 使用shape


const w = 10; // 宽度
const h = 10; // 高度
// const shape = new THREE.Shape([
//   // 按照特定顺序，依次书写多边形顶点坐标
//   new THREE.Vector2(-w / 2, -h / 2), //多边形起点
//   new THREE.Vector2(-w / 2, h / 2),
//   new THREE.Vector2(w / 2, h / 2),
//   new THREE.Vector2(w / 2, -h / 2),
// ]);

const shape = new THREE.Shape();
// 也可以使用lineTo
shape.moveTo(-w / 2, -h / 2);
shape.lineTo(-w / 2, h / 2);
shape.lineTo(w / 2, h / 2);
shape.lineTo(w / 2, -h / 2);
console.log('currentPoint', shape.currentPoint);



const hole1 = new THREE.Shape()
hole1.arc(2, 2, 2)

const hole2 = new THREE.Shape()
hole2.moveTo(-2, -2);
hole2.lineTo(-4, -5);
hole2.lineTo(-5, -5);
hole2.lineTo(-5, -2);



shape.holes.push(hole1, hole2)

const point = new THREE.Group();








const line = new THREE.Group();




const mesh = new THREE.Group();
const shapeGeometry = new THREE.ShapeGeometry(shape)
const shapeMaterial = new THREE.MeshLambertMaterial({ color: 0x004444, side: THREE.DoubleSide })
mesh.add(new THREE.Mesh(shapeGeometry, shapeMaterial));

const shape1Geometry = new THREE.ShapeGeometry(hole1)
const shape1Material = new THREE.MeshLambertMaterial({ color: 0xff4444, side: THREE.DoubleSide })
// mesh.add(new THREE.Mesh(shape1Geometry, shape1Material));


const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-10, -30, -30),
  new THREE.Vector3(30, 0, 0),
  new THREE.Vector3(8, 30, 30),
  // new THREE.Vector3(-5, 0, 100)
]);
const points = curve.getPoints(20);
const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setFromPoints(points);
line.add(new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0xff0000 })))
console.log(curve);
const extrude = new THREE.ExtrudeGeometry(shape, {
  depth: 20,
  steps: 200,
  curveSegments: 200,
  // bevelSegments: 1,
  bevelEnabled: false,
  // extrudePath: curve
})

const extrudeMesh = new THREE.Mesh(extrude, shapeMaterial)
mesh.add(extrudeMesh);
const extrudeMesh2 = extrudeMesh.clone();
extrudeMesh2.material = extrudeMesh2.material.clone();
extrudeMesh2.material.wireframe = true;
extrudeMesh2.material.color.set(0xffffff);
mesh.add(extrudeMesh2);
export { mesh, point, line }