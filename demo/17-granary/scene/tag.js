import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

export default function createTagTag(name) {
  const div = document.createElement('div');
  div.style.boxShadow = '0 0 2px #00ffff inset';
  div.style.background = 'linear-gradient(#00ffff, #00ffff) left top,linear-gradient(#00ffff, #00ffff) left top,linear-gradient(#00ffff, #00ffff) right bottom,linear-gradient(#00ffff, #00ffff) right bottom';
  div.style.backgroundRepeat = 'no-repeat';
  div.style.backgroundSize = '1px 6px, 6px 1px';
  div.style.backgroundColor = 'rgba(0,0,0,0.5)';
  div.style.padding = '4px 10px';
  div.style.color = '#ffffff';
  div.style.fontSize = '16px';
  // div.classList.add("tag");
  div.style.pointerEvents = 'none';
  div.innerHTML = name;
  const label = new CSS2DObject(div);
  return label;
}

