
const Victor = require('victor');

const Shape = require('./Shape');

class Rect extends Shape {
  constructor(opt) {
    super(opt);

    this.size = opt.size ? new Victor.fromObject(opt.size) : new Victor(100, 100);
  }

  draw() {
    super.draw();
    if (this.stroke) this.ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
    if (this.fill) this.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
  }
}

module.exports = Rect;
