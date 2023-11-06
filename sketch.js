let colors = ["#cc3300", "#cc6600", "#cc9966", "#669999"];
let columns = 60;
let rows;
let boxSize;
let x;
let y;
let innerRects = [];
let rectangles = [];
let lines = [];
let scale = 1.55;
let margin = 20;
let gridWidth;
let gridHeight; // Set your desired fixed width
let speed = 12;
let t = 0; // Time variable for animation
let easing = 0.05;
let lineYPos = 1;
let lineXPos = 1;

function setup() {
  rectMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  // noLoop();
  noStroke();
  randomSeed(20);
}

function draw() {
  background(238, 239, 233, 255);
  t += 0.005;
  if (width > height * scale) {
    gridHeight = height * 0.85;
    gridWidth = gridHeight * scale;
  } else {
    gridWidth = width * 0.85;
    gridHeight = gridWidth / scale;
  }
  boxSize = gridWidth / columns;
  rows = floor(gridHeight / boxSize);
  createGrid();
  for (let rect of rectangles) {
    rect.draw();
  }

  let dy = mouseY - lineYPos;
  lineYPos += dy * easing;
  let dx = mouseX - lineXPos;
  lineXPos += dx * easing;

  fill(238, 239, 233, 255);
  rect(
    width / 2,
    map(noise(gridWidth * 0.5, gridHeight * 0.5, t), 0, 1, mouseY, gridHeight),
    gridWidth,
    boxSize
  );
  rect(lineXPos, height / 2 - boxSize / 2, boxSize, gridHeight);
  // color =
  //   colors[floor(map(noise(x * 0.1, y * 0.1, t), 0, 1, 0, colors.length))];
  rect(width / 2, lineYPos, gridWidth, boxSize);
  rect(width / 2, height / 4, gridWidth, boxSize);
  rect(width / 2, height / 2, gridWidth, boxSize);

  rect(width / 3, height / 2 - boxSize / 2, boxSize, gridHeight);
  rect(width / 2, height / 2 - boxSize / 2, boxSize, gridHeight);
  rect(
    map(noise(gridWidth * 0.5, gridHeight * 0.5, t), 0, 1, mouseX, gridWidth),
    height / 2 - boxSize / 2,
    boxSize,
    gridHeight
  );
  // rect(370, boxSize / 2, boxSize, boxSize * columns);
  // rect(690, boxSize / 2, boxSize, boxSize * columns);
  // rect(770, 610, boxSize * 9, boxSize * 13);
  // rect(1190, boxSize / 2, boxSize, boxSize * columns);
  // rect(1270, boxSize / 2, boxSize, boxSize * columns);
  // rect(boxSize / 2, 290, boxSize * columns, boxSize);
  // rect(boxSize / 2, 370, boxSize * columns, boxSize);
  // rect(boxSize / 2, 870, boxSize * columns, boxSize);
  // rect(boxSize / 2, 590, boxSize * columns, boxSize);
  // rect(370, 690, boxSize * 16, boxSize);
  // rect(690, 150, boxSize * 16, boxSize);
  // rect(990, 150, boxSize, boxSize * 12);
  // rect(1090, 610, boxSize, boxSize * 13);
  // rect(1230, 610, boxSize, boxSize * 13);
  // rect(1270, 990, boxSize * 26, boxSize);
  // rect(130, boxSize / 2, boxSize, boxSize * 14);
  // rect(850, 710, boxSize * 4, boxSize * 4);
  // rect(320, 325, boxSize * 2, boxSize * 1.5);
  // rect(410, 910, boxSize * 10, boxSize * 5);
  // rect(1220, 410, boxSize * 2, boxSize * 8);
  // rect(1330, 50, boxSize * 21, boxSize * 10);
  // rect(750, 210, boxSize * 10, boxSize * 3);
  // rect(50, 430, boxSize * 10, boxSize * 6);
  // rect(50, 930, boxSize * 10, boxSize * 4);
  // rect(470, 610, boxSize * 6, boxSize * 4);
  // rect(1550, 910, boxSize * 12, boxSize * 4);
  // let strokeA = random(colors);
  // let strokeB = random(colors);
  // let strokeC = random(colors);
  // let strokeD = random(colors);
  // fill(strokeA);
  // stroke(strokeA);
  // rect(770, 670, boxSize * 9, boxSize * 7);
  // fill(strokeB);
  // stroke(strokeB);
  // rect(470, 930, boxSize * 6, boxSize * 2);
  // fill(strokeC);
  // stroke(strokeC);
  // rect(1220, 450, boxSize * 2, boxSize * 4);
  // fill(strokeD);
  // stroke(strokeD);
  // rect(810, 210, boxSize * 4, boxSize * 3);
  // rect(110, 930, boxSize * 4, boxSize * 4);
}

// UI Creation Functions
function createGrid() {
  rectangles = [];

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * boxSize + width / 2 - gridWidth / 2 + boxSize / 2;
      let y = j * boxSize + height / 2 - gridHeight / 2;
      let rectangle;
      rectangle = new Rectangle(x, y, boxSize);
      rectangles.push(rectangle);
    }
  }
}

function createLines(isHorizontal) {
  let line;
  let color = "238, 239, 233, 255";

  if (isHorizontal)
    line = new Rectangle(
      boxSize / 2,
      roundValueUp(random(0, height)),
      boxSize * columns,
      boxSize,
      color
    );
  else {
    line = new Rectangle(
      roundValueUp(random(0, height)),
      boxSize / 2,
      boxSize,
      boxSize * columns,
      color
    );
  }

  innerRects.push(line);
}

//Utility Functions

function roundValueUp(value) {
  return ceil(value / boxSize) * boxSize;
}

// Class Declarations
class Rectangle {
  constructor(
    x,
    y,
    w,
    h = w,
    color = colors[floor(noise(x * easing, y * easing) * colors.length)]
  ) {
    this.xPos = x;
    this.yPos = y;
    this.w = w;
    this.h = h;
    this.color = color;
  }

  draw() {
    // I wanted to include an animation that sllows the 
    let r = map(noise(this.xPos * 0.1, this.yPos * 0.1, t), 0, 1, 0, 255);
    let g = map(noise(this.xPos * 0.1, this.yPos * 0.1, 1, t), 0, 1, 0, 255);
    let b = map(noise(this.xPos * 0.1, this.yPos * 0.1, 2, t), 0, 1, 0, 255);
    // fill(r, g, b);

    fill(this.color);
    rect(this.xPos, this.yPos, this.w, this.h);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createGrid();
  // rectangles = [];
  // innerRects = [];
}
