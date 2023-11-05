let colors = ["#cc3300", "#cc6600", "#cc9966", "#669999"];
// Width of each individual rectangle
let boxWidth = 20;
let rectangles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);
  frameRate(5);
}

// Create a grid of rectangles
function createGrid() {
  columns = Math.floor(height / boxWidth);
  rectangles = []; 
  for (let x = boxWidth; x < width; x += boxWidth) {
    for (let y = boxWidth; y < height; y += boxWidth) {
      let rectangle = new Rectangle(x, y, boxWidth);
      rectangles.push(rectangle);
    }
  }
}

function draw() {
  background(238, 239, 233, 255);
  columns = Math.floor(height / boxWidth);
  createGrid();
  
  for (let rect of rectangles) {
    rect.draw();
  }
  drawStaticShapes(); // Draw the static white and big colored rectangels on the top of the background
}

function drawStaticShapes() {
  rectMode(CORNER);
  noStroke();

  let time = millis();
  let changeValue = sin(time * 0.001) * 800; // The length of the changing white rectangles
  let duration = 6000;
  let transparency = (sin(time * TWO_PI / duration) + 1) /2; // The change of the transparency of the white rectangles
  let numberScale = transparency * 255;

  // Draw the rectangles over the background
  fill(238, 239, 233, numberScale);
  rect(290, boxWidth / 2, boxWidth, boxWidth * columns);
  rect(370, boxWidth / 2, boxWidth, boxWidth * columns);
  rect(690, boxWidth / 2, boxWidth, boxWidth * columns);
  rect(770, 610, boxWidth * 9, boxWidth * 13);
  rect(1190, boxWidth / 2, boxWidth, boxWidth * columns);
  rect(1270, boxWidth / 2, boxWidth, boxWidth * columns);
  rect(boxWidth / 2, 290, (boxWidth * columns) + changeValue, boxWidth);
  rect(boxWidth / 2, 370, (boxWidth * columns) + changeValue, boxWidth);
  rect(boxWidth / 2, 870, (boxWidth * columns) + changeValue, boxWidth);
  rect(boxWidth / 2, 590, (boxWidth * columns) + changeValue, boxWidth);
  rect(370, 690, (boxWidth * 16) + changeValue, boxWidth);
  rect(690, 150, (boxWidth * 16) + changeValue, boxWidth);
  rect(990, 150, boxWidth, boxWidth * 12);
  rect(1090, 610, boxWidth, boxWidth * 13);
  rect(1230, 610, boxWidth, boxWidth * 13);
  rect(1270, 990, (boxWidth * 26) + changeValue, boxWidth);
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

  // Randomize stroke colors for certain rectangles
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

  rectMode(CENTER);
  noStroke();
}

// Resize the canvas when the winsow size changes
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

  // Draw the rectangles with a time-based animation effect
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
