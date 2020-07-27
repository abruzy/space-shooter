<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Space Shooter Game</h3>
  <p align="center">
  A JavaScript Capstone project built using JavaScript framework called phaser
    <br />
    <a href="https://github.com/abruzy/space-shooter/blob/master/README.md"><strong>Explore the docs �</strong></a>
    <br />
    <br />
    <a href="https://www.theodinproject.com/courses/ruby-programming/lessons/advanced-building-blocks.">Assigment</a>
    �
    <a href="https://github.com/abruzy/space-shooter/issues">Report Bug</a>
    �
    <a href="https://github.com/abruzy/space-shooter/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
- [Live Demo](#live-demo)
  - [Built With](#built-with)
- [Design Process](#design-process)
- [Choosing the Building Blocks](#choosing-the-building-blocks)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage](#usage)
- [How to Play the Game](#how-to-play-the-game)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

This is the basic start of a Space Shooter Game built with Phaser 3.

The project had a deadline of five days total. Two of those days were allocated to designing, preparing and learning, while the final three days were allocated to building the project.

## Live Demo

Here is the link to the game [space-shooter](https://spaceshooter-game.netlify.app/)

### Built With
This progam was made using this technologies
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Language used.
* [Phaser](https://phaser.io/) - The Game Framework used.
* [Webpack](https://webpack.js.org/) - Tool for bundling our code.

## Design Process

At the end of day two, I had learned the basics of PhaserJS, specifically, the physics and motion. There were several objectives I had when starting day three.

* MVP - Try to build the core functionality before dolling it up.
* Making sure that what I build is functional.
* Try to make the code scalable by focusing on building a system.
* The layout and look of the game can always change, but the functionality will become more difficult to alter over time.

## Choosing the Building Blocks

Given the limited timeframe, there was not a lot of flexiblity afforded to me here, so I ran with what I could. Luckily, I found great music, sprites, etc in a short amount of time.

The design process here was dependent on basic cohesion, in order to fit the deadline.

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

<!-- 1. Get a free API Key at [https://example.com](https://example.com) -->
1. Clone the repo
```sh
git clone https://github.com/abruzy/space-shooter
```

<!-- USAGE EXAMPLES -->
## Usage

2. Next step is to change directory by doing this below
```
cd space-shooter
```

3. Next step is to install all the project dependencies by running this command below

```
npm install
```

4. Then, next step is to run this command:

NB: This will open a new tab on your browser where you will see the game.
```
npm start
```

## How to Play the Game

- There are two control for moving the player which are:
1. using the A, D, W and S key
  * Key A for moving to the left
  * Key D for moving to the right
  * Key W for moving to the top
  * Key S for moving to the bottom

2. using the arrow / cursor key

## To play the Game

You need to enter the name of the player in the input text field and clicked on the ```Submit Name``` button

After which you can now click on the ```Play``` button to start playing the game

## Different Types of Enemies and their Points to be awarded in this Game

- We have three different types of enemies in this game
  * The CarrierShip enemy which has a green color, to destory this type of enemy, you need to three of your laser to hit it before it can be destroy
  * The second type of enemy is the ChaserChip enemy, which chase the player when it closer to the player and you need two laser to hit this type of enemy before it can be destroy
  * The last type of enemy only need one laser to hit before it can be destroy
- For each type of enemy, there are different points for them, like for the enemy type that need three laser to hit it before it can be destroy, you will have 3 point for destroying such enemy

## Others Future Features

> This project is an open source project, there are quite a features you could add to this project as well. A few I can think of are:

- ADD TINT IF DAMAGED
- ADD LIVES
- ADD INCREASING DIFFICULTY
- ADD UPGRADE
- ADD BOSES

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/abruzy/space-shooter/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.


<!-- CONTACT -->
## Contact


* Abubakar Diallo: [Github](https://github.com/abruzy), [Twitter](https://twitter.com/abruzy)

Project Link: [https://github.com/abruzy/space-shooter](https://github.com/abruzy/space-shooter)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Microverse](https://www.microverse.org/)
* [OpenGameArt](https://opengameart.org/)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/abruzy/bookstore
[contributors-url]: https://github.com/abruzy/space-shooter/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/abruzy/bookstore
[forks-url]: https://github.com/abruzy/space-shooter/network/members
[stars-shield]: https://img.shields.io/github/stars/abruzy/bookstore
[stars-url]: https://github.com/abruzy/space-shooter/stargazers
[issues-shield]: https://img.shields.io/github/issues/abruzy/bookstore
[issues-url]: https://github.com/abruzy/space-shooter/issues
[license-shield]: https://img.shields.io/github/license/abruzy/bookstore
[license-url]: https://github.com/abruzy/space-shooter/blob/master/LICENSE.txt
