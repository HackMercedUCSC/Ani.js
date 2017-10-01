
const Victor = require('victor');

const Node = require('../Node');

/**
* ImageNode
* https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
*/
class ImageNode extends Node {
  constructor(opt) {
    super(opt);
    this.image = new Image();
    this.image.src = opt.src ? opt.src : "";
    this.size = opt.size ? new Victor.fromObject(opt.size) : null;
    this.offset = opt.offset ? new Victor.fromObject(opt.offset) : new Victor(0, 0);
    this.crop = opt.crop ? new Victor.fromObject(opt.crop) : null;
    this.ready = false;

    this.image.onload = () => {
      if(!this.size) {
        this.size = new Victor(this.image.width, this.image.height);
      }
      this.ready = true;
    }
  }

  draw() {
    super.draw();
    if(this.ready) {
      if(this.offset && this.crop) {
        this.ctx.drawImage(this.image, this.offset.x, this.offset.y, this.crop.x, this.crop.y, this.position.x, this.position.y, this.size.x, this.size.y);
      } else {
        this.ctx.drawImage(this.image, this.position.x, this.position.y, this.size.x, this.size.y);
      }
    }
  }

}

module.exports = ImageNode;


// const Victor = require('victor');
//
// const Node = require('../Node');
//
// /**
// * Image
// * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
// */
// class Image extends Node {
//   constructor(opt) {
//     // if(!opt) throw new Error('Opt');
//     console.log(opt);
//     super(opt);
//
//     this.image = new Image();
//     this.src = opt.src ? opt.src : "https://d4n5pyzr6ibrc.cloudfront.net/media/27FB7F0C-9885-42A6-9E0C19C35242B5AC/4785B1C2-8734-405D-96DC23A6A32F256B/thul-90efb785-97af-5e51-94cf-503fc81b6940.jpg?response-content-disposition=inline";
//     this.position = this.position ? new Victor.fromObject(this.position) : new Victor(100, 100);
//     this.size = this.size ? new Victor.fromObject(this.size) : new Victor(100, 100);
//
//   }
//
//   draw() {
//     if(!this.image && !this.src) return;
//
//     super.draw();
//
//     this.image.onload = function() {
//       this.ctx.drawImage(this.src, this.position.x, this.position.y);
//     }
//   }
// }
//
// module.exports = Image;
