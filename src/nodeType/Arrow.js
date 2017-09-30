
const Victor = require('victor');

const Node = require('./Shape');
const Polygon = require('./Polygon');

class Arrow extends Node {
  constructor(opt) {
    super(opt);

    this.arrowSize = opt.arrowSize ? opt.arrowSize : 10;
    this.length = opt.length ? opt.length: 50;
  }

  draw() {
    super.draw();

    let line = new Polygon({
      position: { x: 0, y: 0 },
      points: [ {x: 0, y: 0 }, {x: this.length, y: 0} ],
      stroke: true
    });

    let triangle = new Polygon({
      position: { x: 0, y: 0 },
      points: [{x: 0, y: 0}, {x: this.arrowSize, y: this.arrowSize}, {x: this.arrowSize, y: -this.arrowSize}],
    });
    this.addChild(line);
    this.addChild(triangle);
  }
}

module.exports = Arrow;
