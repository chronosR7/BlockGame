const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const dino = {
  x: 50,
  y: 250,
  width: 50,
  height: 50,
  jumping: false,
  draw: function() {
    ctx.fillStyle = 'darkred';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

const ground = {
  x: 0,
  y: 300,
  width: 600,
  height: 50,
  draw: function() {
    ctx.fillStyle = 'gray';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

const cactus = {
  x: 600,
  y: 250,
  width: 20,
  height: 50,
  draw: function() {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
};

let gameover = false;
let score = 0;
let speed = 5;

function update() {
  if (!gameover) {
    score++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dino.draw();
    ground.draw();
    cactus.draw();
    cactus.x -= speed;
    if (cactus.x < -cactus.width) {
      cactus.x = 600;
    }
    if (dino.jumping) {
      dino.y -= 7;
      if (dino.y <= 130) {
        dino.jumping = false;
      }
    } else {
      dino.y += 7;
      if (dino.y >= 230) {
        dino.y = 250;
      }
    }
    if (cactus.x < dino.x + dino.width && cactus.x + cactus.width > dino.x && cactus.y < dino.y + dino.height && cactus.y + cactus.height > dino.y) {
      gameover = true;
    }
    requestAnimationFrame(update);
  } else {
    ctx.font = '30px Arial';
    ctx.fillText(`Fim de Jogo! Pontos: ${score}`, 150, 200);
  }
}

window.addEventListener('keydown', (event) => {
  if (event.keyCode === 32 && !dino.jumping) {
    dino.jumping = true;
  }
});

update();
