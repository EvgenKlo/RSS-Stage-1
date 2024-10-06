import checkCellAudio from "../../audio/check-cell.mp3";
import bah from "../../audio/bah.mp3";
import victoryAudio from "../../audio/victory.mp3";

const checkCell = new Audio(checkCellAudio);
const mineExplosion = new Audio(bah);
const victory = new Audio(victoryAudio);


export class Sound {
    private static instance: Sound | null = null;
    private mineExplosion = mineExplosion;
    private checkCell = checkCell;
    private victory = victory;
    private isSoundOn: boolean = true;

    private constructor() {
    }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new Sound();
        }
        return this.instance
    }

    public playMineExplosion() {
        if (this.isSoundOn) {
            this.mineExplosion.play();
        }
    }

    public playCheckCell() {
        if (this.isSoundOn) {
            this.checkCell.currentTime = 0;
            this.checkCell.play();
        }
    }

    public playVictory() {
        if (this.isSoundOn) {
            this.victory.play();
        }
    }

    public toggleIsSoundOn() {
        this.isSoundOn = !this.isSoundOn;
    }
}