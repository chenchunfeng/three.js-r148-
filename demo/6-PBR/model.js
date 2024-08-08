import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import createGUI from './gui.js'

const loader = new GLTFLoader();
const group = new THREE.Group();

const texture = new THREE.TextureLoader().load('./model/mobile/黑色.png')
texture.flipY = false;

const material = new THREE.MeshPhysicalMaterial({
  color: 0xff00ff,
  metalness: 0.0,
  roughness: 0.02,
  clearcoat: 0.5,
  clearcoatRoughness: 0.1
})

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0.0,
  roughness: 0.0,
  transmission: 1.0,
  envMapIntensity: 1.0,
  ior: 1.5
})
loader.load('./model/car/su7.glb', function (gltf) {

  const car = gltf.scene;
  group.add(car);

  const door = car.getObjectByName('Object_45');
  door.traverse(item => {
    if (item.isMesh) {
      console.log(item.material.clearcoatRoughness)
      console.log(item.name);
      item.material = material
      // item.material.color.set(0xff00ff);

    }
  })


  const glass = car.getObjectByName('Object_49');
  glass.traverse(item => {
    if (item.isMesh) {
      item.material = glassMaterial;
    }
  })
})


const gui = createGUI();
const carFolder = gui.addFolder('汽车')
carFolder.add(material, 'metalness', 0, 1).step(0.01)
carFolder.add(material, 'roughness', 0, 1).step(0.01)
carFolder.add(material, 'clearcoat', 0, 1).step(0.01)
carFolder.add(material, 'clearcoatRoughness', 0, 1).step(0.01)
carFolder.addColor(material, 'color')

// carFolder.add(group.position, 'y', -10, 10).step(1)

const glassFolder = gui.addFolder('玻璃')
glassFolder.add(glassMaterial, 'transmission', 0, 1).step(0.01).name('透光率')
glassFolder.add(glassMaterial, 'envMapIntensity', 0, 10).step(1).name('环境贴图的效果')
glassFolder.add(glassMaterial, 'ior', 1, 2.3).step(0.01).name('折射率')
glassFolder.addColor(glassMaterial, 'color')

export { group }

