////////////////
///Screen
///////////////

//select the canvas
const canvasElement = document.querySelector("canvas");
//context responsible for shapes and sprites
const ctx = canvasElement.getContext("2d"); //2d game

// size of screen
canvasElement.width = 1024;
canvasElement.height = 576; //dont use . style

ctx.fillRect(0, 0, 1024, 576); //4arguments x, y, width, height fills a rectangle

///////////////////////
///player and enemy using oop for interactivity
///////////////////

const gravity = 0.2; // downward acceleration to objects

class Sprite {
  constructor({ position, velocity }) {
    /*position independent of one another. wrapping in an object makes u pass through one argument instead of two cat pass through velocity first*/
    //define the properties associated with the sprite
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.lastKey;
  }
  drawSprite() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, 50, this.height); //were drawing on the canvas so we fill in spaces(referencing x)
  }
  moveSprite() {
    this.drawSprite();
    //this.velocity.y += gravity
    this.position.x += this.velocity.x; //
    this.position.y += this.velocity.y; //over time our position has velocity is added to it but dont forget to call this function in the animation function
    if (
      this.position.y + this.height + this.velocity.y >=
      canvasElement.height
    ) {
      this.velocity.y = 0;
      //this.height === to the bottom of the rec if the stops from dropping off pagee
    } else this.velocity.y += gravity;
  }
}
/////////////
//Player
////////////
const player = new Sprite({
  position: {
    x: 0,
    y: 10,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});
/////////////
//Enemy
////////////
const enemy = new Sprite({
  position: {
    x: 110,
    y: 340,
  },
  velocity: {
    x: 0,
    y: 0,
  },
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

let lastKey; //show last key that was pressed

//moving objects velocity determines direction inside an animation loopand gravity
function animatieSprites() {
  window.requestAnimationFrame(animatieSprites); //creating an infinite loop
  ctx.fillStyle = "black"; // black canvas
  ctx.fillRect(0, 0, 1024, 576); //not drawing anything
  player.moveSprite();
  enemy.moveSprite();

  player.velocity.x = 0; // default value player isnt moving
  enemy.velocity.x = 0;

  //Player Movement
  if (keys.a.pressed && lastKey === "a") {
    player.velocity.x = -1;
  } else if (keys.d.pressed && lastKey === "d") {
    player.velocity.x = 1;
  }

  //Enemy Movement
//   console.log(keys.ArrowLeft.pressed,enemy.lastKey)
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -1;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 1;
  }
}
animatieSprites();

//////////////////
//Move Sprite usimg event listeners
/////////////////

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break; // if key is equal to d player moves 1 to right
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break; // if key is equal to a player moves 1 to left
    case "w":
      player.velocity.y = -10;
      break; // if key is equal to a player moves 1 to up
    ////enemy
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      enemy.lastKey = "ArrowRight";
      break; // if key is equal to d player moves 1 to right
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      enemy.lastKey = "ArrowLeft";
      break; // if key is equal to a player moves 1 to left
    case "ArrowUp":
      enemy.velocity.y = -10;
      break; // if key is equal to a player moves 1 to up
  }
  console.log(event.key);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break; // if key is equal to d player does not move right
    case "a":
      keys.a.pressed = false;
      break; // if key is equal to d player does not move left
    //////enemy
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break; // if key is presssed player does not move right
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break; // if key is presssed player does not move left
  }
  console.log(event.key);
});
