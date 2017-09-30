
const Shape = require('./Shape');

/**
* Text
* https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text
*/
class Text extends Shape {
  constructor(opt) {
    super(opt);

    this.text = opt.text;
    this.font = opt.font ? opt.font : 'Arial';
    this.fontSize = opt.fontSize ? opt.fontSize : 16;
    this.textAlign = opt.textAlign ? opt.textAlign : 'center';
    this.textBaseline = opt.textBaseline ? opt.textBaseline : 'alphabetic';
  }

  draw() {
    if (!this.text) return;

    super.draw();

    this.ctx.font = this.fontSize + 'px ' + this.font
    this.ctx.textAlign = this.textAlign;
    this.ctx.textBaseline = this.textBaseline;

    if (this.stroke) this.ctx.strokeText(this.text, this.position.x, this.position.y);
    if (this.fill) this.ctx.fillText(this.text, this.position.x, this.position.y);
  }

  measure() {
    this.ctx.font = this.fontSize + 'px ' + this.font
    return this.ctx.measureText(this.text);
  }
}

module.exports = Text;
