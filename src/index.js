
const Module = {
  Node: require('./node'),
  Type: require('./nodeType'),

  init: (node, ctx) => {
    node.ctx = ctx;
    let lastUpdate = Date.now();
    setInterval(() => {
      const delta = (Date.now() - lastUpdate)/1000;
      lastUpdate = Date.now();

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      node.update(delta);
    }, 1000/60);
  }
}

module.exports = Module;
