import * as THREE from "three";
import { model } from "./mesh.js";

// 创建场景对象
const scene = new THREE.Scene();
scene.add(model); // 网格模型添加到场景中

/**
 * @description: 光源设置
 * @return {*}
 * @author: tanying
 */
// 平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);

// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// 坐标轴辅助对象
const axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

export { scene };