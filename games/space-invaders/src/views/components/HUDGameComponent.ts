import { Container, Graphics, Text } from "pixi.js";

import { GameModel } from "./../../models/GameModel";
import { AtlasKeys } from "./../../utils/AtlasKeys";
import { Colors } from "./../../utils/Colors";
import { MagicValues } from "./../../utils/MagicValues";
import { PixiFactory } from "./../../utils/PixiFactory";
import { Texts } from "./../../utils/Texts";
import { ViewPortSize } from "./../../utils/ViewPortSize";
import { CustomButton } from "./CustomButton";
import { LivesComponent } from "./LivesComponent";

export class HUDGameComponent extends Container {
    private _pauseButton: CustomButton;
    public get pauseButton(): CustomButton {
        return this._pauseButton;
    }

    private _hiScoreText: Text;
    private _levelText: Text;
    private _scoreText: Text;

    private _livesComponent: LivesComponent;

    public constructor() {
        super();

        this.createBackgrounds();
        this.createTextFields();
        this.createButtons();
        this.createComponents();
    }
    public updateData(model: GameModel): void {
        this._livesComponent.updateLives(model.lives);
        this._scoreText.text = String(model.score);
        this._hiScoreText.text = String(model.hiScore);
        this._levelText.text = String(model.level);
    }
    private createBackgrounds(): void {
        this.addChild(PixiFactory.getColorBox(ViewPortSize.MAX_WIDTH, 70, Colors.BACKGROUND_DARK));

        const bottomBackground: Graphics = PixiFactory.getColorBox(ViewPortSize.MAX_WIDTH, 100, Colors.BACKGROUND_DARK);
        bottomBackground.y = ViewPortSize.MAX_HEIGHT - 80;
        this.addChild(bottomBackground);
    }
    private createTextFields(): void {
        const scoreLabel: Text = PixiFactory.getText(Texts.SCORE, Colors.STATIC_TEXT, Texts.FONT_SIZE_HUD);
        scoreLabel.x = MagicValues.BORDER_OFFSET;
        scoreLabel.y = MagicValues.BORDER_OFFSET;
        this.addChild(scoreLabel);

        this._scoreText = PixiFactory.getText("0", Colors.DYNAMIC_TEXT, Texts.FONT_SIZE_HUD);
        this._scoreText.x = ViewPortSize.MAX_WIDTH - MagicValues.BORDER_OFFSET - 46;
        this._scoreText.y = scoreLabel.y;
        this._scoreText.anchor.x = 1;
        this.addChild(this._scoreText);

        const hiScoreLabel: Text = PixiFactory.getText(Texts.HI_SCORE, Colors.STATIC_TEXT, Texts.FONT_SIZE_HUD);
        hiScoreLabel.x = MagicValues.BORDER_OFFSET;
        hiScoreLabel.y = this._scoreText.y + 18;
        this.addChild(hiScoreLabel);

        this._hiScoreText = PixiFactory.getText("0", Colors.DYNAMIC_TEXT, Texts.FONT_SIZE_HUD);
        this._hiScoreText.x = ViewPortSize.MAX_WIDTH - MagicValues.BORDER_OFFSET - 46;
        this._hiScoreText.y = hiScoreLabel.y;
        this._hiScoreText.anchor.x = 1;
        this.addChild(this._hiScoreText);

        const levelLabel: Text = PixiFactory.getText(Texts.LEVEL, Colors.STATIC_TEXT, Texts.FONT_SIZE_HUD);
        levelLabel.x = ViewPortSize.MAX_WIDTH - MagicValues.BORDER_OFFSET - 80;
        levelLabel.y = ViewPortSize.MAX_HEIGHT - 70;
        this.addChild(levelLabel);

        this._levelText = PixiFactory.getText("0", Colors.DYNAMIC_TEXT, Texts.FONT_SIZE_HUD);
        this._levelText.x = levelLabel.x + 80;
        this._levelText.y = levelLabel.y;
        this._levelText.anchor.x = 1;
        this.addChild(this._levelText);
    }
    private createButtons(): void {
        this._pauseButton = PixiFactory.getButton(AtlasKeys.BUTTON_PAUSE);
        this._pauseButton.x = ViewPortSize.MAX_WIDTH - 32;
        this._pauseButton.y = MagicValues.BORDER_OFFSET + 15;
        this.addChild(this._pauseButton);
    }
    private createComponents(): void {
        this._livesComponent = new LivesComponent();
        this._livesComponent.x = MagicValues.BORDER_OFFSET;
        this._livesComponent.y = ViewPortSize.MAX_HEIGHT - 70;
        this.addChild(this._livesComponent);
    }
}
