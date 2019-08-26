// eslint-disable-next-line import/extensions
import Coin from './coin.js';

export default class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  preload() {
    // this.load.multiatlas('tictactoescene', 'assets/images/tic_tac_toe_ss.json', 'assets/images');
    this.load.image('bg', 'assets/images/bg_autumn_forest_1.png');
    this.load.image('cell', 'assets/images/cell.png');
    this.load.audio('bg_sound', 'assets/sound/bg_sound.mp3');
    this.load.audio('coins_sound', 'assets/sound/coins.mp3');
    this.load.spritesheet('gold_coin', 'assets/images/gold_coin.png', {
      frameWidth: 102,
      frameHeight: 102,
    });
    this.load.spritesheet('silver_coin', 'assets/images/silver_coin.png', {
      frameWidth: 102,
      frameHeight: 102,
    });
  }

  create() {
    // set background
    // this.bg = this.add.sprite(0, 0, 'tictactoescene', 'bg_autumn_forest_1.png');
    this.bg = this.add.tileSprite(0, 0, this.game.config.width, 768, 'bg');
    this.bg.setOrigin(0, 0);
    this.bg.setScrollFactor(0);

    this.music = this.sound.add('bg_sound');

    const bgSoundConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0,
    };

    // this.music.play(bgSoundConfig);
    this.game.board.createGraphicGrid(this);

    this.playerTurn = this.add.text(20, 20, `Your turn: ${this.game.currentPlayer.getName()}`, {
      font: '30px Arial',
      fill: 'brown',
    });
  }

  update() {
    // Uncomment this line to animate the background
    this.bg.tilePositionX -= 0.5;
  }

  addCoin(cell) {
    const cellObj = cell;
    let logicBoard = null;

    if (this.game.currentPlayer === this.game.player1) {
      const gCoin = Coin({
        scene: this,
        x: cellObj.x,
        y: cellObj.y,
      });

      gCoin
        .animate('gold_coin')
        .sound('coins_sound');

      logicBoard = this.game.board.update(
        // Get parent container of the clicked cell to know the position of it inside the container
        cellObj.parentContainer.getIndex(cellObj),
        this.game.player1.getMark(),
      );

      this.game.currentPlayer = this.game.player2;
    } else {
      const sCoin = Coin({
        scene: this,
        x: cellObj.x,
        y: cellObj.y,
      });

      sCoin
        .animate('silver_coin')
        .sound('coins_sound');

      logicBoard = this.game.board.update(
        // Get parent container of the clicked cell to know the position of it inside the container
        cellObj.parentContainer.getIndex(cellObj),
        this.game.player2.getMark(),
      );

      this.game.currentPlayer = this.game.player1;
    }

    cellObj.off('clicked', this.addCoin);
    cellObj.input.enabled = false;

    console.log(this.game.status(logicBoard));
    this.playerTurn.setText(`Your turn: ${this.game.currentPlayer.getName()}`);
  }
}
