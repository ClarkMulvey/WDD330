export class Game {
    
    constructor() {
        this.GameBoard = ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
        this.isXTurn = true
    }

    drawBoard() {
        return this.GameBoard.map(
            cell =>
            `<tr>
                <td>${cell[0]}</td>
                <td>${cell[1]}</td>
                <td>${cell[2]}</td>
            </tr>
            <tr>
                <td>${cell[3]}</td>
                <td>${cell[4]}</td>
                <td>${cell[5]}</td>
            </tr>
            <tr>
                <td>${cell[6]}</td>
                <td>${cell[7]}</td>
                <td>${cell[8]}</td>
            </tr>`
        ).join('');
    }
}