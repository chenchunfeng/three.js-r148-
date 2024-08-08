import * as THREE from 'three'
export function setBoundingBox(mesh) {

  // const test = new THREE.BoxHelper(mesh, 0xffff00);
  // return test;
  const size = new THREE.Vector3();
  const box = new THREE.Box3();
  box.expandByObject(mesh);
  box.getSize(size);

  const center = new THREE.Vector3();
  box.getCenter(center);

  const group = new THREE.Group()
  const geometry = new THREE.BoxGeometry(size.x + 0.1, size.y + 0.1, size.z + 0.1);
  const material1 = new THREE.MeshBasicMaterial({ color: 0x004444, transparent: true, opacity: 0.5 })
  const boxMesh = new THREE.Mesh(geometry, material1);
  // boxMesh.position.copy(center); // 设置边界盒子的位置到中心点
  group.add(boxMesh)

  const edge = new THREE.EdgesGeometry(geometry);
  const edgesMaterial = new THREE.LineBasicMaterial({
    color: 0x00ffff,
  })
  const line = new THREE.LineSegments(edge, edgesMaterial);
  group.add(line)

  group.position.copy(center);


  return group

} 