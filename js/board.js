const Board = () => {
  const gameBoard = [[null, null, null], [null, null, null], [null, null, null]];

  const get = () => gameBoard;
  const translateToXY = (pos) => {
    let coord = {};

    switch (pos) {
      case pos <= 3:
        coord = { x: 0, y: pos - 1 };
        break;
      case pos <= 6:
        coord = { x: 1, y: pos - gameBoard.length - 1 };
        break;
      case pos <= 9:
        coord = { x: 2, y: pos - gameBoard.length * 2 - 1 };
        break;
      default:
        console.log('Invalid position');
    }
    return coord;
  };
  const update = (pos, mark) => {
    const coord = translateToXY(pos);
    gameBoard[coord.x][coord.y] = mark;

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
