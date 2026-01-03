export default class Character {
  constructor(board, position) {
    this.board = board;
    this.ctx = board.ctx;
    this.cellSize = board.cellSize;
    this.position = { ...position };
    this.startPosition = { ...position };
  }

  clear() {
    const { j, i } = this.position;
    const x = j * this.cellSize;
    const y = i * this.cellSize;
    this.ctx.clearRect(x, y, this.cellSize, this.cellSize);
    this.board.drawEmptyCell(j, i);
  }

  reset() {
    this.clear();
    this.position = { ...this.startPosition };
    this.draw();
  }
}