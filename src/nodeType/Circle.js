
const Victor = require('victor');

const Shape = require('./Shape');

class Circle extends Shape {
  constructor(opt) {
    super(opt);

    this.radius = opt.radius ? opt.radius : 50;
    this.startAngle = opt.startAngle ? opt.startAngle : 0;
    this.endAngle = opt.endAngle !== undefined ? opt.endAngle : 2 * Math.PI;
  }

  draw() {
    super.draw();

    this.ctx.arc(this.position.x, this.position.y, this.radius, this.startAngle, this.endAngle);
    this.ctx.stroke();
  }
}

module.exports = Circle;
