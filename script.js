// Timer Class
class PomodoroTimer {
    constructor() {
        this.timer = null; // Timer reference
        this.minutes = 0; // Initial minutes
        this.seconds = 2; // Initial seconds
        this.isRunning = false; // Timer running flag
        this.isBreak = false; // Break mode flag
        this.counter = 0; // Completed pomodoros counter
    }

    // Start or pause the timer
    startTimer() {
        if (!this.isRunning) {
            // Start the timer
            this.isRunning = true;
            document.getElementById("start-button").innerHTML = "Pause";
            document.getElementById("reset-button").disabled = false;
            this.timer = setInterval(() => this.updateTimer(), 1000);
        } else {
            // Pause the timer
            this.isRunning = false;
            document.getElementById("start-button").innerHTML = "Resume";
            clearInterval(this.timer);
        }
    }

    // Reset the timer
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

    // Update the timer
    updateTimer() {
        if (this.seconds > 0) {
            // Decrease seconds
            this.seconds--;
        } else if (this.minutes > 0) {
            // Decrease minutes and reset seconds
            this.minutes--;
            this.seconds = 59;
        } else {
            // Timer completed
            clearInterval(this.timer);
            this.isRunning = false;
            document.getElementById("start-button").innerHTML = "Start";
            document.getElementById("reset-button").disabled = true;
            this.counter++;
            this.updateSessionCounter();
            this.playAlarmSound();
            this.showNotification();

            if (!this.isBreak) {
                // Start break
                this.minutes = 5;
                this.isBreak = true;
            } else {
                // Start next pomodoro session
                this.minutes = 25;
                this.isBreak = false;
            }
        }

        this.updateTimerDisplay();
    }

    // Update the timer display
    updateTimerDisplay() {
        const minutes = this.formatTime(this.minutes);
        const seconds = this.formatTime(this.seconds);
        document.getElementById("time").innerHTML = `${minutes}:${seconds}`;
    }

    // Update the session counter
    updateSessionCounter() {
        const sessionCounter = document.getElementById("session-counter");
        sessionCounter.innerHTML = `Completed Pomodoros: ${this.counter}`;
    }

    // Format time with leading zero
    formatTime(time) {
        return time < 10 ? "0" + time : time;
    }

    // Play alarm sound
    playAlarmSound() {
        const audio = new Audio("alarm.wav");
        audio.play();
    }

    // Show browser notification
    showNotification() {
        if (Notification.permission === "granted") {
            new Notification("Pomodoro Timer", {
                body: "Pomodoro session completed!",
                icon: "tomato.png",
            });
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    new Notification("Pomodoro Timer", {
                        body: "Pomodoro session completed!",
                        icon: "tomato.png",
                    });
                }
            });
        }
    }
}

// Create Pomodoro Timer instance
const pomodoroTimer = new PomodoroTimer();

document.getElementById("start-button").addEventListener("click", () => {
    pomodoroTimer.startTimer();
});

document.getElementById("reset-button").addEventListener("click", () => {
    pomodoroTimer.resetTimer();
});

document.getElementById("mode-toggle-button").addEventListener("click", () => {
    const body = document.querySelector("body");
    body.classList.toggle("dark-mode");
});
