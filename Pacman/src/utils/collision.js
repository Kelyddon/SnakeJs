export function checkCollision(entity1, entity2) {
  return entity1.position.i === entity2.position.i && 
         entity1.position.j === entity2.position.j;
}

export function isValidPosition(position, board) {
  return board.layout[position.i] && 
         board.layout[position.i][position.j] !== undefined;
}