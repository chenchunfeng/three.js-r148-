import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import group from './model.js';

const position = [
  0, 0, 0,
  30, 0, 0,
  0, 30, 0,
  0, 0, 30
]

const color = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1,
  1, 1, 1
]


const times = [0, 3, 6, 9];

const positionKT = new THREE.KeyframeTrack('Box.position', times, position);
const colorKt = new THREE.KeyframeTrack('Box.material.color', times, color);

// 帧
const clip = new THREE.AnimationClip('test', 9, [positionKT, colorKt]);
// 播放器
const mixer = new THREE.AnimationMixer(group);
// 播放内容
const clipAction = mixer.clipAction(clip);

clipAction.play();

// clipAction.loop = THREE.LoopOnce;
clipAction.loop = THREE.LoopRepeat;
console.log('clipAction', clipAction);
console.log('clip', clip);

// 物体状态停留在动画结束的时候
// clipAction.clampWhenFinished = true;

// setTimeout(() => {
//   clipAction.stop();
// }, 2000)



const clock = new THREE.Clock()
function render() {
  const delta = clock.getDelta()
  mixer.update(delta)
  window.requestAnimationFrame(render)


}


render()
document.getElementById('next').addEventListener('click', () => {
  if (clipAction.time >= clip.duration) {
    clipAction.stop();
    clipAction.play();
    clipAction.paused = true;
  }
  clipAction.time += 1;
})
document.getElementById('stop').addEventListener('click', () => {
  clipAction.stop();
  clipAction.play();
})
document.getElementById('operate').addEventListener('click', () => {

  if (clipAction.paused) {
    document.getElementById('operate').innerText = '暂停'
  } else {
    document.getElementById('operate').innerText = '播放'
  }
  clipAction.paused = !clipAction.paused
  // document.getElementById('stop').textContent = '播放'
})


const gui = new GUI(); //创建GUI对象
// 0~6倍速之间调节
gui.add(clipAction, 'timeScale', -6, 6);
gui.add(clipAction, 'time', 0, clip.duration)