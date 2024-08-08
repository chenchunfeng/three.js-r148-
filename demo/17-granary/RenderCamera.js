import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

const width = window.innerWidth;
const height = window.innerHeight;

/**
 * @description: 相机设置
 * @return {*}
 * @author: tanying
 */
const k = width / height;//three.js输出的canvas画布宽高比
const s = 200;// 控制相机渲染空间在上下左右渲染范围，渲染空间外的模型不会被渲染
// -s*k, s*k, s, -s, 1, 10000 定义了一个长方体渲染空间，渲染空间外的模型不会被渲染
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 10000);
// const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 2000)
camera.position.set(200, 300, 200);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  antialias: true, // 开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); // 设置设备的像素比，防止canvas画布输出模糊
renderer.setSize(width, height); // 设置渲染画布尺寸
// //新版本，加载gltf，不需要执行下面代码解决颜色偏差
renderer.outputColorSpace = THREE.SRGBColorSpace;

// 设置相机控件轨道控制器OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);


window.onresize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  // camera.aspect = width / height;

  const k = width / height
  camera.left = -s * k;
  camera.right = s * k

  camera.updateProjectionMatrix()
}


const css2Renderer = new CSS2DRenderer();
css2Renderer.setSize(width, height);
css2Renderer.domElement.style.position = 'absolute';
css2Renderer.domElement.style.top = '0px';
css2Renderer.domElement.style.pointerEvents = 'none';

export { camera, renderer, controls, css2Renderer };