class PomodoroTimer {
    constructor() {
        this.timer = null;
        this.minutes = 25;
        this.seconds = 0;
        this.isRunning = false;
        this.isBreak = false;
        this.counter = 0;
    }

    startTimer() {
        if (!this.isRunning) {
            this.isRunning = true;
            document.getElementById("start-button").innerHTML = "Pause";
            document.getElementById("reset-button").disabled = false;
            this.timer = setInterval(() => this.updateTimer(), 1000);
        } else {
            this.isRunning = false;
            document.getElementById("start-button").innerHTML = "Resume";
            clearInterval(this.timer);
        }
    }

    resetTimer() {
        clearInterval(this.timer);
        this.isRunning = false;
        document.getElementById("start-button").innerHTML = "Start";
        document.getElementById("reset-button").disabled = true;
        this.minutes = 25;
        this.seconds = 0;
        this.isBreak = false;
        this.updateTimerDisplay();
    }

    updateTimer() {
        if (this.seconds > 0) {
            this.seconds--;
        } else if (this.minutes > 0) {
            this.minutes--;
            this.seconds = 59;
        } else {
            clearInterval(this.timer);
            this.isRunning = false;
            document.getElementById("start-button").innerHTML = "Start";
            document.getElementById("reset-button").disabled = true;

            if (!this.isBreak) {
                this.minutes = 5;
                this.isBreak = true;
            } else {
                this.minutes = 25;
                this.isBreak = false;
                this.counter++;
                this.updateSessionCounter();
            }
        }

        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const minutes = this.formatTime(this.minutes);
        const seconds = this.formatTime(this.seconds);
        document.getElementById("time").innerHTML = `${minutes}:${seconds}`;
    }

    updateSessionCounter() {
        const sessionCounter = document.getElementById("session-counter");
        sessionCounter.innerHTML = `Completed Pomodoros: ${this.counter}`;
    }

    formatTime(time) {
        return time < 10 ? "0" + time : time;
    }
}

const pomodoroTimer = new PomodoroTimer();
