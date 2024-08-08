import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { CSS3DRenderer, CSS3DObject, CSS3DSprite } from 'three/addons/renderers/CSS3DRenderer.js';


import group from './model.js'
import statusSprite from './sprite.js'
import createSprite from './createSprite.js'

// 通道相关
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';




const scene = new THREE.Scene();


scene.add(group)


const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 8000)
// camera.position.set(10, 30, 50)
// camera.lookAt(meshGroup.position)
// camera.lookAt(500, 0, 500);

// 更换正投影相机，一般用于地图展示，没有远小近大效果
// 参数分别是 left right top bottom near far
// const k = width / height // 宽高比
// const s = 20;  // 可以理解为盒子的宽
// const left = -s * k;
// const right = s * k;
// const top = s;
// const bottom = -s
// const camera = new THREE.OrthographicCamera(left, right, top, bottom, 0.1, 8000)
camera.position.set(-5, 26, 96)





// scene.add(edge)

// camera.lookAt(center.x, center.y, center.z);

scene.add(camera)


// 点光源
// const light = new THREE.PointLight(0xffffff, 1.0)
// light.position.set(-100, -100, -100);
// scene.add(light);


// const lightHelper = new THREE.PointLightHelper(light, 5)
// scene.add(lightHelper)

const ambient = new THREE.AmbientLight(0xffffff, 0.4);

scene.add(ambient);

const direction = new THREE.DirectionalLight(0xffffff, 0.8);
direction.castShadow = true;
direction.position.set(-50, 50, -50)
direction.shadow.mapSize.set(1024, 1024)
direction.shadow.radius = 3

console.log(direction.shadow)
// console.log(direction.target.position);
const shadowCamera = direction.shadow.camera;
shadowCamera.left = -50;
shadowCamera.right = 20;
shadowCamera.top = 50;
shadowCamera.bottom = -20;
shadowCamera.near = 20;
shadowCamera.far = 140;

scene.add(direction)
scene.add(direction.target);




const directionHelper = new THREE.DirectionalLightHelper(direction)
scene.add(directionHelper)

const axes = new THREE.AxesHelper(50)
scene.add(axes)

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.render(scene, camera)
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.VSMShadowMap

const node = document.getElementById('webgl')
node.appendChild(renderer.domElement)
const stats = new Stats();
node.appendChild(stats.domElement)

const control = new OrbitControls(camera, renderer.domElement)

// control.target.set(center.x, center.y, 0);
control.update()

// control.addEventListener('change', function () {
//   renderer.render(scene, camera)
// })


const clock = new THREE.Clock();








window.onresize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  css2Renderer.setSize(width, height);
  camera.aspect = width / height;
  // const k = width / height
  // camera.left = -s * k;
  // camera.right = s * k

  camera.updateProjectionMatrix()
}


const gui = new GUI();
gui.close()
gui.add(ambient, 'intensity').step(0.1).max(1).min(-1).onChange(value => {
  console.log(value);
})


const DirFolder = gui.addFolder('平行光target')
DirFolder.add(direction.target.position, 'z').step(10).onChange(value => {
  directionHelper.update()
})
DirFolder.add(direction.target.position, 'x').name('平行光 target').step(10).onChange(value => {
  directionHelper.update()
})
DirFolder.add(direction.target.position, 'y').step(10).onChange(value => {
  directionHelper.update()
})
DirFolder.add(direction, 'intensity', 0, 1).step(0.1).onChange(value => {
  console.log(value);
})
const positionFolder = gui.addFolder('平行光position')

positionFolder.add(direction.position, 'x').step(1).onChange(value => {
  directionHelper.update()
})
positionFolder.add(direction.position, 'y').step(1).onChange(value => {
  directionHelper.update()
})
positionFolder.add(direction.position, 'z').step(1).onChange(value => {
  directionHelper.update()
})

const obj = {
  color: 0x00ffff,
  text: '123',
  number: 123,
  function: () => {
    console.log('function')
  },
  array1: { test: 1 }
}


const shadowFolder = gui.addFolder('平行光相机');
shadowFolder.add(shadowCamera, 'left', -100, 0).step(1).onChange(v => {
  shadowCamera.updateProjectionMatrix();
  shadowHelper.update()
})
shadowFolder.add(shadowCamera, 'right', 0, 100).step(1).onChange(v => {
  shadowCamera.updateProjectionMatrix();
  shadowHelper.update()
})
shadowFolder.add(shadowCamera, 'top', 0, 100).step(1).onChange(v => {
  shadowCamera.updateProjectionMatrix();
  shadowHelper.update()
})
shadowFolder.add(shadowCamera, 'bottom', -100, 0).step(1).onChange(v => {
  shadowCamera.updateProjectionMatrix();
  shadowHelper.update()
})
shadowFolder.add(shadowCamera, 'near', 0, 2).step(0.1).onChange(v => {
  shadowCamera.updateProjectionMatrix();
  shadowHelper.update()
})
shadowFolder.add(shadowCamera, 'far', 0, 200).step(1).onChange(v => {
  shadowCamera.updateProjectionMatrix();
  shadowHelper.update()
})






const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
const size = new THREE.Vector2();
renderer.getSize(size)
console.log(size);
const outlinePass = new OutlinePass(size, scene, camera);
outlinePass.selectedObjects = [];
//模型描边颜色，默认白色         
// outlinePass.visibleEdgeColor.set(0xffff00);
//高亮发光描边厚度
console.log(outlinePass.edgeThickness);
outlinePass.edgeThickness = 4;
outlinePass.edgeStrength = 6;
outlinePass.pulsePeriod = 2;

composer.addPass(renderPass)
composer.addPass(outlinePass)


// document.getElementById('low').addEventListener('click', () => {
//   const mesh = group.getObjectByName('low');
//   outlinePass.selectedObjects = [mesh];
//   outlinePass.visibleEdgeColor.set(0xff0000);
// })
// document.getElementById('high').addEventListener('click', () => {
//   const mesh = group.getObjectByName('high');
//   outlinePass.selectedObjects = [mesh];

//   outlinePass.visibleEdgeColor.set(0xffff00);
//   // debugger
// })

// 处理后期处理锯齿
const pixelRatio = window.devicePixelRatio;
// console.log(size.x, width, pixelRatio);
const smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio);
composer.addPass(smaaPass)





const texture = new THREE.TextureLoader().load('./textures/hot.png')
console.log(texture);
const spriteGroup = new THREE.Group()
const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture }))
sprite.position.set(10, 10, 10)
sprite.clickEvent = function () {
  group.getObjectByName('high').traverse(mesh => {
    if (mesh.isMesh) {
      mesh.material.color.set(0x0000ff)
    }
  })
}
spriteGroup.add(sprite)

const sprite2 = sprite.clone();
sprite2.material = sprite2.material.clone()
sprite2.material.color.set(0xff0000)
sprite2.position.set(5, 10, 10);
sprite2.clickEvent = function () {
  group.getObjectByName('high').traverse(mesh => {
    if (mesh.isMesh) {
      mesh.material.color.set(0xff0000)
    }
  })
}
spriteGroup.add(sprite2)

group.add(spriteGroup);



const css2Renderer = new CSS3DRenderer();
css2Renderer.setSize(width, height);
node.appendChild(css2Renderer.domElement)
css2Renderer.domElement.style.position = 'absolute';
css2Renderer.domElement.style.top = '0px';
css2Renderer.domElement.style.pointerEvents = 'none';



// 初始化动画相关参数
const scaleSpeed = 2;  // 缩放速度
const maxSize = 2.5;     // Sprite缩放的最大尺寸
const minSize = 2;     // Sprite缩放的最小尺寸
const sizeRange = (maxSize - minSize) / 2;  // 计算尺寸变化的幅度
const baseScale = minSize + sizeRange;  // 基础尺寸，从这个尺寸开始进行缩放

function render() {
  const delta = clock.getDelta()
  // console.log(camera.position);
  control.update()
  // renderer.render(scene, camera)
  composer.render()
  stats.update()
  window.requestAnimationFrame(render)

  css2Renderer.render(scene, camera)

  spriteGroup.traverse(item => {
    if (item.isSprite) {
      let scale = baseScale + Math.sin(Date.now() * 0.001 * scaleSpeed) * sizeRange;
      item.scale.set(scale, scale, 1);
    }
  })

}


const outlineFolder = gui.addFolder('边缘发光');
outlineFolder.addColor(outlinePass, 'visibleEdgeColor')
outlineFolder.add(outlinePass, 'edgeThickness', 0, 10);
outlineFolder.add(outlinePass, 'edgeStrength', 0, 10);
outlineFolder.add(outlinePass, 'pulsePeriod', 0, 10);


const bloomPass = new UnrealBloomPass();
// composer.addPass(bloomPass)


const glitchPass = new GlitchPass();
// 设置glitchPass通道
// composer.addPass(glitchPass);

render()


let chooseObj = null;
renderer.domElement.addEventListener('click', (e) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = e.offsetX / width * 2 - 1  //  -1 到 1
  const y = - e.offsetY / height * 2 + 1
  const ray = new THREE.Raycaster()

  ray.setFromCamera(new THREE.Vector2(x, y), camera);

  const intersect = ray.intersectObject(group)

  if (intersect.length > 0) {
    const mesh = intersect[0].object;
    // console.log(mesh);
    // if (mesh.father && mesh.isMesh) {
    //   outlinePass.selectedObjects = [mesh.father]
    // } else {
    //   outlinePass.selectedObjects = [mesh]
    // }

    // if (mesh.isSprite) {
    //   mesh.clickEvent && mesh.clickEvent()
    // }
    if (mesh.isMesh || mesh.isSprite) {
      // console.log('mesh', tabObject.name);

      // const deviceName = document.getElementById('tag');
      // if (deviceName) {
      //   deviceName.textContent = mesh.name || '测试';
      // }

      // 创建一个Box3对象
      // var box = new THREE.Box3();
      // box.setFromObject(mesh);
      // const boxSize = new THREE.Vector3()
      // box.getSize(boxSize)
      // chooseObj = mesh;

      // // tabObject.position.set(0, 20, 0)
      // // mesh.add(tabObject)
      // console.log(mesh.position);
      // statusSprite.position.z = 20;
      // mesh.add(statusSprite)

      createSprite(mesh, mesh.name || '测试')
    }
  } else {
    // 这里的逻辑好像没用
    // chooseObj && chooseObj.remove(tabObject)
  }


})

// const tabNode = document.getElementById('tag');
// // tabNode.style.display = 'inline';
// tabNode.style.pointerEvents = 'none'
// const tabObject = new CSS3DSprite(tabNode);
// 一定要放在上面代码之后
// tabNode.style.pointerEvents = 'none'
// tabObject.name = 'tag'
// // tabObject.position.set()
// // tabObject.translateY(200)
// tabObject.scale.set(0.2, 0.2, 1)
// const position = new THREE.Vector3()
// // group.getWorldPosition(position);
// // tabObject.position.copy(position)
// // tabObject.position.set(0, 50, 0)
// // scene.add(tabObject)
// // scene.add(tabObject)

// const closeNode = document.getElementById('close');

// closeNode.style.cursor = 'pointer'
// closeNode.addEventListener('click', (event) => {
//   chooseObj.remove(tabObject);
// })

