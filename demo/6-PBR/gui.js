import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

export default function createGUI() {
  const gui = new GUI();
  gui.domElement.style.right = '0px';
  gui.domElement.style.width = '250px';
  return gui;
}