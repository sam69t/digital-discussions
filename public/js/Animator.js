class Animator {
  constructor() {
    this.emitter = new EventEmitter();
  }

  start() {
    this.update();
  }

  //   stop() {}

  update() {
    this.emitter.emitEvent("frame");
    requestAnimationFrame(this.update.bind(this));
  }

  on() {
    return this.emitter.on.apply(this.emitter, arguments);
  }

  off() {
    return this.emitter.off.apply(this.emitter, arguments);
  }
}
