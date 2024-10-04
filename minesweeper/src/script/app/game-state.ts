export class GameState {
    private static instance: GameState | null = null;
    public steps: number = 0;
    public time: number = 0;
    public flags: number = 0;

    public static getInstance(): GameState {
        if (this.instance === null) {
            this.instance = new GameState();
        }
        return this.instance;
    }

    reset() {
        this.time = 0;
        this.flags = 0;
        this.steps = 0;
    }
}