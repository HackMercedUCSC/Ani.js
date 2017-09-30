
const EventEmitter = require('events');
const Victor = require('victor');

const Animation = require('./Animation');

const FILTER_ENDINGS = {
  blur: 'px',
  contrast: '%',
  brightness: '%',
  grayscale: '%',
  hueRotate: 'deg',
  invert: '%',
  opacity: '%',
  saturate: '%',
  sepia: '%',
  dropShadow: {
    offsetX: 'px',
    offsetY: 'px',
    blurRadius: 'px',
    color: ''
  }
};

class Node extends EventEmitter {
  constructor(opt) {
    super();
    this.parent = opt.parent || null;
    this.ctx = this.parent ? this.parent.ctx : null;
    this.position = opt.position ? new Victor.fromObject(opt.position) : new Victor(0, 0);
    this.scale = opt.scale ? new Victor.fromObject(opt.scale) : new Victor(1, 1);
    this.rotation = opt.rotation || 0; // Radians
    this.origin = opt.origin ? new Victor.fromObject(opt.origin) : new Victor(0, 0);

    this.children = [];

    this.animations = [];
    this.waitingTests = [];

    if (!opt.filters) opt.filters = {};
    if(!opt.filters.dropShadow) opt.filters.dropShadow = {};

    this.filters = {
      blur: opt.filters.blur !== undefined ? opt.filters.blur : -1,
      contrast: opt.filters.contrast !== undefined ? opt.filters.contrast : -1,
      brightness: opt.filters.brightness !== undefined ? opt.filters.brightness : -1,
      grayscale: opt.filters.grayscale !== undefined ? opt.filters.grayscale : -1,
      hueRotate: opt.filters.hueRotate !== undefined ? opt.filters.hueRotate : -1,
      invert: opt.filters.invert !== undefined ? opt.filters.invert : -1,
      opacity: opt.filters.opacity !== undefined ? opt.filters.opacity : -1,
      saturate: opt.filters.saturate !== undefined ? opt.filters.saturate : -1,
      sepia: opt.filters.sepia !== undefined ? opt.filters.sepia : -1,
      dropShadow: {
        offset: opt.offset ? new Victor.fromObject(opt.offset) : new Victor(0, 0),
        blurRadius:opt.filters.dropShadow.blurRadius ? opt.filters.dropShadow.blurRadius : 0,
        color: opt.filters.dropShadow.color ? opt.filters.dropShadow.color : 'black',
        inherit: true
      }
    };
  }

  animate() {
    const args = Array.prototype.slice.call(arguments);
    const animationRequests = typeof args.slice(-1)[0] == 'array' ? args.slice(-1)[0] : args.slice(-1);
    const conditions = args.slice(0, -1);

    if (typeof animationRequests[0] == 'array') animationRequests = animationRequests[0];

    this.runCondition(0, conditions, animationRequests);
  }

  runCondition(index, conditions, animationRequests) {
    const cur = conditions[index];
    if (!cur) return this.processAnimationRequest(animationRequests);

    let hit = false;
    const cb = () => {
      if (hit) return;
      hit = true;
      if (cur.event && cur.target) cur.target.removeListener(cur.event, cb);
      if (cur.test) this.waitingTests.splice(this.waitingTests.indexOf(waitingTest), 1);
      this.runCondition(index + 1, conditions, animationRequests);
    };

    if (cur.time !== undefined) {
      setTimeout(cb, cur.time*1000);
    }
    if (cur.event && cur.target) {
      cur.target.on(cur.event, cb);
    } else if (cur.event || cur.target) {
      throw new Error('Expect both "event" and "target" properties in animation request.');
    }
    const waitingTest = { test: cur.test, cb: cb };
    if (cur.test) {
      this.waitingTests.push(waitingTest);
    }
  }

  processAnimationRequest(animationRequests) {
    animationRequests.forEach(aniRequest => {
      this.animations.push(new Animation(this, aniRequest));
    });
  }

  update(delta) {
    this.waitingTests.forEach(test => {
      if (test.test()) test.cb();
    });

    this.animations.forEach(animation => {
      animation.update(delta);
    });

    this.oldFilters = this.ctx.filter

    let filterFuncs = this.ctx.filter == 'none' ? [] : this.ctx.filter.split(') ');
    Object.keys(this.filters).forEach(key => {
      if ((key != 'dropShadow' && this.filters[key] != -1) || this.filters[key].inherit === false) { // if parent has not set filters
        filterFuncs.forEach((func, index) => {
          if (func.startsWith(key)) filterFuncs.splice(index, 1);
        });
        if (key == 'dropShadow'){
          filterFuncs.push('drop-shadow(' + this.filters.dropShadow.offset.x + 'px '
                                          + this.filters.dropShadow.offset.y + 'px '
                                          + this.filters.dropShadow.blurRadius + 'px '
                                          + this.filters.dropShadow.color + ')');
        }
        else filterFuncs.push(key + '(' + this.filters[key] + FILTER_ENDINGS[key]+ ')');
      }
    });

    this.ctx.filter = filterFuncs.join(' ') || 'none';

    this.ctx.translate(this.position.x + this.origin.x, this.position.y + this.origin.y);
    this.ctx.rotate(this.rotation);
    this.ctx.scale(this.scale.x, this.scale.y);
    this.ctx.translate(-this.position.x - this.origin.x, -this.position.y - this.origin.y);

    this.draw();

    this.children.forEach(child => {
      child.update(delta);
    });

    this.finishDraw();
  }

  draw() {}
  finishDraw() {
    this.ctx.translate(this.position.x + this.origin.x, this.position.y + this.origin.y);
    this.ctx.rotate(-this.rotation);
    this.ctx.scale(1/this.scale.x, 1/this.scale.y);
    this.ctx.translate(-this.position.x - this.origin.x, -this.position.y - this.origin.y);

    this.ctx.filter = this.oldFilters;
  }

  addChild(node) {
    if (!this.children.includes(node) && !node.parent && this.parent != node) {
      this.children.push(node);
      node.parent = this;
      node.ctx = node.parent.ctx;
    } else throw new Error('Invalid parent/child assignment');
  }

  removeChild(node) {
    const index = this.children.indexOf(node);
    if (index == -1) return false;
    this.children.splice(index, 1);
    node.parent = null;
    node.ctx = null;
    return true;
  }

  setPosition(obj) {
    this.position = Victor.fromObject(obj);
  }

  setCtx(ctx) {
    this.ctx = ctx;
    this.children.forEach(child => {
      child.setCtx(ctx);
    });
  }
}

module.exports = Node;
