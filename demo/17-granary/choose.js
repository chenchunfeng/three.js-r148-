import * as THREE from 'three';
import { camera } from './RenderCamera.js';
import { chooseArr } from './scene/mesh.js';

let lastMesh = null;

function choose(event, size = { width: window.innerWidth, height: window.innerHeight }, selectColor = 0x00ffff) {
  // 如果有上次选中的mesh，恢复它的颜色
  if (lastMesh && lastMesh.mesh) {
    lastMesh.mesh.material.color.set(lastMesh.color);
    lastMesh = null;
  }

  // 将点击位置转换为归一化设备坐标（-1到+1）
  const x = (event.offsetX / size.width) * 2 - 1;
  const y = -(event.offsetY / size.height) * 2 + 1;

  // 创建一个射线投射器用于交集测试
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

  // 检查与`chooseArr`中物体的交集
  const intersects = raycaster.intersectObjects(chooseArr);

  // 如果有交集，处理首个被击中的物体
  if (intersects.length > 0) {
    const mesh = intersects[0].object;

    // 存储当前选中的mesh及其原始颜色
    lastMesh = {
      mesh: mesh,
      color: mesh.material.color.clone()
    };

    // 设置mesh颜色为选中颜色
    mesh.material.color.set(selectColor);
  }
}

export { choose };