import { ICommand, inject, injectable } from "@robotlegsjs/core";
import { FlowService } from "../../services/FlowService";
import { GameService } from "../../services/GameService";
import { LevelModel } from "../models/LevelModel";
import { LevelsRepository } from "../utils/LevelRepository";
import { ScoreUtils } from "../utils/ScoreUtils";

@injectable()
export class GameOverCommand implements ICommand {
    @inject(LevelModel)
    private _levelModel: LevelModel;

    @inject(GameService)
    private _gameService: GameService;

    @inject(FlowService)
    private _flowService: FlowService;

    @inject(LevelsRepository)
    private _levelsRepository: LevelsRepository;

    public execute(): void {
        this._gameService.pause();
        let hiScore = this._levelModel.levelInfo.hiScore;
        hiScore = Math.max(hiScore, this._levelModel.score);

        this._levelsRepository.updateHiScore(this._levelModel.levelId, hiScore);
        // SharedObjectManager.updateHighScore();

        const stars = ScoreUtils.getNumStars(
            this._levelModel.score,
            this._levelModel.levelInfo.scoreStarts
        );

        this._levelModel.numStars = stars;

        if (stars > 0) {
            this._flowService.showYouWinPopup();
        } else {
            this._flowService.showGameOverPopup();
        }
    }
}
