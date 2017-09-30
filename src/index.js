
const Module = {
  Node: require('./Node'),
  Type: require('./nodeType'),

  init: (node, ctx, width, height) => {
    node.ctx = ctx;

    ctx.canvas.width = width*2;
    ctx.canvas.height = height*2;
    ctx.scale(2, 2);
    ctx.canvas.style.width = width+'px';
    ctx.canvas.style.height = height+'px';
    ctx.translate(0.5, 0.5);


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
