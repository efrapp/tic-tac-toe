# Tic Tac Toe Game

Project to build the popular game applying some Javascript fundamental concepts. For this project I wanted to use the [Phaser](https://phaser.io/phaser3) library to give it the look of a game so it has sound and animated objects.

## Concepts Applied

The goal in this project is to use Factories to represent each intity in the game (players, boards etc), also private variables and functions to hide code needed just inside a factory and the Module pattern to immediately start the game.

## Technologies

* **Fhaser 3**: Library to create games.

## Install
  1. Clone the repository in a local folder
  2. Go to the project folder and run `npm install` to install all development dependencies

### Run [`http-server`](https://www.npmjs.com/package/http-server) server
  1. Run the server in the console with `http-server` and check the url the server will listen to
  2. In the browser go to the url provided by `http-server`, normally it is `http://127.0.0.1:8080/`
  
## Design Internals

In addition to start the game, the module Game has two main tasks:
* **Create the Phaser game object**: this object initialize the scenes in which the project is structured (intro, game and end)
* **Build the internal logic**: create the players, board and check status of the game

Eech scene can be thought as an extention of the Phaser game object so it can be used anywhere inside those scenes.
One thing to note here is that the scenes don't have the Factory style, they use the class style. I got an error when I tried to apply the factory style to them related to the nonuse of the new operator to get the scene object.

## Copyright

* **Images and background**: https://www.gameartguppy.com/
* **Game background sound**: [Sirius Crystal](http://dig.ccmixter.org/files/speck/60126)
* **Coin sound**: https://www.soundeffectsplus.com/
* **End sound**: https://www.dl-sounds.com/?s=victory

# Live Demo

The first time the live demo is run, it might take some seconds to load and switch between scenes but next times it will be faster.

**Alternative link**: https://immense-ocean-95820.herokuapp.com/

## Contributors

* [Efrain Pinto](https://github.com/efrapp)
