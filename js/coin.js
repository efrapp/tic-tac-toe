const Coin = (state) => {
  const { Sprite } = Phaser.GameObjects;
  const { scene, x, y } = state;

  return {
    animate(type) {
      const coin = scene.add.sprite(x, y, type);

      scene.anims.create({
        key: `${type}_anim`,
        frames: scene.anims.generateFrameNumbers(type),
        frameRate: 20,
        repeat: 2,
      });
      coin.play(`${type}_anim`);

      return this;
    },
    sound(name) {
      const coinsSound = scene.sound.add(name);
      coinsSound.play();

      return this;
    },
  };
};

export default Coin;
