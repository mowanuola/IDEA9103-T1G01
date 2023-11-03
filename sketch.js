let colors = ["#cc3300", "#cc6600", "#cc9966", "#669999"];
let columns = 0;
let boxWidth = 20;
let x;
let y;
let innerRects = [];
let availableOffsets = [2.4, 4.2, 3, 0.3, 1.15, 0.6, 4.5, 0.6];
let rectangles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(238, 239, 233, 255);
  createGrid();
  for (let rect of rectangles) {
    rect.draw();
  }
  rectMode(CORNER);
  fill(238, 239, 233, 255);
  rect(290, boxWidth / 2, boxWidth, boxWidth * columns);
  rect(370, boxWidth / 2, boxWidth, boxWidth * columns);
  rect(690, boxWidth / 2, boxWidth, boxWidth * columns);
  rect(1190, boxWidth / 2, boxWidth, boxWidth * columns);
  rect(1270, boxWidth / 2, boxWidth, boxWidth * columns);
  rect(boxWidth / 2, 290, boxWidth * columns, boxWidth);
  rect(boxWidth / 2, 370, boxWidth * columns, boxWidth);
  rect(boxWidth / 2, 870, boxWidth * columns, boxWidth);
  rect(boxWidth / 2, 590, boxWidth * columns, boxWidth);
  rect(370, 690, boxWidth * 16, boxWidth);
  rect(690, 150, boxWidth * 16, boxWidth);
  rect(990, 150, boxWidth, boxWidth * 12);
  rect(1090, 610, boxWidth, boxWidth * 13);
  rect(1230, 610, boxWidth, boxWidth * 13);
  rect(1270, 990, boxWidth * 26, boxWidth);
  rect(130, boxWidth / 2, boxWidth, boxWidth * 14);
}

function createGrid() {
  for (x = boxWidth; x < width; x += boxWidth) {
    columns++;
    for (y = boxWidth; y < height; y += boxWidth) {
      let rectangle;
      rectangle = new Rectangle(x, y, boxWidth);
      rectangles.push(rectangle);
    }
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
    h = w,
    color = colors[floor(noise(x * 0.05, y * 0.05) * colors.length)]
  ) {
    this.xPos = x;
    this.yPos = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw() {
    stroke(random(colors));
    strokeWeight(2);
    fill(this.color);
    rect(this.xPos, this.yPos, this.w, this.h);
  }
}

function rectanglesIntersect(recta1, recta2) {
  return (
    ((recta1.i <= recta2.i && recta1.i + recta1.si > recta2.i) ||
      (recta2.i <= recta1.i && recta2.i + recta2.si > recta1.i)) &&
    ((recta1.j <= recta2.j && recta1.j + recta1.sj > recta2.j) ||
      (recta2.j <= recta1.j && recta2.j + recta2.sj > recta1.j))
  );
}

function roundValueUp(value) {
  return ceil(value / boxWidth) * boxWidth;
}
