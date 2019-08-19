const Coin = (state) => {
  const { Sprite } = Phaser.GameObjects;
  const { scene, x, y, type } = state;
  const coin = () => Sprite(x, y, type);

  return {
    animate() {
      console.log();
    },
  };
};

export default Coin;
