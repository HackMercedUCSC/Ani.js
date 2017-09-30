
const Node = require('../Node');

class Shape extends Node {
  constructor(opt) {
    super(opt);

    this.strokeStyle = opt.strokeStyle || '#000';
    this.fillStyle = opt.fillStyle || '#000';
    this.lineWidth = opt.lineWidth || 1;

    this.oldStrokeStyle = '';
    this.oldFillStyle = '';
    this.oldLineWidth = '';
  }

  draw() {
    this.oldStrokeStyle = this.ctx.strokeStyle;
    this.oldFillStyle = this.ctx.fillStyle;
    this.oldLineWidth = this.ctx.lineWidth;

    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.lineWidth = this.lineWidth;

    super.draw();
  }

  finishDraw() {
    this.ctx.strokeStyle = this.oldStrokeStyle;
    this.ctx.fillStyle = this.oldFillStyle;
    this.ctx.lineWidth = this.oldLineWidth;
  }
}

module.exports = Shape;
