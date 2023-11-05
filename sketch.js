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
  
function createGrid() {
  rectangles = []; 
  for (let x = boxWidth; x < width; x += boxWidth) {
    for (let y = boxWidth; y < height; y += boxWidth) {
      let rectangle = new Rectangle(x, y, boxWidth);
      rectangles.push(rectangle);
    }
  }
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
