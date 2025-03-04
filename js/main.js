// Obtenemos el elemento canvas del HTML y su contexto de dibujo 2D
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones del canvas
const window_height = 300;
const window_width = 300;

// El canvas tiene las mismas dimensiones especificadas
canvas.height = window_height;
canvas.width = window_width;

// Establecemos el color de fondo del canvas
canvas.style.background = "black";

// Contador de colisiones
let collisionCounter = 0;

/**
 * Clase Circle que representa un círculo en el canvas.
 */
class Circle {
  constructor(x, y, radius, color, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.dx = 0.3 * this.speed;
    this.dy = 0.3 * this.speed;
    this.moving = true; // Controla si el círculo sigue moviéndose
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();

    // Mostrar el contador dentro del círculo
    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(collisionCounter, this.posX, this.posY);
  }

  update(context) {
    this.draw(context);

    if (this.moving) {
      if (this.posX + this.radius > window_width || this.posX - this.radius < 0) {
        this.dx = -this.dx;
        collisionCounter++;
      }
      if (this.posY + this.radius > window_height || this.posY - this.radius < 0) {
        this.dy = -this.dy;
        collisionCounter++;
      }

      if (collisionCounter >= 10) {
        this.moving = false; // Detener el círculo cuando llegue a 10 colisiones
      }

      this.posX += this.dx;
      this.posY += this.dy;
    }
  }
}

// Generamos un círculo que siempre esté dentro del canvas
let randomRadius = Math.floor(Math.random() * 50 + 30); // Radio entre 30 y 80
let randomX = Math.random() * (window_width - 2 * randomRadius) + randomRadius;
let randomY = Math.random() * (window_height - 2 * randomRadius) + randomRadius;

let miCirculo = new Circle(randomX, randomY, randomRadius, "white", 5);
miCirculo.draw(ctx);

function updateCircle() {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  miCirculo.update(ctx);
}

updateCircle();
