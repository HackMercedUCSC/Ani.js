
const Shape = require('./Shape');

/**
* Text
* https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text
*/
class Text extends Shape {
  constructor(opt) {
    super(opt);

    this.font = opt.font ? opt.font : 'Arial';
    this.fontSize = opt.fontSize ? opt.fontSize : 16;
    this.textAlign = opt.textAlign ? opt.textAlign : 'center';
    this.textBaseline = opt.textBaseline ? opt.textBaseline : 'alphabetic';
    this.direction = opt.direction ? opt.direction : 'inherit';
    this.text = opt.text;
  }

  draw() {
    if(!this.text) {
      return;
    }

    super.draw();

    this.ctx.font = this.fontSize + 'px ' + this.font + ' ' + this.textAlign + ' ' + this.textBaseline + ' ' + this.direction;
    this.ctx.strokeText(this.text, this.position.x, this.position.y);
  }
}

module.exports = Text;