
const Victor = require('victor');

const Shape = require('./Shape');

class Rect extends Shape {
  constructor(opt) {
    super(opt);

    this.size = this.size ? new Victor.fromObject(this.size) : new Victor(100, 100);
  }

  draw() {
    super.draw();
    // Stupid scale(2, 2) causes rectangle to screw up
    if (this.stroke) this.ctx.strokeRect(this.position.x, this.position.y, this.size.x/2, this.size.y/2);
    if (this.fill) this.ctx.fillRect(this.position.x, this.position.y, this.size.x/2, this.size.y/2);
  }
}

module.exports = Rect;
