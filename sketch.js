let colors = ["#cc3300", "#cc6600", "#cc9966", "#669999"];
let columns = 0;
let boxWidth = 20;
let x;
let y;
let innerRects = [];
let availableOffsets = [2.4, 4.2, 3, 0.3, 1.15, 0.6, 4.5, 0.6];
let rectangles = [];
let scl = 1.55// Scale of the frame
let frameWid, frameHei// Width and height of the frame
let img
let girdNumColumn = 95

function setup() {
  createCanvas(windowWidth, windowHeight);
  // noLoop();
  noStroke();
  rectMode(CENTER);

  rectMode(CENTER)
  setFrame()// Calculate width and height of the frame

  createGrid();
}
// Function to set the frame size based on the aspect ratio of the current canvas width and height
// Set the frame size based on the current canvas size
function setFrame() {
  if (width > height * scl) {
    frameHei = height * 0.85
    frameWid = frameHei * scl
  } else {
    frameWid = width * 0.85
    frameHei = frameWid / scl;
  } imageMode(CENTER)
}
function draw() {
  background(0);
  fill(255)

  rect(windowWidth / 2, windowHeight / 2, frameWid * 1.04, frameHei * 1.05)

  for (let rect of rectangles) {
    rect.draw();
  }


  // rectMode(CORNER);
  // stroke(238, 239, 233, 255);
  // strokeWeight(2);
  // fill(238, 239, 233, 255);

  // rect(290, boxWidth / 2, boxWidth, boxWidth * columns);
  // rect(370, boxWidth / 2, boxWidth, boxWidth * columns);
  // rect(690, boxWidth / 2, boxWidth, boxWidth * columns);
  // rect(770, 610, boxWidth * 9, boxWidth * 13);
  // rect(1190, boxWidth / 2, boxWidth, boxWidth * columns);
  // rect(1270, boxWidth / 2, boxWidth, boxWidth * columns);

  // rect(boxWidth / 2, 290, boxWidth * columns, boxWidth);
  // rect(boxWidth / 2, 370, boxWidth * columns, boxWidth);
  // rect(boxWidth / 2, 870, boxWidth * columns, boxWidth);
  // rect(boxWidth / 2, 590, boxWidth * columns, boxWidth);

  // rect(370, 690, boxWidth * 16, boxWidth);
  // rect(690, 150, boxWidth * 16, boxWidth);
  // rect(990, 150, boxWidth, boxWidth * 12);
  // rect(1090, 610, boxWidth, boxWidth * 13);
  // rect(1230, 610, boxWidth, boxWidth * 13);
  // rect(1270, 990, boxWidth * 26, boxWidth);
  // rect(130, boxWidth / 2, boxWidth, boxWidth * 14);
  // rect(850, 710, boxWidth * 4, boxWidth * 4);
  // rect(320, 325, boxWidth * 2, boxWidth * 1.5);
  // rect(410, 910, boxWidth * 10, boxWidth * 5);
  // rect(1220, 410, boxWidth * 2, boxWidth * 8);
  // rect(1330, 50, boxWidth * 21, boxWidth * 10);
  // rect(750, 210, boxWidth * 10, boxWidth * 3);
  // rect(50, 430, boxWidth * 10, boxWidth * 6);
  // rect(50, 930, boxWidth * 10, boxWidth * 4);
  // rect(470, 610, boxWidth * 6, boxWidth * 4);
  // rect(1550, 910, boxWidth * 12, boxWidth * 4);
  // let strokeA = random(colors);
  // let strokeB = random(colors);
  // let strokeC = random(colors);
  // let strokeD = random(colors);
  // fill(strokeA);
  // stroke(strokeA);
  // rect(770, 670, boxWidth * 9, boxWidth * 7);
  // fill(strokeB);
  // stroke(strokeB);
  // rect(470, 930, boxWidth * 6, boxWidth * 2);
  // fill(strokeC);
  // stroke(strokeC);
  // rect(1220, 450, boxWidth * 2, boxWidth * 4);
  // fill(strokeD);
  // stroke(strokeD);
  // rect(810, 210, boxWidth * 4, boxWidth * 3);
  // rect(110, 930, boxWidth * 4, boxWidth * 4);

}

function createGrid() {
  // for (x = boxWidth; x < width; x += boxWidth) {
  //   columns++;
  //   for (y = boxWidth; y < height; y += boxWidth) {
  //     let rectangle;
  //     rectangle = new Rectangle(x, y, boxWidth);
  //     rectangles.push(rectangle);
  //   }
  // }
  rectangles = [];
  // Adjust the drawing position of the colored rectangular blocks to be within the frame
  let gridSize = frameWid / girdNumColumn
  // Calculate grid size
  let gridNumRow = frameHei / gridSize
  // Calculate number of rows in the grid
  for (let i = 0; i < girdNumColumn; i++) {
    for (let j = 0; j < gridNumRow; j++) {
      let x = i * gridSize + width / 2 - frameWid / 2 + gridSize / 2
      let y = j * gridSize + height / 2 - frameHei / 2
      let rectangle;
      rectangle = new Rectangle(x, y, gridSize);
      rectangles.push(rectangle);
    }
  }
  // for (x = width / 2 - frameWid / 2 + boxWidth; x < width / 2 + frameWid / 2 - boxWidth; x += boxWidth) {
  //   columns++;
  //   for (y = height / 2 - frameHei / 2 + boxWidth; y <= height / 2 + frameHei / 2 - boxWidth / 1.5; y += boxWidth) {
  //     let rectangle;
  //     rectangle = new Rectangle(x, y, boxWidth);
  //     rectangles.push(rectangle);
  //   }
  // }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
   // After changing the canvas size, recalculate the frame size and recreate the block grid
  setFrame()
  createGrid()

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
    this.strokeColor = random(colors);
  }

  draw() {
    // stroke(random(colors));
    stroke(this.strokeColor);
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
