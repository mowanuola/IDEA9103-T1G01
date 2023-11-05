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
  noStroke();
  rectMode(CENTER);
  frameRate(5); // Set the frame rate to control the speed of animation
}

function draw() {
  background(238, 239, 233, 255);
  createGrid();
  // Draw the animated rectangles with time-based effects
  for (let rect of rectangles) {
    rect.draw();
  }

  drawStaticShapes();
  
  
function createGrid() {
  rectangles = []; 
  for (let x = boxWidth; x < width; x += boxWidth) {
    for (let y = boxWidth; y < height; y += boxWidth) {
      let rectangle = new Rectangle(x, y, boxWidth);
      rectangles.push(rectangle);
    }
  }
}

function drawStaticShapes() {
  rectMode(CORNER);
  strokeWeight(2);

  // Drawing white rectangles from the original code
  stroke(238, 239, 233, 255);
  fill(238, 239, 233, 255);
  rect(290, boxWidth / 2, boxWidth, boxWidth * columns);
  rect(370, boxWidth / 2, boxWidth, boxWidth * columns);
  rect(690, boxWidth / 2, boxWidth, boxWidth * columns);
  rect(770, 610, boxWidth * 9, boxWidth * 13);
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
  rect(850, 710, boxWidth * 4, boxWidth * 4);
  rect(320, 325, boxWidth * 2, boxWidth * 1.5);
  rect(410, 910, boxWidth * 10, boxWidth * 5);
  rect(1220, 410, boxWidth * 2, boxWidth * 8);
  rect(1330, 50, boxWidth * 21, boxWidth * 10);
  rect(750, 210, boxWidth * 10, boxWidth * 3);
  rect(50, 430, boxWidth * 10, boxWidth * 6);
  rect(50, 930, boxWidth * 10, boxWidth * 4);
  rect(470, 610, boxWidth * 6, boxWidth * 4);
  rect(1550, 910, boxWidth * 12, boxWidth * 4);

  // Drawing colored rectangles with random color selection
  let strokeA = random(colors);
  let strokeB = random(colors);
  let strokeC = random(colors);
  let strokeD = random(colors);

  fill(strokeA);
  stroke(strokeA);
  rect(770, 670, boxWidth * 9, boxWidth * 7);

  fill(strokeB);
  stroke(strokeB);
  rect(470, 930, boxWidth * 6, boxWidth * 2);

  fill(strokeC);
  stroke(strokeC);
  rect(1220, 450, boxWidth * 2, boxWidth * 4);

  fill(strokeD);
  stroke(strokeD);
  rect(810, 210, boxWidth * 4, boxWidth * 3);
  rect(110, 930, boxWidth * 4, boxWidth * 4);
}

  rectMode(CENTER);
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createGrid();
}

class Rectangle {
  constructor(x, y, size) {
    this.xPos = x;
    this.yPos = y;
    this.size = size;
    this.baseColor = random(colors);
    this.timeOffset = random(1000);
  }

  draw() {
    let time = millis() / 1000 + this.timeOffset;
    
    // Color shift for the stroke
    let colorIndex = floor(map(sin(time), -1, 1, 0, colors.length));
    this.strokeColor = colors[colorIndex];
    
    // Background rectangles swaying look
    this.xShift = sin(time) * this.size * 0.1; // x-axis
    this.yShift = cos(time) * this.size * 0.1; // y-axis

    stroke(this.strokeColor);
    strokeWeight(2);
    fill(this.baseColor);
    rect(this.xPos + this.xShift, this.yPos + this.yShift, this.size, this.size);
  }
}
