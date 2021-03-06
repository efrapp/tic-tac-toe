import Coin from './coin.js';

export default class Scene2 extends Phaser.Scene {
  constructor() {
    super('playGame');
  }

  preload() {
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

    this.music.play(bgSoundConfig);
    this.createGraphicGrid();

    this.playerTurn = this.add.text(20, 20, `Your turn: ${this.game.currentPlayer.getName()}`, {
      font: '30px Arial',
      fill: 'brown',
    });
  }

  update() {
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

      // Get parent container of the clicked cell to know the position of it inside the container
      logicBoard = this.game.board.update(cellObj.parentContainer.getIndex(cellObj),
        this.game.player1.getMark());
    } else {
      const sCoin = Coin({
        scene: this,
        x: cellObj.x,
        y: cellObj.y,
      });

      sCoin
        .animate('silver_coin')
        .sound('coins_sound');

      // Get parent container of the clicked cell to know the position of it inside the container
      logicBoard = this.game.board.update(cellObj.parentContainer.getIndex(cellObj),
        this.game.player2.getMark());
    }

    cellObj.off('clicked', this.addCoin);
    cellObj.input.enabled = false;

    if (this.game.inspectStatus(logicBoard) === this.game.status.win()) {
      this.endGame();
    } else if (this.game.inspectStatus(logicBoard) === this.game.status.draw()) {
      this.endGame();
    } else {
      if (this.game.currentPlayer === this.game.player1) {
        this.game.currentPlayer = this.game.player2;
      } else {
        this.game.currentPlayer = this.game.player1;
      }
      this.playerTurn.setText(`Your turn: ${this.game.currentPlayer.getName()}`);
    }
  }

  createGraphicGrid() {
    const grid = this.add.container(0, 0);

    grid.add(this.add.image(this.game.config.width / 2 - 128, this.game.config.height / 2 - 140, 'cell'));
    grid.add(this.add.image(this.game.config.width / 2, this.game.config.height / 2 - 140, 'cell'));
    grid.add(this.add.image(this.game.config.width / 2 + 128, this.game.config.height / 2 - 140, 'cell'));

    grid.add(this.add.image(this.game.config.width / 2 - 128, this.game.config.height / 2, 'cell'));
    grid.add(this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'cell'));
    grid.add(this.add.image(this.game.config.width / 2 + 128, this.game.config.height / 2, 'cell'));

    grid.add(this.add.image(this.game.config.width / 2 - 128, this.game.config.height / 2 + 140, 'cell'));
    grid.add(this.add.image(this.game.config.width / 2, this.game.config.height / 2 + 140, 'cell'));
    grid.add(this.add.image(this.game.config.width / 2 + 128, this.game.config.height / 2 + 140, 'cell'));

    grid.iterate((cell) => {
      cell.setInteractive();
      cell.on('clicked', this.addCoin, this);
    });

    this.input.on('gameobjectdown', (pointer, gameObject) => {
      gameObject.emit('clicked', gameObject);
    }, this);
  }

  endGame() {
    this.music.stop();
    this.scene.stop();
    this.scene.launch('end');
  }
}
