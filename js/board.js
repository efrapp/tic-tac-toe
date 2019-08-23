const Board = () => {
  const gameBoard = [[null, null, null], [null, null, null], [null, null, null]];

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

  const createGraphicGrid = (scene) => {
    const grid = scene.add.container(0, 0);

    grid.add(scene.add.image(scene.game.config.width / 2 - 128, scene.game.config.height / 2 - 140, 'cell'));
    grid.add(scene.add.image(scene.game.config.width / 2, scene.game.config.height / 2 - 140, 'cell'));
    grid.add(scene.add.image(window.innerWidth / 2 + 128, scene.game.config.height / 2 - 140, 'cell'));

    grid.add(scene.add.image(scene.game.config.width / 2 - 128, scene.game.config.height / 2, 'cell'));
    grid.add(scene.add.image(scene.game.config.width / 2, scene.game.config.height / 2, 'cell'));
    grid.add(scene.add.image(scene.game.config.width / 2 + 128, scene.game.config.height / 2, 'cell'));

    grid.add(scene.add.image(scene.game.config.width / 2 - 128, scene.game.config.height / 2 + 140, 'cell'));
    grid.add(scene.add.image(scene.game.config.width / 2, scene.game.config.height / 2 + 140, 'cell'));
    grid.add(scene.add.image(scene.game.config.width / 2 + 128, scene.game.config.height / 2 + 140, 'cell'));

    grid.iterate((cell) => {
      cell.setInteractive();
      cell.on('clicked', scene.addCoin, scene);
    });

    scene.input.on('gameobjectdown', (pointer, gameObject) => {
      gameObject.emit('clicked', gameObject);
    }, scene);
  };

  return {
    get,
    update,
    createGraphicGrid,
  };
};

export default Board;
