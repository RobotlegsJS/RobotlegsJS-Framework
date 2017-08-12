import { Cell } from "./../models/Cell";
import { GridData } from "./../models/GridData";

export class GridUtils {

    public static getNeighbors(grid: GridData, cell: Cell): Array<Cell> {

        let positions: Array<{ col, row }> = [
            { col: cell.col - 1, row: cell.row - 1 },
            { col: cell.col, row: cell.row - 1 },
            { col: cell.col + 1, row: cell.row - 1 },

            { col: cell.col - 1, row: cell.row },
            { col: cell.col + 1, row: cell.row },

            { col: cell.col - 1, row: cell.row + 1 },
            { col: cell.col, row: cell.row + 1 },
            { col: cell.col + 1, row: cell.row + 1 },
        ];
        let list: Array<Cell> = new Array<Cell>();
        for (let i = 0; i < positions.length; i++) {
            let nCell: Cell = grid.getCell(positions[i].col, positions[i].row);
            if (nCell !== undefined) {
                list.push(nCell);
            }
        }
        return list;
    }
}
