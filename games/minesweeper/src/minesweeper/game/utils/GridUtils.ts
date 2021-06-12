import { Cell } from "./../models/Cell";
import { GridData } from "./../models/GridData";

export class GridUtils {
    public static getNeighbors(grid: GridData, cell: Cell): Cell[] {
        const positions: Array<{ col; row }> = [
            { col: cell.col - 1, row: cell.row - 1 },
            { col: cell.col, row: cell.row - 1 },
            { col: cell.col + 1, row: cell.row - 1 },

            { col: cell.col - 1, row: cell.row },
            { col: cell.col + 1, row: cell.row },

            { col: cell.col - 1, row: cell.row + 1 },
            { col: cell.col, row: cell.row + 1 },
            { col: cell.col + 1, row: cell.row + 1 }
        ];
        const list: Cell[] = new Array<Cell>();
        for (let i = 0; i < positions.length; i++) {
            const nCell: Cell = grid.getCell(positions[i].col, positions[i].row);
            if (nCell !== undefined) {
                list.push(nCell);
            }
        }
        return list;
    }
}
