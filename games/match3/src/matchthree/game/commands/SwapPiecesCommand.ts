import { ICommand, inject, injectable } from "@robotlegsjs/core";

import { GameEvent } from "./../../events/GameEvent";
import { GameManager } from "./../managers/GameManager";
import { SwapModel } from "./../models/SwapModel";
import { TouchPhase } from "./../models/TouchPhase";

@injectable()
export class SwapPiecesCommand implements ICommand {
    @inject(SwapModel)
    private _swapModel: SwapModel;

    @inject(GameManager)
    private _gameManager: GameManager;

    @inject(GameEvent)
    private _gameEvent: GameEvent;

    public execute(): void {
        this._swapModel.status = SwapModel.WAIT;
        this._swapModel.setPosition(
            this._gameEvent.extra.phase,
            this._gameEvent.extra.col,
            this._gameEvent.extra.row
        );

        if (this._gameEvent.extra.phase === TouchPhase.ENDED) {
            this._swapModel.status = SwapModel.SWAP;
            this._gameManager.nextStep.bind(this)();
        }
    }
}
