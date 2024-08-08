import * as THREE from "three"
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import createTagTag from './tag.js'

const model = new THREE.Group();
const loader = new GLTFLoader();
const chooseArr = []
loader.load('./assets/model.gltf', function (gltf) {
  model.add(gltf.scene);

  const group = gltf.scene.getObjectByName('粮仓');

  group.traverse((obj) => {
    if (obj.isMesh) {

      // 更改所有mesh材质，材质共享，点击会全部变色
      obj.material = obj.material.clone();

      const label = createTagTag(obj.name);
      const pos = new THREE.Vector3();
      obj.getWorldPosition(pos);
      if (obj.parent.name === '立筒仓') {
        pos.y += 36;
      }
      if (obj.parent.name === '浅圆仓') {
        pos.y += 20;
      }
      if (obj.parent.name === '平房仓') {
        pos.y += 17;
      }
      label.position.copy(pos);
      model.add(label);
      chooseArr.push(obj);
    }
  })
})

const texture = new THREE.TextureLoader().load('./assets/model_img3.png');
const geometry = new THREE.PlaneGeometry(185, 260);
const material = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide,
  map: texture
})
const plane = new THREE.Mesh(geometry, material);
// plane.position.x = -200; 
plane.rotateX(Math.PI / 2);
model.add(plane);

export { model, chooseArr }