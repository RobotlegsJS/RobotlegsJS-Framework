import { Container } from "pixi.js";
import { SingleStar } from "./SingleStart";

export class StarDisplayComponent extends Container {
    private _stars: SingleStar[];

    public constructor() {
        super();
        this._createStarts();
    }

    public update(score: number, scoreStarts: number[]): void {
        let nextFrame: number;
        let scoreStarsPrevious = 0;
        let scoreIni: number;
        let scoreEnd: number;
        let star: SingleStar;

        for (let i = 0; i < scoreStarts.length; i++) {
            scoreIni = score - scoreStarsPrevious;
            scoreEnd = scoreStarts[i] - scoreStarsPrevious;
            star = this._stars[i];

            nextFrame = Math.min(Math.floor((scoreIni / scoreEnd) * 10), star.numFrames - 1);
            nextFrame = Math.max(nextFrame, 0);

            star.currentFrame(nextFrame);
            scoreStarsPrevious = scoreStarts[i];
        }
    }

    private _createStarts(): void {
        this._stars = [];
        this._stars.push(this._createSingleStar(-36, -6));
        this._stars.push(this._createSingleStar(0, 0));
        this._stars.push(this._createSingleStar(36, -6));
    }

    private _createSingleStar(x: number, y: number): SingleStar {
        const star: SingleStar = new SingleStar();
        star.anchor.set(0.5);
        star.x = x;
        star.y = y;
        this.addChild(star);

        return star;
    }
}
