import { assert } from "chai";
import "../../../entry";
import { GridData } from "./../../../../src/matchthree/game/models/GridData";
import { PieceData } from "./../../../../src/matchthree/game/models/PieceData";
import { PieceIds } from "./../../../../src/matchthree/game/utils/PieceIds";
import { PieceType } from "./../../../../src/matchthree/game/utils/PieceType";
import { PieceUtils } from "./../../../../src/matchthree/game/utils/PieceUtils";
import { PowerUpUtils } from "./../../../../src/matchthree/game/utils/PowerUpUtils";

describe("PowerUpUtils", () => {
    let result: PieceData[];
    let pieces: PieceData[];
    let grid: GridData;

    beforeEach(() => {
        result = [];
        pieces = [];
        grid = new GridData(5, 5);
    });

    afterEach(() => {
        result = null;
        pieces = null;
        grid = null;
    });

    it("GetPiecesAffectedByPowerUp: the Piece affected is a PowerUpRow", () => {
        let piece: PieceData;
        const row = 0;
        let isSameRow = true;
        for (let col = 0; col < grid.maxCols; col++) {
            piece = PieceUtils.getNewNormalPiece(col, row);
            pieces.push(piece);
            grid.setPiece(piece);
        }

        const removePiece: PieceData = PieceUtils.getNewPowerUpPiece(
            0,
            0,
            PieceType.ROW,
            PieceIds.BLUE
        );
        result = PowerUpUtils.getPiecesAffectedByPowerUp(removePiece, grid);

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < result.length; i++) {
            piece = result[i];
            isSameRow = isSameRow && piece.row === row;
        }

        assert.equal(grid.maxRows, result.length);
        assert.isTrue(isSameRow);
    });

    it("GetPiecesAffectedByPowerUp: the Piece affected is a PowerUpCol", () => {
        let piece: PieceData;
        const col = 0;
        let isSameCol = true;
        for (let row = 0; row < grid.maxCols; row++) {
            piece = PieceUtils.getNewNormalPiece(col, row);
            pieces.push(piece);
            grid.setPiece(piece);
        }

        const removePiece: PieceData = PieceUtils.getNewPowerUpPiece(
            0,
            0,
            PieceType.COL,
            PieceIds.BLUE
        );
        result = PowerUpUtils.getPiecesAffectedByPowerUp(removePiece, grid);

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < result.length; i++) {
            piece = result[i];
            isSameCol = isSameCol && piece.col === col;
        }

        assert.equal(grid.maxCols, result.length);
        assert.isTrue(isSameCol);
    });

    it("GetPiecesAffectedByPowerUp: the Piece affected is a PowerUpRainbow", () => {
        let piece: PieceData;
        let col = 0;
        let row = 0;
        let isInPieces = true;
        for (let i = 0; i < grid.maxCols; i++) {
            // ROW
            row = 3;
            col = i;
            piece = PieceUtils.getNewNormalPiece(col, row);
            pieces.push(piece);
            grid.setPiece(piece);

            // COL
            row = i;
            col = 3;
            piece = PieceUtils.getNewNormalPiece(col, row);
            pieces.push(piece);
            grid.setPiece(piece);
        }

        const removePiece: PieceData = PieceUtils.getNewPowerUpPiece(
            3,
            3,
            PieceType.RAINBOW,
            PieceIds.RAINBOW
        );
        result = PowerUpUtils.getPiecesAffectedByPowerUp(removePiece, grid);

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < result.length; i++) {
            piece = result[i];
            isInPieces = isInPieces && pieces.indexOf(piece) !== -1;
        }

        assert.equal(pieces.length, result.length);
        assert.isTrue(isInPieces);
    });

    it("GetPiecesAffectedByPowerUp: the Piece affected is a PowerUpRainbow with a PiecedId from another piece", () => {
        let piece: PieceData;
        let col = 0;
        let row = 0;
        let isInPieces = true;

        for (let i = 0; i < 10; i++) {
            do {
                row = Math.floor(Math.random() * grid.maxRows);
                col = Math.floor(Math.random() * grid.maxCols);
            } while (grid.getPiece(col, row).pieceType !== PieceType.EMPTY);

            piece = PieceUtils.getNewNormalPiece(col, row, PieceIds.GREEN);
            pieces.push(piece);
            grid.setPiece(piece);
        }

        const removePiece: PieceData = PieceUtils.getNewPowerUpPiece(
            0,
            0,
            PieceType.RAINBOW,
            PieceIds.GREEN
        );
        result = PowerUpUtils.getPiecesAffectedByPowerUp(removePiece, grid);

        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < result.length; i++) {
            piece = result[i];
            isInPieces = isInPieces && pieces.indexOf(piece) !== -1;
        }

        assert.equal(pieces.length, result.length);
        assert.isTrue(isInPieces);
    });
});
