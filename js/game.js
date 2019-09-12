import Scene1 from './scene1.js';
import Scene2 from './scene2.js';
import Scene3 from './scene3.js';
import Board from './board.js';
import Player from './player.js';

const Game = (() => {
  const player1 = Player('Player1', 'X');
  const player2 = Player('Player2', 'O');
  const board = Board();

  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: true,
    dom: {
      createContainer: true,
    },
    scene: [Scene1, Scene2, Scene3],
  };

  const game = new Phaser.Game(config);

  const status = (() => {
    const win = () => 'win';
    const playing = () => 'playing';
    const draw = () => 'draw';

    return { win, playing, draw };
  })();

  // lb = logic board
  const inspectStatus = (lb) => {
    const lastPos = lb.length - 1;

    for (let i = 0; i <= lastPos; i += 1) {
      if (lb[i][0] === lb[i][1] && lb[i][1] === lb[i][2] && lb[i][2] !== null) {
        return status.win();
      }
      if (lb[0][i] === lb[1][i] && lb[1][i] === lb[2][i] && lb[2][i] !== null) {
        return status.win();
      }
    }

    if (lb[0][0] === lb[1][1] && lb[1][1] === lb[2][2] && lb[2][2] !== null) {
      return status.win();
    }
    if (lb[lastPos][0] === lb[lastPos - 1][1] && lb[lastPos - 1][1] === lb[lastPos - 2][2]
      && lb[lastPos - 2][2] != null) {
      return status.win();
    }
    if (!lb[0].includes(null) && !lb[1].includes(null) && !lb[2].includes(null)) {
      return status.draw();
    }

    return status.playing();
  };

  const init = () => {
    game.player1 = player1;
    game.player2 = player2;
    game.currentPlayer = player1;
    game.board = board;
    game.inspectStatus = inspectStatus;
    game.status = status;
  };

  return { init };
})();

Game.init();
