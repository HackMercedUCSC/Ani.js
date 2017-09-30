
const Victor = require('victor');

const Shape = require('./Shape');

class Rect extends Shape {
  constructor(opt) {
    super(opt);

    this.size = this.size ? new Victor.fromObject(this.size) : new Victor(100, 100);
  }

  draw() {
    super.draw();
    this.ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
  }
}

module.exports = Rect;
