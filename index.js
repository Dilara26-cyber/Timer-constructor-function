const start_btn = document.querySelector('#start');
const pause_btn = document.querySelector('#pause');
const reset_btn = document.querySelector('#reset');
const input_duration = document.querySelector('#duration');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration;
const my_timer = new Timer(start_btn, pause_btn, input_duration, reset_btn, {
  on_start(total_duration) {
    duration = total_duration;
  },
  on_tick(time_remaining) {
    circle.setAttribute(
      'stroke-dashoffset',
      (perimeter * time_remaining) / duration - perimeter
    );
  },
  on_complete() {
    console.log('Completed.');
  },
  on_reset() {
    circle.setAttribute('stroke-dasharray', perimeter);
    circle.setAttribute('stroke-dashoffset', 0);
  },
});
