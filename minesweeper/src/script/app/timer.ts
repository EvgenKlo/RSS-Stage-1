export class Timer {
    private static instance: Timer | null = null;
    public seconds: number = 0;
    public minutes: number = 0;
    public timer: NodeJS.Timer | null = null;
    public component: HTMLElement;

    private constructor(component: HTMLElement) {
        this.component = component;
    }

    public static getInstance(component: HTMLElement) {
        if (this.instance === null) {
            this.instance = new Timer(component);
        }
        return this.instance;
    }

    public tick() {
        this.seconds++;
        if (this.seconds > 59 && this.minutes < 10) {
            this.minutes++;
            this.seconds = 0;
        } else if (this.minutes > 9 && this.seconds > 59) {
            this.minutes++;
            this.seconds = 0;
        }
        this.setTextInComponent();
        this.timer = setTimeout(() => {
            this.tick()
        }, 1000);
    }

    public stopTimer() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }

    public resetTimer() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = null;
        this.seconds = 0;
        this.minutes = 0;
        this.component.innerText = 'Timer: 00:00';
    }

    private setTextInComponent() {
        if (this.seconds < 10 && this.minutes < 10) {
            this.component.innerText = `Timer: 0${this.minutes}:0${this.seconds}`;
        } else if (this.seconds > 9 && this.seconds < 60 && this.minutes < 10) {
            this.component.innerText = `Timer: 0${this.minutes}:${this.seconds}`;
        } else if (this.seconds > 59 && this.minutes < 10) {
            if (this.minutes < 10) {
                this.component.innerText = `Timer: 0${this.minutes}:0${this.seconds}`;
            } else if (this.minutes > 9) {
                this.component.innerText = `Timer: ${this.minutes}:0${this.seconds}`;
            }
        } else if (this.minutes > 9 && this.seconds < 10) {
            this.component.innerText = `Timer: ${this.minutes}:0${this.seconds}`;
        } else if (this.minutes > 9 && this.seconds > 9 && this.seconds < 60) {
            this.component.innerText = `Timer: ${this.minutes}:${this.seconds}`;
        } else if (this.minutes > 9 && this.seconds > 59) {
            this.component.innerText = `Timer: ${this.minutes}:0${this.seconds}`;
        }
    }
}