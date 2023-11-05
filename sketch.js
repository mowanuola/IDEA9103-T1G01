let colors = ["#cc3300", "#cc6600", "#cc9966", "#669999"];
let columns = 0;
let boxWidth = 20;
let x;
let y;
let innerRects = [];
let availableOffsets = [2.4, 4.2, 3, 0.3, 1.15, 0.6, 4.5, 0.6];
let rectangles = [];
let scl = 1.55;// The scale of the frame
let frameWid, frameHei;// The width and height of the frame
let girdNumColumn = 95;
let barScl = 0.013;// The scale of the bar
let barWid;// The width of the bar
let gridSize; // The size of the grid
let whiteBoxs = [];// The array for white boxes
let littleBoxs = [];// The array for little boxes

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  rectMode(CENTER);

  setFrame()// Calculate frame width and height 

  createGrid();
}
function setFrame() {
  // A function that decides whether the frame should be set based on the height or the width of the canvas, depending on the canvas' aspect ratio
  // Set the frame size based on the current canvas dimensions
  if (width > height * scl) {
    frameHei = height * 0.85
    frameWid = frameHei * scl
  } else {
    frameWid = width * 0.85
    frameHei = frameWid / scl;
  }
  barWid = frameWid * barScl
  // Adding boxes that can be clicked to change
  whiteBoxs = []
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
  littleBoxs = []
  let minR = 0.05, maxR = 0.08// Set the random range for the spacing of little rectangles
  // Add little rectangles for each row and column
 

  //Adding horizontal little rectangles
  for (let sx = -0.5; sx < 0.5; sx += random(minR, maxR)) {
    littleBoxs.push(new LittleBox(sx, -0.27, 1, 0))
  }
  for (let sx = -0.5; sx < 0.5; sx += random(minR, maxR)) {
    littleBoxs.push(new LittleBox(sx, -0.203, -1, 0))
  } for (let sx = -0.5; sx < 0.5; sx += random(minR, maxR)) {
    littleBoxs.push(new LittleBox(sx, -0.02, 1, 0))
  } for (let sx = -0.5; sx < 0.5; sx += random(minR, maxR)) {
    littleBoxs.push(new LittleBox(sx, 0.208, -1, 0))
  }
  //Adding vertical little rectangles
  for (let sy = -0.5; sy < 0.5; sy += random(minR, maxR)) {
    littleBoxs.push(new LittleBox(-0.36, sy, 0, -1))
  } for (let sy = -0.5; sy < 0.5; sy += random(minR, maxR)) {
    littleBoxs.push(new LittleBox(-0.31, sy, 0, -1))
  } for (let sy = -0.5; sy < 0.5; sy += random(minR, maxR)) {
    littleBoxs.push(new LittleBox(-0.14, sy, 0, -1))
  } for (let sy = -0.5; sy < 0.5; sy += random(minR, maxR)) {
    littleBoxs.push(new LittleBox(0.12, sy, 0, -1))
  } for (let sy = -0.5; sy < 0.5; sy += random(minR, maxR)) {
    littleBoxs.push(new LittleBox(0.16, sy, 0, -1))
  }

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

  noStroke()
  fill(255)

  // rect(width/2,mouseY,frameWid,barWid)
  // Drawing large horizontal bars
  rect(width / 2, height / 2 - 0.27 * frameHei, frameWid + 10, barWid)
  rect(width / 2, height / 2 - 0.02 * frameHei, frameWid + 10, barWid)
  rect(width / 2, height / 2 - 0.203 * frameHei, frameWid + 10, barWid)
  rect(width / 2, height / 2 + 0.208 * frameHei, frameWid + 10, barWid)
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

  rect(width / 2 - 0.061 * frameWid, height / 2 - 0.38 * frameHei, frameWid * 0.165, barWid)
  rect(width / 2 + 0.015 * frameWid, height / 2 - 0.33 * frameHei, barWid, frameHei * 0.11)
  rect(width / 2 + 0.244 * frameWid, height / 2 + 0.307 * frameHei, frameWid * 0.18, barWid)

  // Drawing all the moving little boxes

  for (let lb of littleBoxs) {
    lb.draw();
    lb.draw();
  }
}
let x1 = -1, x2 = -1, y1 = -1, y2 = -1
let cx, cy;


function mousePressed() {
  // print(nfc(mouseY/height,3))
  // print(nfc((mouseY-height/2)/frameHei,3))

  if (mouseButton == LEFT) {
    print("x" + nfc((mouseX - width / 2) / frameWid, 3))
    print("y" + nfc((mouseY - height / 2) / frameHei, 3))
    cx = (mouseX - width / 2) / frameWid
    cy = (mouseY - height / 2) / frameHei
  }
  if (mouseButton == CENTER) {
    if (x1 == -1) {
      x1 = mouseX
      y1 = mouseY
    } else if (x2 == -1) {
      x2 = mouseX
      y2 = mouseY
      print("w" + nfc((x2 - x1) / frameWid, 3))
      print("h" + nfc((y2 - y1) / frameHei, 3))
      print("whiteBoxs.push(new WhiteBox(" + nfc(cx, 3) + "," + nfc(cy, 3) + ',' + nfc((x2 - x1) / frameWid, 3) + ',' + nfc((y2 - y1) / frameHei, 3) + ",false))")
      // -0.335,-0.236,0.023,0.025,false))

      x1 = -1
      x2 = -1
      y1 = -1
      y2 = -1
    }
  }
  for (let wb of whiteBoxs) {
    if (wb.mouseOver()) {
      wb.change()
    };
  }
}



function createGrid() {

  rectangles = [];
 // Readjust the position of the colored rectangles to be confined within the frame
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


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // After the canvas size changes, recalculate the frame size and recreate the grid of blocks
  setFrame();
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
    // Set the state of whether to draw a colored square inside the rectangle
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
       // Determine if the large rectangle is wider than it is tall, and draw an inner rectangle accordingly
      if (this.h > this.w) {
        rect(this.x, this.y, this.w, this.w)
      } else {
        rect(this.x, this.y, this.h, this.h)
      }
    }
  }
  mouseOver() {
    // Function to check if the mouse is inside the large rectangle
    if (abs(mouseX - this.x) < this.w / 2 && abs(mouseY - this.y) < this.h / 2) {
      return true
    } else { return false }
  }
  change() {
     // Randomly change the width, height, and color of the rectangle
    this.col = random(colors)
    // Let the rectangle randomize a new width and height based on the initial dimensions
    this.w = random(this.initW * 0.8, this.initW * 1.1)
    this.h = random(this.initH * 0.8, this.initH * 1.1)
  }
}

class LittleBox {

  // Moving little block class
  constructor(sx, sy, vx, vy) {
     // Set the coordinates of the rectangle
    this.x = width / 2 + sx * frameWid
    this.y = height / 2 + sy * frameHei
     // Set the coordinates of the rectangle
    this.w = barWid
   // Randomly generate a color for the small rectangle
    this.col = random(colors)
    // Set the velocity in x and y direction
    this.vx = vx
    this.vy = vy
  }
  draw() {
    // Make the little rectangle move
    this.x += this.vx
    this.y += this.vy
    // Draw the rectangle
    fill(this.col)
    noStroke()
    rect(this.x, this.y, this.w, this.w)
    if (this.x + this.w / 2 > width / 2 + frameWid / 2) {
      this.x = width / 2 - frameWid / 2 + this.w / 2
    }
    if (this.y + this.w / 2 > height / 2 + frameHei / 2) {
      this.y = height / 2 - frameHei / 2 + this.w / 2
    }
    if (this.x - this.w / 2 < width / 2 - frameWid / 2) {
      this.x = width / 2 + frameWid / 2 - this.w / 2
    }
    if (this.y - this.w / 2 < height / 2 - frameHei / 2) {
      this.y = height / 2 + frameHei / 2 - this.w / 2
    }
  }

}