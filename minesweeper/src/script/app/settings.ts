export enum DifficultLevel {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
}

export enum BombsCount {
    Easy = 10,
    Medium = 42,
    Hard = 99,
}

export const DEFAULT_BOMBS_COUNT = {
    [DifficultLevel.Easy]: 10,
    [DifficultLevel.Medium]: 42,
    [DifficultLevel.Hard]: 99,
};

export const PLAYING_FIELD_SIZE = {
    [DifficultLevel.Easy]: 10,
    [DifficultLevel.Medium]: 15,
    [DifficultLevel.Hard]: 25,
};

export enum ThemeColor {
    Light = 'Light',
    Dark = 'Dark',
}

export class Settings {
    private static instance: Settings | null = null;
    public difficult: DifficultLevel;
    public bombsCount: number;
    public themeColor: ThemeColor;
    public isSound: boolean;
    public playingFieldSize: number;

    private constructor(difficult: DifficultLevel, themeColor: ThemeColor, isSound: boolean, bombsCount?: number) {
        this.difficult = difficult;
        this.bombsCount = bombsCount ?? DEFAULT_BOMBS_COUNT[difficult];
        this.playingFieldSize = PLAYING_FIELD_SIZE[difficult];
        this.themeColor = themeColor;
        this.isSound = isSound;
    }

    public static getInstance(difficult: DifficultLevel, themeColor: ThemeColor, isSound: boolean, bombsCount?: number) {
        if (this.instance === null) {
            this.instance = new Settings(difficult, themeColor, isSound, bombsCount);
        }
        return this.instance;
    }

    changeDifficult(difficult: DifficultLevel) {
        this.difficult = difficult;
        this.bombsCount = DEFAULT_BOMBS_COUNT[difficult];
        this.playingFieldSize = PLAYING_FIELD_SIZE[difficult];
    }

    changeTheme() {
        if (this.themeColor === ThemeColor.Light) {
            this.themeColor = ThemeColor.Dark;
        } else {
            this.themeColor = ThemeColor.Light;
        }
    }
}