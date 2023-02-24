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

const gravity = 0.7; // downward acceleration to objects

class Sprite {
  constructor({ position, velocity, color = "blue", offset }) {
    /*position independent of one another. wrapping in an object makes u pass through one argument instead of two cat pass through velocity first*/
    //define the properties associated with the sprite
    this.position = position;
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.isAttacking;
    this.health = 100;
  }
  drawSprite() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height); //were drawing on the canvas so we fill in spaces(referencing x)

    //attack box
    if (this.isAttacking) {
      ctx.fillStyle = "green";
      ctx.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  moveSprite() {
    this.drawSprite();
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;
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

  attack() {
    this.isAttacking = true;
    setTimeout(() => {
      this.isAttacking = false;
    }, 100);
  }
}
/////////////
//Player
////////////
const player = new Sprite({
  position: {
    x: canvasElement.width * 0.4,
    y: 15,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
});
/////////////
//Enemy
////////////
const enemy = new Sprite({
  position: {
    x: canvasElement.width * 0.8,
    y: 15,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 50,
    y: 0,
  },
  color: "red",
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
  ArrowDown: {
    pressed: false,
  },
};

let lastKey; //show last key that was pressed

function rectanglarCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

// ///TIMER
// let timer = 15;
// function decrementTimer(){
//   if (timer > 0) {
//     setTimeout(decrementTimer, 1000)
//     timer--
//     document.querySelector('#timer').innerText = timer
//   }
//   if (player.health === enemy.health){
//       document.querySelector('')
//   }
// }
// decrementTimer()
//<div style = "position: absolute; color: white; align-items: center; justify-content: center; top: 0; right: 0;  left: 0; bottom: 0; display: none;">TIE GAME</div> add this part after

//moving objects velocity determines direction inside an animation loopand gravity
function animatieSprites() {
  window.requestAnimationFrame(animatieSprites); //creating an infinite loop
  ctx.fillStyle = "black"; // black canvas
  ctx.fillRect(0, 0, 1024, 576); //not drawing anything
  player.moveSprite();
  enemy.moveSprite();

  player.velocity.x = 0; // default value player isnt moving
  enemy.velocity.x = 0; // default value enemy isnt moving

  //Player Movement
  if (keys.a.pressed && lastKey === "a") {
    player.velocity.x = -5;
  } else if (keys.d.pressed && lastKey === "d") {
    player.velocity.x = 5;
  }

  //Enemy Movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
  }

  //Detect for Collision
  if (
    rectanglarCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking
  ) {
    player.isAttacking = false;
    // console.log("attack");
    enemy.health -= 10;
    document.querySelector("#enemyHealth").style.width = enemy.health + "%";
  }

  if (
    rectanglarCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking
  ) {
    enemy.isAttacking = false;
    // console.log("enemy attack");
    player.health -= 10;
    document.querySelector("#playerHealth").style.width = player.health + "%";
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
      player.velocity.y = -15;
      break; // if key is equal to a player moves 1 to up
    case " ":
      player.attack();
      break; // if space is equal to a player attack
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
      enemy.velocity.y = -15;
      break; // if key is equal to a player moves 1 to up
    case "ArrowDown":
      enemy.attack();
      break; // if key is equal to a player attack function gets fired
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
    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      break;
  }
  //   console.log(event.key);
});
