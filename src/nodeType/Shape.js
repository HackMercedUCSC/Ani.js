
const Node = require('../Node');

class Shape extends Node {
  constructor(opt) {
    super(opt);

    this.strokeStyle = opt.strokeStyle || '#000';
    this.fillStyle = opt.fillStyle || '#000';
    this.lineWidth = opt.lineWidth || 1;
    this.lineCap = opt.lineCap || 'round';
    this.lineJoin = opt.lineJoin || 'round';

    this.stroke = opt.stroke !== undefined ? opt.stroke : false;
    this.fill = opt.fill !== undefined ? opt.fill : true;
  }

  draw() {
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.fillStyle = this.fillStyle;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = this.lineCap;
    this.ctx.lineJoin = this.lineJoin;

    super.draw();
  }
}

module.exports = Shape;
