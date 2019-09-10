// eslint-disable-next-line no-undef
export default class Scene3 extends Phaser.Scene {
  constructor() {
    super('end');
  }

  preload() {
    this.load.image('bg', 'assets/images/bg_autumn_forest_1.png');
    this.load.audio('end_sound', 'assets/sound/end_game.mp3');
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, this.game.config.width, 768, 'bg').setAlpha(0.5);
    this.bg.setOrigin(0, 0);
    this.bg.setScrollFactor(0);

    let finalMessage = '';

    if (this.game.inspectStatus(this.game.board.get()) === this.game.status.win()) {
      finalMessage = `You win ${this.game.currentPlayer.getName()}!`;
    } else {
      finalMessage = 'This is a draw!';
    }

    const statusMsg = this.add.text(0, 0, finalMessage, {
      font: '60px Arial',
      fill: '#F7CA18',
    });

    const playAgain = this.add.text(0, 0, 'Play Again?', {
      font: '50px Arial',
      fill: '#F7CA18',
    });

    const quitGame = this.add.text(0, 0, 'Quit Game', {
      font: '30px Arial',
      fill: '#F7CA18',
    });

    const endSoundConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };

    statusMsg.setPosition(this.game.config.width / 2 - statusMsg.width / 2,
      this.game.config.height / 2 - 100);

    this.endSound = this.sound.add('end_sound');

    this.endSound.play(endSoundConfig);

    playAgain.setPosition(this.game.config.width / 2 - playAgain.width / 2,
      this.game.config.height / 2 + 20);

    playAgain.setBackgroundColor('#66380F');
    playAgain.setPadding(20, 20, 20, 20);

    playAgain.setInteractive();
    playAgain.on('pointerdown', () => {
      this.game.board.reset();
      this.game.currentPlayer = this.game.player1;
      this.endSound.stop();
      this.scene.stop();
      this.scene.launch('playGame');
    });

    quitGame.setPosition(this.game.config.width / 2 - quitGame.width / 2,
      this.game.config.height / 2 + 150);

    quitGame.setBackgroundColor('#66380F');
    quitGame.setPadding(10, 10, 10, 10);

    quitGame.setInteractive();
    quitGame.on('pointerdown', () => {
      this.game.board.reset();
      this.game.currentPlayer = this.game.player1;
      this.endSound.stop();
      this.scene.stop();
      this.scene.launch('intro');
    });
  }

  update() {
    this.bg.tilePositionX -= 0.5;
  }
}
