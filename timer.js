class Timer {
  constructor(start_btn, pause_btn, input_duration, reset_btn, callbacks) {
    this.start_btn = start_btn;
    this.pause_btn = pause_btn;
    this.input_duration = input_duration;
    this.reset_btn = reset_btn;
    if (callbacks) {
      this.on_start = callbacks.on_start;
      this.on_tick = callbacks.on_tick;
      this.on_complete = callbacks.on_complete;
      this.on_reset = callbacks.on_reset;
    }

    this.start_btn.addEventListener('click', this.start);
    this.pause_btn.addEventListener('click', this.pause);
    this.reset_btn.addEventListener('click', this.reset);
  }

  start = () => {
    if (this.on_start) {
      this.on_start(this.time_remaining);
    }
    this.tick();
    this.timer_starter = setInterval(this.tick, 20);
  };

  pause = () => {
    clearInterval(this.timer_starter);
  };

  tick = () => {
    if (this.time_remaining <= 0) {
      this.pause();
      if (this.on_complete) {
        this.on_complete();
      }
    } else {
      if (this.on_tick) {
        this.on_tick(this.time_remaining);
      }
      this.time_remaining = this.time_remaining - 0.02;
    }
  };
  reset = () => {
    if (this.on_reset) {
      clearInterval(this.timer_starter);
      this.on_reset();
    }
    this.time_remaining = 60;
  };

  get time_remaining() {
    return parseFloat(this.input_duration.value);
  }
  set time_remaining(time) {
    this.input_duration.value = time.toFixed(2);
  }
}
