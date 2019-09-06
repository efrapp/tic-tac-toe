export default class Scene1 extends Phaser.Scene {
  constructor() {
    super('intro');
  }

  preload() {
    this.load.image('bg', 'assets/images/bg_autumn_forest_1.png');
    this.load.html('introform', 'assets/html/intro.html');
  }

  create() {
    this.bg = this.add.tileSprite(0, 0, this.game.config.width, 768, 'bg');
    this.bg.setOrigin(0, 0);
    this.bg.setScrollFactor(0);

    const form = this.add.dom(300, 200).createFromCache('introform');
    form.setPosition(
      this.game.config.width / 2 - form.width / 2,
      this.game.config.height / 2 - form.height / 2,
    );
    // this.add.dom(600, 600, 'div', 'background-color: lime; width: 220px; height: 100px; font: 48px Arial', 'Phaser');
    // console.log(form);

    form.addListener('click');

    form.on('click', (event) => {
      if (event.target.id === 'play_game') {
        // console.log(form.getChildByName('player1').value);
        const player1 = form.getChildByName('player1');
        const player2 = form.getChildByName('player2');

        this.game.player1.setName(player1.value);
        this.game.player2.setName(player2.value);

        form.removeListener('click');

        this.scene.stop();
        this.scene.launch('playGame');
      }
    });
  }

  update() {
    // Uncomment this line to animate the background
    this.bg.tilePositionX -= 0.5;
  }
}
