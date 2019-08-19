// eslint-disable-next-line import/extensions
import Coin from './coin.js';

function preload() {
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

function create() {
  // set background
  // this.bg = this.add.sprite(0, 0, 'tictactoescene', 'bg_autumn_forest_1.png');
  this.bg = this.add.tileSprite(0, 0, window.innerWidth, 768, 'bg');
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

  setBoard.call(this);
}

function update() {
  // Uncomment this line to animate the background
  this.bg.tilePositionX -= 0.5;
}

function setBoard() {
  const cell1 = this.add.image(window.innerWidth / 2 - 128, window.innerHeight / 2 - 140, 'cell');
  const cell2 = this.add.image(window.innerWidth / 2, window.innerHeight / 2 - 140, 'cell');
  this.add.image(window.innerWidth / 2 + 128, window.innerHeight / 2 - 140, 'cell');

  this.add.image(window.innerWidth / 2 - 128, window.innerHeight / 2, 'cell');
  this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'cell');
  this.add.image(window.innerWidth / 2 + 128, window.innerHeight / 2, 'cell');

  this.add.image(window.innerWidth / 2 - 128, window.innerHeight / 2 + 140, 'cell');
  this.add.image(window.innerWidth / 2, window.innerHeight / 2 + 140, 'cell');
  this.add.image(window.innerWidth / 2 + 128, window.innerHeight / 2 + 140, 'cell');

  cell1.setInteractive();
  cell2.setInteractive();

  cell1.on('clicked', addCoin, this);
  cell2.on('clicked', addCoin, this);

  this.input.on('gameobjectdown', (pointer, gameObject) => {
    gameObject.emit('clicked', gameObject);
  }, this);
}

function addCoin(cell) {
  this.cellObj = cell;
  Coin({
    scene: this,
    x: this.cellObj.x,
    y: this.cellObj.y,
    type: 'gold_coin',
  });
  if (Math.random() > 0.5) {
    getCoin.call(this, 'gold_coin');
  } else {
    getCoin.call(this, 'silver_coin');
  }

  this.cellObj.off('clicked', addCoin);
  this.cellObj.input.enabled = false;
}

function getCoin(coinType) {
  this.coin = this.add.sprite(this.cellObj.x, this.cellObj.y, coinType);
  this.anims.create({
    key: `${coinType}_anim`,
    frames: this.anims.generateFrameNumbers(coinType),
    frameRate: 20,
    repeat: 2,
  });

  this.coinsSound = this.sound.add('coins_sound');

  this.coin.play(`${coinType}_anim`);
  this.coinsSound.play();
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: { preload, create, update },
};

const game = new Phaser.Game(config);
