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
    // console.log(form);
    form.addListener('click');
  }

  update() {
    // Uncomment this line to animate the background
    this.bg.tilePositionX -= 0.5;
  }
}
