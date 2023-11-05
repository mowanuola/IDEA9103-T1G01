let colors = ["#cc3300", "#cc6600", "#cc9966", "#669999"];
let columns = 0;
let boxWidth = 20;
let x;
let y;
let innerRects = [];
let availableOffsets = [2.4, 4.2, 3, 0.3, 1.15, 0.6, 4.5, 0.6];
let rectangles = [];
let scl = 1.55;
let frameWid, frameHei;
let music;
let girdNumColumn = 95;
let barScl = 0.013;
let barWid;
let gridSize;
let whiteBoxs = [];
let littleBoxs = [];
let fft;
let button1, button2;
function preload() {
  
  music = loadSound("jingle.mp3")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
 // Create buttons
  button1 = createButton('play');
  button2 = createButton('stop');
  button1.style('font-weight', 'bold'); // Set the font to bold
  button2.style('font-weight', 'bold'); 
  // Set button functionalities
  button1.mousePressed(playMusic)
  button2.mousePressed(stopMusic)
  noStroke();
  rectMode(CENTER);

  setFrame()//计算画框宽高信息

  createGrid();
  fft = new p5.FFT(); // Create an FFT object


}
function setFrame() {
  // A function to determine whether to set the frame based on the height or width of the canvas, depending on the aspect ratio of the current canvas
  // Set the dimensions of the frame based on the current size of the canvas
  if (width > height * scl) {
    frameHei = height * 0.85
    frameWid = frameHei * scl
  } else {
    frameWid = width * 0.85
    frameHei = frameWid / scl;
  }
  barWid = frameWid * barScl
  // Adding boxes that can change when clicked
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
  let minR = 0.05, maxR = 0.08// Set a random range for the increment of spacing between small rectangles
  // Add small rectangles for each row and column

  // Adding horizontal small rectangles
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
  // Adding vertical small rectangles
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
  // Set the width and height for the buttons
  let bw=frameWid*0.09
  let bh=bw*0.35
  // Set the size for the buttons
  button1.size(bw,bh);
  button2.size(bw,bh);
  // Set the position for the buttons
  button1.position(width/2+frameWid/2-bw*2.4, height/2+frameHei/2-bh*1.2);
  button2.position(width/2+frameWid/2-bw*1.2, height/2+frameHei/2-bh*1.2);
  // Set the font size for the button text
  button1.style('font-size', bw*0.2+'px'); 
  button2.style('font-size', bw*0.2+'px'); 
}
function draw() {
  background(0);

  fill(255)
  // Drawing the white outer frame
  rect(windowWidth / 2, windowHeight / 2, frameWid * 1.04, frameHei * 1.05)
  for (let rect of rectangles) {
    rect.draw();
  }
  for (let wb of whiteBoxs) {
    wb.draw();
  }

  noStroke()
  fill(255)

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

  let spectrum = fft.analyze(); /// Use fft to get frequency spectrum data
 

  // Calculate the volume
  let sum = 0;
  for (let i = 0; i < spectrum.length; i++) {
    sum += spectrum[i];
    // Add up the volume of all frequency bands
  }
  // Divide the total by the number of bands to get the volume
  let volume = sum / spectrum.length;

  // Draw all moving little blocks
  for (let lb of littleBoxs) {
    lb.move(volume * 0.25);
    lb.draw();
  }
}
// Functions to pause and play music
function playMusic() {
  if (!music.isPlaying()) {
    music.loop()
  }
} function stopMusic() {
  if (music.isPlaying()) {
    music.stop()
  }
}
function mousePressed() {

  for (let wb of whiteBoxs) {
    // Change the white rectangle that is clicked on
    if (wb.mouseOver()) {
      wb.change()
    };
  }
}



function createGrid() {

  rectangles = [];
  // Readjust the drawing positions of the colored rectangle blocks to confine them within the frame
  gridSize = frameWid / girdNumColumn
   // Calculate the grid size
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
    // Set whether the rectangle is to draw a colored square inside
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
       // If set to true, draw a colored square inside the rectangle

      fill(this.col)
       // Determine if the large rectangle is horizontal or vertical and draw an inner rectangle accordingly
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
    // Randomize a new width and height for the rectangle based on the initial dimensions
    this.w = random(this.initW * 0.8, this.initW * 1.1)
    this.h = random(this.initH * 0.8, this.initH * 1.1)
  }
}

class LittleBox {

  // Moving small square class
  constructor(sx, sy, vx, vy) {
    // Set the coordinates of the rectangle
    this.x = width / 2 + sx * frameWid
    this.y = height / 2 + sy * frameHei
    // Set the size of the rectangle
    this.w = barWid
    // Randomly generate a color for the small rectangle
    this.col = random(colors)
    this.vx = vx
    this.vy = vy
  }
  move(spd) {
     // Make the small rectangle move
    this.x += this.vx * spd
    this.y += this.vy * spd
  }
  draw() {

    // Draw the rectangle
    fill(this.col)
    noStroke()
    // Check if the small block is out of bounds; if so, let it come back from the other side
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
    rect(this.x, this.y, this.w, this.w)

  }

}