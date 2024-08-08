import * as THREE from 'three'





// 使用curvePath 拼接曲线

// 如地图平面上面的飞线

// const curve = new THREE.LineCurve(new THREE.Vector2(1, 1), new THREE.Vector2(20, 20))
// const curve = new THREE.ArcCurve(0, 0, 10, 0, Math.PI, true)
// const curve = new THREE.EllipseCurve(0, 0, 20, 5, 0, Math.PI, true)

const point1 = [
  new THREE.Vector3(-10, 0, 10),
  new THREE.Vector3(10, 0, -30)
]
const point2 = [
  new THREE.Vector3(10, 0, 10),
  new THREE.Vector3(30, 0, -30)
]

const point3 = [
  new THREE.Vector3(10, 0, -30),
  new THREE.Vector3(20, 10, -30),
  new THREE.Vector3(30, 0, -30)
]

const curve1 = new THREE.CatmullRomCurve3(point1)
const curve2 = new THREE.CatmullRomCurve3(point2)
const curve3 = new THREE.CatmullRomCurve3(point3)

const lineGeometry1 = new THREE.BufferGeometry();
const points1 = curve1.getPoints(2)
lineGeometry1.setFromPoints(points1);

const lineGeometry2 = new THREE.BufferGeometry();
const points2 = curve2.getPoints(2)
lineGeometry2.setFromPoints(points2);

const lineGeometry3 = new THREE.BufferGeometry();
const points3 = curve3.getPoints(30)
lineGeometry3.setFromPoints(points3);

const line = new THREE.Group();
const line1 = new THREE.Line(lineGeometry1, new THREE.PointsMaterial({ color: 0xff0000, size: 0.5 }))
const line2 = new THREE.Line(lineGeometry2, new THREE.PointsMaterial({ color: 0x00ff00, size: 0.5 }))
const line3 = new THREE.Line(lineGeometry3, new THREE.PointsMaterial({ color: 0x0000ff, size: 0.5 }))
line.add(line1)
line.add(line2)
line.add(line3)




const point = new THREE.Group();

point.add(new THREE.Points(lineGeometry1, new THREE.PointsMaterial({ color: 0xff00ff, size: 0.5 })))
point.add(new THREE.Points(lineGeometry2, new THREE.PointsMaterial({ color: 0xff00ff, size: 0.5 })))
point.add(new THREE.Points(lineGeometry3, new THREE.PointsMaterial({ color: 0xff00ff, size: 0.5 })))


const curvePath = new THREE.CurvePath();
curvePath.add(curve1)
curvePath.add(curve3);
curvePath.add(curve2)

const lineGeometry4 = new THREE.BufferGeometry();
const points4 = curvePath.getPoints(30)
lineGeometry4.setFromPoints(points4);
const line4 = new THREE.Line(lineGeometry4, new THREE.PointsMaterial({ color: 0xfffff, size: 0.5 }))
line4.translateX(30);
line.add(line4);

const geometry = new THREE.TubeGeometry(curvePath, 20, 1, 20);
const material = new THREE.MeshLambertMaterial({ color: 0x0000ff, side: THREE.DoubleSide })

const mesh = new THREE.Mesh(geometry, material);
export { mesh, point, line }