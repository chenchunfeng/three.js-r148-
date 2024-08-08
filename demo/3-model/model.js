import * as THREE from 'three'


const group = new THREE.Group();
group.name = 'total'

const highNumber = 6;
const lowNumber = 5;
const highGroup = new THREE.Group();
highGroup.name = 'high'
const highHelper = new THREE.AxesHelper(10);
highGroup.add(highHelper)

const lowGroup = new THREE.Group();
lowGroup.name = 'low'
// const lowHelper = new THREE.AxesHelper(10);
// lowGroup.add(lowHelper)

for (let i = 0; i <= highNumber; i++) {
  const geometry = new THREE.BoxGeometry(5, 10, 2);
  const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = '高楼-' + i;
  mesh.position.x = i * 8;
  highGroup.add(mesh)
}

highGroup.position.y = 10
highGroup.position.x = 10

for (let i = 0; i <= lowNumber; i++) {
  const geometry = new THREE.BoxGeometry(5, 5, 2);
  const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = '低楼-' + i;
  // mesh.position.z = 15;
  mesh.position.x = i * 8;
  geometry.translate(5, 0, 0)
  // mesh.translateY(2.5)
  // mesh.translateZ(2.5)
  lowGroup.add(mesh)

  const lowHelper = new THREE.AxesHelper(10);
  mesh.add(lowHelper)
}

lowGroup.position.y = 10
lowGroup.position.x = 10
lowGroup.position.z = 20

// lowGroup.translateX(2.5)
group.add(highGroup);
group.add(lowGroup);

const v = new THREE.Vector3();
lowGroup.getWorldPosition(v);
console.log('v', v);

// console.log(group)
group.traverse(item => {
  // console.log(item.name, item)
  if (item.type === "Mesh") {
    // console.log('mesh', item.name)
  }
  if (item.isMesh) {
    // console.log('isMesh', item.name)
    item.material.color.set('rgba(255, 255, 255, 0.5)')
  }
})

const test = group.getObjectByName('低楼-0')
test.material.color.set(0xff00ff);

// lowGroup.remove(test)
// test.removeFromParent();
console.log(test);
lowGroup.visible = false
const textWorldPosition = new THREE.Vector3();
test.getWorldPosition(textWorldPosition);
console.log('低楼-0', textWorldPosition);

export default group

