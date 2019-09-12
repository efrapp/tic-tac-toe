const Board = () => {
  let gameBoard = [[null, null, null], [null, null, null], [null, null, null]];

  const get = () => gameBoard;
  const translateToXY = (p) => {
    let coord = {};
    const pos = p;

    switch (true) {
      case pos <= 2:
        coord = { x: 0, y: pos };
        break;
      case pos <= 5:
        coord = { x: 1, y: pos - gameBoard.length };
        break;
      case pos <= 9:
        coord = { x: 2, y: pos - gameBoard.length * 2 };
        break;
      default:
        coord = null;
    }
    return coord;
  };
  const update = (pos, mark) => {
    if (translateToXY(pos)) {
      const { x, y } = translateToXY(pos);
      gameBoard[x][y] = mark;
    }

    return gameBoard;
  };

  const reset = () => {
    gameBoard = [[null, null, null], [null, null, null], [null, null, null]];
  };

  return {
    get,
    update,
    reset,
  };
};

export default Board;
