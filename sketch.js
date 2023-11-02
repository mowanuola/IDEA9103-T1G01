let colors = ["#cc3300", "#cc6600", "#cc9966", "#669999"];
let columns = 0;
let boxWidth = 30;
let x;
let y;

let rectangles = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(238, 239, 233, 255);

  for (x = boxWidth; x < width; x += boxWidth) {
    for (y = boxWidth; y < height; y += boxWidth) {
      let rectangle;
      rectangle = new Rectangle(x, y, boxWidth);
      rectangles.push(rectangle);
    }
    columns++;
  }
  for (let rect of rectangles) {
    rect.draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Class Declarations
class Rectangle {
  constructor(
    x,
    y,
    w,
    color = colors[floor(noise(x * 0.05, y * 0.05) * colors.length)]
  ) {
    this.xPos = x;
    this.yPos = y;
    this.w = w;
   
    this.color = color;
  }

  draw() {
    fill(this.color);
    rect(this.xPos, this.yPos, this.w, );
  }
}