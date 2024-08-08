import { scene } from "./scene/index.js"
import { camera, renderer, css2Renderer } from "./RenderCamera.js";
import { choose } from "./choose.js";

function render() {
  renderer.render(scene, camera);
  css2Renderer.render(scene, camera);

  requestAnimationFrame(render);

}

render();


function appendChild(node) {
  node.appendChild(renderer.domElement);
  node.appendChild(css2Renderer.domElement);

  node.addEventListener('click', choose)
}

export { appendChild }