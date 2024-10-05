export type StateKeys = 'time' | 'steps' | 'difficult' | 'bombs';

export class State {
    public time: string;
    public steps: number;
    public difficult: string;
    public bombs: number;

    constructor(time: string, steps: number, difficult: string, bombs: number) {
        this.time = time.split(' ')[1];
        this.steps = steps;
        this.difficult = difficult;
        this.bombs = bombs;
    }

    getProperty(key: StateKeys): string | number {
        return this[key];
    }
}
