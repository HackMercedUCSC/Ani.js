
const Victor = require('victor');

const Shape = require('./Shape');

class Polygon extends Shape {
  constructor(opt) {
    super(opt);

    this.points = opt.points ? opt.points.map(point => Victor.fromObject(point)) : [];
    this.curves = [];

    if (opt.curves) {
      opt.curves.forEach((curve, index) => {
        this.curves[curve.index !== undefined ? curve.index : index] = Victor.fromObject(curve);
      });
    }
  }

  draw() {
    if (!this.points.length) return;

    super.draw();
    this.ctx.beginPath();

    const offsetX = this.position.x;
    const offsetY = this.position.y;

    this.ctx.moveTo(this.points[0].x + offsetX, this.points[0].y + offsetY);
    for (let i = 0; i < this.points.length; i++) {
      let pointsI = (i + 1) % this.points.length;
      if (this.curves[i]) {
        const curve = this.curves[i];
        this.ctx.quadraticCurveTo(curve.x + offsetX, curve.y + offsetY, this.points[pointsI].x + offsetX, this.points[pointsI].y + offsetY);
      } else {
        this.ctx.lineTo(this.points[pointsI].x + offsetX, this.points[pointsI].y + offsetY);
      }
    }
    this.ctx.lineTo(this.points[0].x + offsetX, this.points[0].y + offsetY);
    this.ctx.closePath();

    if (this.stroke) this.ctx.stroke();
    if (this.fill) this.ctx.fill();
  }
}

module.exports = Polygon;
