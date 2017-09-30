
let node;

function ready() {
  // node = new Ani.Type.Rect({ position: { x: 10, y: 10 }, size: {x: 50, y: 50 }})
  // Ani.init(node, document.getElementById('canvas').getContext('2d'));

  node = new Ani.Type.Circle({ position: { x: 100, y: 100 }, size: { radius: 50 }});
  Ani.init(node, document.getElementById('canvas').getContext('2d'));
}
