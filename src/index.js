
const Module = {
  Node: require('./Node'),
  Type: require('./nodeType'),

  init: (node, ctx) => {
    node.ctx = ctx;
    let lastUpdate = Date.now();
    setInterval(() => {
      const delta = (Date.now() - lastUpdate)/1000;
      lastUpdate = Date.now();

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      node.update(delta);
    }, 1000/60);
  }
}

module.exports = Module;
