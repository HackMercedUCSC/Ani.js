
const Victor = require('victor');

const Shape = require('./Shape');

class Rect extends Shape {
  constructor(opt) {
    super(opt);

    this.size = opt.size ? new Victor.fromObject(opt.size) : new Victor(100, 100);
    this.radius = opt.radius || 0;
  }

  draw() {
    super.draw();
    if (this.radius == 0) {
      if (this.stroke) this.ctx.strokeRect(this.position.x, this.position.y, this.size.x, this.size.y);
      if (this.fill) this.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    } else {
      this.roundedRect(this.ctx, this.position.x, this.position.y, this.size.x, this.size.y, this.radius);
    }
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
    if (this.stroke) ctx.stroke();
    if (this.fill) ctx.fill();
    ctx.closePath();
  }
}

module.exports = Rect;
