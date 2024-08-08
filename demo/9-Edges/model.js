import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'





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
hole2.moveTo(-1, -1);
hole2.lineTo(-4, -1);
hole2.lineTo(-4, -4);
hole2.lineTo(-1, -4);



shape.holes.push(hole1, hole2)

const point = new THREE.Group();








const line = new THREE.Group();




const mesh = new THREE.Group();
const shapeGeometry = new THREE.ShapeGeometry(shape)
const shapeMaterial = new THREE.MeshLambertMaterial({ color: 0x004444, side: THREE.DoubleSide, transparent: true, opacity: 0.5 })
// mesh.add(new THREE.Mesh(shapeGeometry, shapeMaterial));

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
const count = lineGeometry.attributes.position.count;
const colors = [];
const heightArray = []
for (let i = 0; i < count; i++) {
  const y = lineGeometry.attributes.position.getY(i);
  heightArray.push(y);
  // colors.push(1, 0, 0);
  // lineGeometry.attributes.position.setY(i, y + 5)
}
heightArray.sort((a, b) => a - b);
const minHeight = heightArray[0]
const maxHeight = heightArray[heightArray.length - 1];
const height = maxHeight - minHeight;


const c1 = new THREE.Color(0xff0000); //红色
const c2 = new THREE.Color(0x0000ff); //蓝色
const c3 = new THREE.Color(0xffffff); //白色

for (let i = 0; i < count; i++) {
  const y = lineGeometry.attributes.position.getY(i);
  const percent = (y - minHeight) / height;
  // const percent = i / count;
  const c = new THREE.Color();
  if (percent <= 0.5) {
    c.lerpColors(c1, c2, percent * 2)
  } else {
    c.lerpColors(c2, c3, (percent - 0.5) * 2)
  }
  colors.push(c.r, c.g, c.b);
}

lineGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
line.add(new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ vertexColors: true })))
console.log(colors);
const extrude = new THREE.ExtrudeGeometry(shape, {
  depth: 20,
  steps: 20,
  curveSegments: 5,
  // bevelSegments: 1,
  bevelEnabled: false,
  // extrudePath: curve
})

const extrudeMesh = new THREE.Mesh(extrude, shapeMaterial)
mesh.add(extrudeMesh);
// const extrudeMesh2 = extrudeMesh.clone();
// extrudeMesh2.material = extrudeMesh2.material.clone();
// extrudeMesh2.material.wireframe = true;
// extrudeMesh2.material.color.set(0xffffff);
// mesh.add(extrudeMesh2);
const edge = new THREE.EdgesGeometry(extrude, 1)
const edgeLine = new THREE.LineSegments(edge, new THREE.LineBasicMaterial({ color: 0xffffff }));
mesh.add(edgeLine);

new GLTFLoader().load('./assets/岩石山.glb', (gltf) => {
  gltf.scene.translateY(6)
  const model = addGradientToModel(gltf.scene)
  mesh.add(model)
})


function addGradientToModel(model) {
  console.log(model)

  const mesh = model.children[0];

  const pos = mesh.geometry.attributes.position
  const count = pos.count;

  const colors = [];
  const heightArray = []
  for (let i = 0; i < count; i++) {
    const y = pos.getY(i);
    heightArray.push(y);
  }

  heightArray.sort((a, b) => a - b);
  const minHeight = heightArray[0]
  const maxHeight = heightArray[heightArray.length - 1];
  const height = maxHeight - minHeight;



  const c1 = new THREE.Color(0x0000ff);
  const c2 = new THREE.Color(0x00ff00);
  const c3 = new THREE.Color(0xff0000);

  for (let i = 0; i < count; i++) {
    const y = pos.getY(i);
    const percent = (y - minHeight) / height;
    const c = new THREE.Color();
    if (percent <= 0.5) {
      c.lerpColors(c1, c2, percent * 2)
    } else {
      c.lerpColors(c2, c3, (percent - 0.5) * 2)
    }
    colors.push(c.r, c.g, c.b);
  }
  mesh.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
  // mesh.material.vertexColors = true;
  mesh.material = new THREE.MeshLambertMaterial({
    vertexColors: true,
  });

  return model;
}
export { mesh, point, line }
