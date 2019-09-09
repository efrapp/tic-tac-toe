// eslint-disable-next-line import/extensions
import Scene1 from './scene1.js';
// eslint-disable-next-line import/extensions
import Scene2 from './scene2.js';
// eslint-disable-next-line import/extensions
import Scene3 from './scene3.js';
// eslint-disable-next-line import/extensions
import Board from './board.js';
// eslint-disable-next-line import/extensions
import Player from './player.js';

const Game = (() => {
  const config = {
    // eslint-disable-next-line no-undef
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: true,
    dom: {
      createContainer: true,
    },
    scene: [Scene1, Scene2, Scene3],
  };

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
    // eslint-disable-next-line no-undef
    const game = new Phaser.Game(config);
    game.player1 = Player('Player1', 'X');
    game.player2 = Player('Player2', 'O');
    game.currentPlayer = game.player1;
    game.board = Board();
    game.inspectStatus = inspectStatus;
    game.status = status;
  };

  return {
    init,
  };
})();

Game.init();
