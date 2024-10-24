// Timer Module
export class Timer {
  constructor() {
    this.minutes = WORK_TIME;
    this.seconds = 0;
    this.isBreak = false;
    this.running = false;
    this.timerInterval = null;
  }

  decrement() {
    if (this.seconds === 0) {
      if (this.minutes === 0) {
        this.switchMode();
        this.start();
      } else {
        this.minutes--;
        this.seconds = 59;
      }
    } else {
      this.seconds--;
    }
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.timerInterval = setInterval(() => this.decrement(), 1000);
    }
  }

  stop() {
    clearInterval(this.timerInterval);
    this.running = false;
  }

  switchMode() {
    this.stop();
    this.isBreak = !this.isBreak;
    this.minutes = this.isBreak ? BREAK_TIME : WORK_TIME;
  }

  getState() {
    return {
      minutes: this.minutes,
      seconds: this.seconds,
      isBreak: this.isBreak,
      running: this.running,
    };
  }
  randomizeState() {
    this.isBreak = Math.random() > 0.5;
    this.minutes = this.isBreak
      ? Math.floor(Math.random() * BREAK_TIME)
      : Math.floor(Math.random() * WORK_TIME);
    this.seconds = Math.floor(Math.random() * 60);
    this.running = false;
  }
}
