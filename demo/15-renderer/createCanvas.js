/**
  * 创建一个canvas对象，绘制几何图案或添加文字
  */

function createCanvas(name) {

  const canvas = document.createElement("canvas");
  const arr = name.split(""); // 分割为单独字符串
  let num = 0;
  const reg = /[\u4e00-\u9fa5]/;
  for (let i = 0; i < arr.length; i++) {
    if (reg.test(arr[i])) { // 判断是不是汉字
      num += 1;
    } else {
      num += 0.5; // 英文字母或数字累加0.5
    }
  }

  const dpr = window.devicePixelRatio || 1;  // 获取设备像素比
  // 根据字符串符号类型和数量、文字font-size大小来设置canvas画布宽高度
  const h = 80; // 根据渲染像素大小设置
  const w = h + num * 32;
  canvas.width = w * dpr; // 考虑设备像素比
  canvas.height = h * dpr; // 考虑设备像素比
  const h1 = h * 0.8 * dpr; // 考虑设备像素比
  const c = canvas.getContext('2d');
  c.scale(dpr, dpr);  // 调整绘图比例，保证在高DPI设备上的清晰度

  // 定义轮廓颜色，黑色半透明
  c.fillStyle = "rgba(0,0,0,0.5)";
  // 绘制半圆+矩形轮廓
  const R = h1 / 2;
  c.arc(R, R, R, -Math.PI / 2, Math.PI / 2, true); //顺时针半圆
  c.arc(w - R, R, R, Math.PI / 2, -Math.PI / 2, true); //顺时针半圆
  c.fill();
  // 绘制箭头
  c.beginPath();
  const h2 = h - h1;
  c.moveTo(w / 2 - h2 * 0.6, h1);
  c.lineTo(w / 2 + h2 * 0.6, h1);
  c.lineTo(w / 2, h);
  c.fill();
  // 文字
  c.beginPath();
  c.translate(w / 2, h1 / 2);
  c.fillStyle = "#ffffff"; //文本填充颜色
  c.font = "normal 32px 宋体"; //字体样式设置
  c.textBaseline = "middle"; //文本与fillText定义的纵坐标
  c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
  c.fillText(name, 0, 0);
  return canvas;
}


export default createCanvas