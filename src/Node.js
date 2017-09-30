
const EventEmitter = require('events');
const Victor = require('victor');

const Animation = require('./Animation');

class Node extends EventEmitter {
  constructor(opt) {
    super();
    this.parent = opt.parent || null;
    this.ctx = this.parent ? this.parent.ctx : null;
    this.position = opt.position ? new Victor.fromObject(opt.position) : new Victor(0, 0);
    this.scale = opt.scale ? new Victor.fromObject(opt.scale) : new Victor(1, 1);
    this.rotation = opt.rotation || 0; // Radians

    this.children = [];

    this.animations = [];
    this.waitingAnimations = [];
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
      this.runCondition(index + 1, conditions, animationRequests);
    };

    if (cur.time !== undefined) {
      setTimeout(cb, cur.time);
    }
    if (cur.event && cur.eventTarget) {
      cur.eventTarget.on(cur.event, cb);
    }
    /*if (cur.prop) {
      const value = typeof cur.value == 'object' ? cur.value[cur.valueProp] : cur.value;
      if (cur.propTarget[cur.prop] == cur.value)
    }*/
  }

  processAnimationRequest(animationRequests) {
    animationRequests.forEach(aniRequest => {
      this.animations.push(new Animation(this, aniRequest));
    });
  }

  update(delta) {
    this.animations.forEach(animation => {
      animation.update(delta);
    });

    this.draw();

    this.children.forEach(child => {
      child.update(delta);
    });

    this.finishDraw();
  }

  draw() {}

  finishDraw() {}

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
}

module.exports = Node;
