function preload() {
  this.load.multiatlas('tictactoescene', 'assets/images/tic_tac_toe_ss.json', 'assets/images');
  this.load.image('bg', 'assets/images/bg_autumn_forest_1.png');
  this.load.image('cell', 'assets/images/cell.png');
}

function create() {
  // set background
  // this.bg = this.add.sprite(0, 0, 'tictactoescene', 'bg_autumn_forest_1.png');
  this.bg = this.add.tileSprite(0, 0, window.innerWidth, 768, 'bg');
  this.bg.setOrigin(0, 0);
  this.bg.setScrollFactor(0);
  // console.log(this.bg);

  // Set board
  setBoard.call(this);
}

function update() {
  // Uncomment this line to animate the background
  this.bg.tilePositionX -= 0.5;
}

function setBoard() {
  this.add.image(window.innerWidth / 2 - 128, window.innerHeight / 2 - 140, 'cell');
  this.add.image(window.innerWidth / 2, window.innerHeight / 2 - 140, 'cell');
  this.add.image(window.innerWidth / 2 + 128, window.innerHeight / 2 - 140, 'cell');
    
  this.add.image(window.innerWidth / 2 - 128, window.innerHeight / 2, 'cell');
  this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'cell');
  this.add.image(window.innerWidth / 2 + 128, window.innerHeight / 2, 'cell');

  this.add.image(window.innerWidth / 2 - 128, window.innerHeight / 2 + 140, 'cell');
  this.add.image(window.innerWidth / 2, window.innerHeight / 2 + 140, 'cell');
  this.add.image(window.innerWidth / 2 + 128, window.innerHeight / 2 + 140, 'cell');
}

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: { preload, create, update },
};

const game = new Phaser.Game(config);
