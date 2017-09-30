
const Node = require('../Node');

class Shape extends Node {
  constructor(opt) {
    super(opt);

    this.strokeStyle = opt.strokeStyle || '#000';
    this.fillStyle = opt.fillStyle || '#000';
  }

  draw() {
    const oldStrokeStyle = this.ctx.strokeStyle;
    const oldFillStyle = this.ctx.fillStyle;

    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.fillStyle = this.fillStyle;

    super.draw();

    this.ctx.strokeStyle = oldStrokeStyle;
    this.ctx.fillStyle = oldFillStyle;
  }
}

module.exports = Shape;
