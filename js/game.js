// eslint-disable-next-line import/extensions
import Scene1 from './scene1.js';
// eslint-disable-next-line import/extensions
import Scene2 from './scene2.js';
// eslint-disable-next-line import/extensions
import Board from './board.js';
// eslint-disable-next-line import/extensions
import Player from './player.js';

const Game = (() => {
  // const board = [];

  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    // backgroundColor: '#222288',
    dom: { createContainer: true },
    scene: [Scene2, Scene1],
  };

  return {
    init() {
      const game = new Phaser.Game(config);
      game.player1 = Player('Player1', 'X');
      game.player2 = Player('Player2', 'O');
      game.board = Board();
      // console.log(game.player1.getMark());
    },
  };
})();

Game.init();
// Game reponsabilities:
//  create board
//  update board
//  create two players
//  switch players
//  check winner or tie
