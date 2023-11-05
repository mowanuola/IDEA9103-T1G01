let colors = ["#cc3300", "#cc6600", "#cc9966", "#669999"];
let columns = 0;
let boxWidth = 20;
let x;
let y;
let innerRects = [];
let availableOffsets = [2.4, 4.2, 3, 0.3, 1.15, 0.6, 4.5, 0.6];
let rectangles = [];
let scl = 1.55;// Scale of the frame
let frameWid, frameHei;// Width and height of the frame
let girdNumColumn = 95;
let barScl = 0.013;// Scale of the bar
let barWid;// Width of the bar
let gridSize;// Size of the grid
let whiteBoxs = [];// Array for white boxes

function setup() {
  createCanvas(windowWidth, windowHeight);
  // noLoop();
  noStroke();
  rectMode(CENTER);

  rectMode(CENTER)
  setFrame()// Calculate width and height information of the frame

  createGrid();
}
function setFrame() {
  // Function to determine if the frame should be set based on the canvas height or width, depending on the canvas' aspect ratio
  // Set the frame size based on the current canvas dimensions
  if (width > height * scl) {
    frameHei = height * 0.85
    frameWid = frameHei * scl
  } else {
    frameWid = width * 0.85
    frameHei = frameWid / scl;
  } imageMode(CENTER)
  barWid = frameWid * barScl
  whiteBoxs=[]
   // Set the frame size based on the current canvas dimensions
  whiteBoxs.push(new WhiteBox(-0.436, -0.112, 0.105, 0.1, false))
  whiteBoxs.push(new WhiteBox(-0.335, -0.236, 0.023, 0.025, false))
  whiteBoxs.push(new WhiteBox(-0.433, 0.282, 0.105, 0.065, true))
  whiteBoxs.push(new WhiteBox(-0.243, 0.273, 0.105, 0.080, true))
  whiteBoxs.push(new WhiteBox(-0.233, 0.021, 0.064, 0.063, false))
  whiteBoxs.push(new WhiteBox(-0.058, 0.095, 0.095, 0.212, true))
  whiteBoxs.push(new WhiteBox(-0.064, -0.32, 0.106, 0.052, true))
  whiteBoxs.push(new WhiteBox(0.14, -0.109, 0.020, 0.131, true))
  whiteBoxs.push(new WhiteBox(0.300, -0.394, 0.222, 0.164, true))
  whiteBoxs.push(new WhiteBox(0.368, 0.276, 0.127, 0.083, false))
}
function draw() {
  background(0);
  fill(255)

  rect(windowWidth / 2, windowHeight / 2, frameWid * 1.04, frameHei * 1.05)

  for (let rect of rectangles) {
    rect.draw();
  }
  for (let wb of whiteBoxs) {
    wb.draw();
  }
  tint(255, mouseX)// Apply a tint based on mouse X position
  // image(img, width / 2, height / 2)

  noStroke()
  fill(255)

  // rect(width/2,mouseY,frameWid,barWid)
  // Drawing large horizontal bars
  rect(width / 2, height / 2 - 0.27 * frameHei, frameWid, barWid)
  rect(width / 2, height / 2 - 0.02 * frameHei, frameWid, barWid)
  rect(width / 2, height / 2 - 0.203 * frameHei, frameWid, barWid)
  rect(width / 2, height / 2 + 0.208 * frameHei, frameWid, barWid)
  // Drawing large vertical bars
  rect(width / 2 - 0.36 * frameWid, height / 2, barWid, frameHei + gridSize)
  rect(width / 2 - 0.31 * frameWid, height / 2, barWid, frameHei + gridSize)
  rect(width / 2 - 0.14 * frameWid, height / 2, barWid, frameHei + gridSize)
  rect(width / 2 + 0.12 * frameWid, height / 2, barWid, frameHei + gridSize)
  rect(width / 2 + 0.16 * frameWid, height / 2, barWid, frameHei + gridSize)

  // Drawing short bars
  rect(width / 2 - 0.44 * frameWid, height / 2 - 0.389 * frameHei, barWid, frameHei * 0.23 + gridSize)
  rect(width / 2 - 0.227 * frameWid, height / 2 + 0.06 * frameHei, frameWid * 0.17, barWid)
  rect(width / 2 + 0.068 * frameWid, height / 2 + 0.094 * frameHei, barWid, frameHei * 0.23)
  rect(width / 2 + 0.14 * frameWid, height / 2 + 0.094 * frameHei, barWid, frameHei * 0.23)
  rect(width / 2 -0.061 * frameWid, height / 2 - 0.38 * frameHei,  frameWid * 0.165,barWid)
  rect(width / 2 +0.015 * frameWid, height / 2 - 0.33 * frameHei,barWid,  frameHei* 0.11)
  rect(width / 2 +0.244 * frameWid, height / 2 + 0.307 * frameHei, frameWid* 0.18,barWid)

}


function mousePressed() {

  for (let wb of whiteBoxs) {
    if (wb.mouseOver()) {
      wb.change()
    };
  }
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
  // Readjust the drawing position of the colored rectangular blocks to be within the frame
  gridSize = frameWid / girdNumColumn
   // Calculate the size of the grid
  let gridNumRow = frameHei / gridSize
  // Calculate the number of rows in the grid
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
  // After canvas size change, recalculate frame size and recreate the grid of boxes
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
class WhiteBox {

   // White rectangle class
  constructor(sx, sy, w, h, state) {
     // Set the coordinates of the rectangle
    this.x = width / 2 + sx * frameWid
    this.y = height / 2 + sy * frameHei
   // Set the initial width and height of the rectangle
    this.initW = frameWid * w
    this.initH = frameHei * h
    this.w = frameWid * w
    this.h = frameHei * h
    // Set whether the rectangle should draw
    this.colorState = state
    // Randomly generate a color for the small rectangle
    this.col = random(colors)
  }
  draw() {
    // Draw the rectangle
    fill(255)
    noStroke()
    rect(this.x, this.y, this.w, this.h)
    if (this.colorState) {
     // If the rectangle should draw a colored inner rectangle

      fill(this.col)
      // Determine if the large rectangle is horizontal or vertical, and draw an inner rectangle accordingly
      if (this.h > this.w) {
        rect(this.x, this.y, this.w, this.w)
      } else {
        rect(this.x, this.y, this.h, this.h)
      }
    }
  }
  mouseOver() {
     // Function to detect if the mouse is inside the large rectangle
    if (abs(mouseX - this.x) < this.w / 2 && abs(mouseY - this.y) < this.h / 2) {
      return true
    } else { return false }
  }
  change() {
     // Randomly change the width, height, and color of the rectangle
    this.col = random(colors)
    // Randomize a new width and height based on the initial dimensions
    this.w = random(this.initW * 0.8, this.initW * 1.1)
    this.h = random(this.initH * 0.8, this.initH * 1.1)
  }
}