
const EventEmitter = require('events');
const Victor = require('victor');

const EasingFunctions = require('./lib/easings');

class Animation extends EventEmitter {
  constructor(node, opt) {
    super();
    this.node = node;
    this.opt = opt;
    this.relative = opt.relative;
    this.func = opt.func || 'linear';
    this.passThrough = opt.passThrough;
    this.startingPosition = node.position.clone();

    this.time = 0;
    this.timeLength = opt.time;

    if (!this.timeLength || this.timeLength < 0) {
      throw new Error('Invalid animation time!');
    }

    this.relative = {};
    if (!this.relative) {
      Object.keys(this.opt).forEach(key => {
        if (key == 'relative' || key == 'time' || key == 'func' || key == 'passThrough') return;
        this.parseTarget(this.opt, key, this.node, this.relative);
      });
    } else {
      this.relative = this.opt;
    }

    if (this.passThrough) {
      if (!this.relative.position) this.relative.position = {};
      if (!this.relative.position.x) this.relative.position.x = 0;
      if (!this.relative.position.y) this.relative.position.y = 0;
    }
  }

  update(delta) {
    const prevTime = this.time;
    if (this.time + delta >= this.timeLength) {
      delta = this.time - this.timeLength;
      this.time = this.timeLength;
    } else {
      this.time += delta;
    }

    const easeDelta = EasingFunctions[this.func](this.time/this.timeLength) - EasingFunctions[this.func](prevTime/this.timeLength);

    let controlPoint = null;
    if (this.passThrough) {
      const controlPoint = new Victor();
      controlPoint.x = 2*this.passThrough.x - this.startingPosition.x/2 - (this.startingPosition.x + this.relative.position.x)/2;
      controlPoint.y = 2*this.passThrough.y - this.startingPosition.y/2 - (this.startingPosition.y + this.relative.position.y)/2;

      const getQuadBezPos = (dim, t) => {
        return (1 - t)*(1 - t)*this.startingPosition[dim] + 2*(1-t)*t*controlPoint[dim] + t*t*(this.startingPosition[dim] + this.relative.position[dim]);
      }

      const prevTimeWithEase = EasingFunctions[this.func](prevTime/this.timeLength);
      const timeWithEase = EasingFunctions[this.func](this.time/this.timeLength);

      this.node.position.x += getQuadBezPos('x', timeWithEase) - getQuadBezPos('x', prevTimeWithEase);
      this.node.position.y += getQuadBezPos('y', timeWithEase) - getQuadBezPos('y', prevTimeWithEase);
    }

    Object.keys(this.relative).forEach(key => {
      this.parseTarget(this.relative, key, this.node, (relativeTarget, key, nodeTarget) => {
        if (this.passThrough && relativeTarget == this.relative.position) return; // Passthrough already modifies position

        nodeTarget[key] += relativeTarget[key]*easeDelta;
      });
    });

    if (this.time >= this.timeLength) {
      this.node.animations.splice(this.node.animations.indexOf(this), 1);
      this.emit('finished', this.opt);
      this.node.emit('finished', this.opt, this);
    }
  }

  parseTarget(target, key, nodeTarget, relValues) { // Create relValues if object exists, relValues COULD BE FUNCTION
    if (typeof target[key] == 'object') {
      if (relValues != 'function') relValues[key] = {};
      Object.keys(target[key]).forEach(childKey => {
        this.parseTarget(target[key], childKey, nodeTarget[key], typeof relValues == 'function' ? relValues : relValues[key]);
      });
      return;
    } else if (typeof target[key] == 'array') {
      if (typeof relValues != 'function') relValues[key] = [];
    } else { // Values
      if (typeof relValues != 'function') relValues[key] = target[key] - nodeTarget[key];
      else relValues(target, key, nodeTarget);
    }
  }
}

module.exports = Animation;
