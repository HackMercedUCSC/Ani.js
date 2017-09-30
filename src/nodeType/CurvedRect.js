
const Victor = require('victor')

const Shape  = require('./Shape')

/**
* CurvedRect
*
*/
class CurvedRect extends Shape {
  constructor(opt) {
    super(opt);

    this.size = this.size ? new Victor.fromObject(this.size) : new Victor(150, 150);
    this.radius = opt.radius;
  }

  draw() {
    super.draw();

    this.roundedRect(this.ctx, this.position.x, this.position.y, this.size.x, this.size.y, this.radius);
  }

  roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    ctx.lineTo(x, y + height - radius);
    ctx.arcTo(x, y + height, x + radius, y + height, radius);
    ctx.lineTo(x + width - radius, y + height);
    ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
    ctx.lineTo(x + width, y + radius);
    ctx.arcTo(x + width, y, x + width - radius, y, radius);
    ctx.lineTo(x + radius, y);
    ctx.arcTo(x, y, x, y + radius, radius);
    ctx.stroke();
  }

}

module.exports = CurvedRect;
