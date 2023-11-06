//Varible declarations
let colors = ["#cc3300", "#cc6600", "#cc9966", "#669999"];
let columns = 60;
let rows;
let boxSize;
let x;
let y;
let innerRects = [];
let rectangles = [];
let artScale = 1.55;
let gridWidth;
let gridHeight;
let colorFill;
let loopOn = true;

/// Animation variables for easing and an incremntal valu for perlin noise motion animation
let t = 0;
let easing = 0.05;
let highlightColor = [238, 239, 233, 255];
let initX, initY;
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
  background(highlightColor);

  // Add text to guide user on how to change the state of the artwork
  fill(0);
  if (loopOn) {
    text("Hit back space to pause", width / 2.2, 20);
  } else {
    text("Hit space bar to play", width / 2.2, 20);
  }
  t += 0.005;

  // Scale the size of the grid up or down (as close to screen size as possible) depending on the width and height of the screen
  if (width > height * artScale) {
    gridHeight = height * 0.95;
    gridWidth = gridHeight * artScale;
  } else {
    gridWidth = width * 0.95;
    gridHeight = gridWidth / artScale;
  }

  // Calculate the size of each box within the columns
  boxSize = gridWidth / columns;

  // Calculate number of rows to be used in drawing some oother shapes and the grid
  rows = floor(gridHeight / boxSize);

  // Call the createGrid function to create the background of the art work
  createGrid();
  for (let rect of rectangles) {
    rect.draw();
  }

  // Calculate lineYpos and lineXPos based on the mouse position and use easing function to control flow and speed
  let dy = mouseY - lineYPos;
  lineYPos += dy * easing;
  let dx = mouseX - lineXPos;
  lineXPos += dx * easing;
  rectMode(CORNER);
  fill(highlightColor);

  // Call the createWhiteLines function to create the gridlike overlay
  createWhiteLines();

  // Call the creatInnerRects function to create white Boxes within specified positions of the grid
  createInnerRects();

  // Call the creatPerlinRects function to create colored Boxes within each white box creatd in line 63
  createPerlinRects();
}

// UI Creation Functions
function createGrid() {
  rectangles = [];
  console.log(gridWidth / 2);
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * boxSize + (width / 2 - gridWidth / 2);
      if (i === 0) {
        initX = x;
      }
      let y = j * boxSize + (height / 2 - gridHeight / 2);
      if (j === 0) {
        initY = y;
      }
      let rectangle;
      rectangle = new Rectangle(x, y, boxSize);
      rectangles.push(rectangle);
    }
  }
}

function createWhiteLines() {
  // Lines that move in random directions based on perlin noise
  rect(
    map(noise(gridHeight * 0.5, gridWidth * 0.5, t), 0, 1, initX, gridWidth),
    initY,
    boxSize,
    gridHeight - boxSize / 1.5
  );
  rect(
    initX,
    map(noise(gridWidth * 0.5, gridHeight * 0.5, t), 0, 1, initY, gridHeight),
    gridWidth,
    boxSize
  );

  // Lines that ease into the x and y position of the mouse
  rect(
    constrain(lineXPos, initX, initX + boxSize * columns - boxSize),
    initY,
    boxSize,
    gridHeight - boxSize / 1.5
  );
  rect(
    initX,
    constrain(lineYPos, initY, initY + boxSize * rows - boxSize),
    gridWidth,
    boxSize
  );

  // Draw Horizontal lines at specified positions throughout the grid
  rect(initX, initY + boxSize * 10, gridWidth, boxSize);
  rect(initX, initY + boxSize * 15, gridWidth, boxSize);
  rect(initX, initY + boxSize * (columns / 2), gridWidth, boxSize);

  // Draw Vertical lines at specified positions throughout the grid
  rect(
    initX + boxSize * (columns / 3) - boxSize,
    initY,
    boxSize,
    gridHeight - boxSize / 1.4
  );
  rect(
    initX + boxSize * (columns / 2),
    initY,
    boxSize,
    gridHeight - boxSize / 1.4
  );

  // Draw short lines at specified positions to mimic the overlaying grid on Piet Mondrian's Boogiee Woogie
  rect(initX + boxSize * 9, initY, boxSize, boxSize * 10);
  rect(initX, initY + boxSize * (rows / 2), boxSize * (columns / 3), boxSize);
  rect(initX + boxSize * 25, initY + boxSize * 15, boxSize, boxSize * 15);
  rect(
    initX + boxSize * (columns - 10),
    initY + boxSize * 15,
    boxSize,
    boxSize * 23
  );

  rect(
    initX + boxSize * (columns / 2),
    initY + boxSize * 5,
    boxSize * (columns / 2),
    boxSize
  );
  rect(
    initX + boxSize * (columns - 15),
    initY + boxSize * 5,
    boxSize,
    boxSize * 6
  );
  rect(
    initX + boxSize * (columns - 10),
    initY + boxSize * (rows - 4),
    boxSize * 10,
    boxSize
  );
}

function createInnerRects() {
  // Draw inner white rectangles
  rect(initX + boxSize * 2, initY + boxSize * 2, boxSize * 5, boxSize * 6);
  rect(initX + boxSize * 22, initY + boxSize * 12, boxSize * 6, boxSize * 2);
  rect(initX + boxSize * 35, initY + boxSize * 18, boxSize * 12, boxSize * 10);
  rect(initX + boxSize * 39, initY + boxSize * 12, boxSize * 12, boxSize * 2);
  rect(
    initX + boxSize * 2,
    initY + boxSize * (rows - 5),
    boxSize * 15,
    boxSize * 4
  );
  rect(initX + boxSize * 6.5, initY + boxSize * 15, boxSize * 7, boxSize * 4);
  rect(initX + boxSize * 6.5, initY + boxSize * 15, boxSize * 7, boxSize * 4);
  rect(
    initX + boxSize * (columns - 12),
    initY + boxSize,
    boxSize * 12,
    boxSize * 2
  );
}
function createPerlinRects() {
  // Place colored rectangles with colors that change randomly over time inside each white rectangle based on frameCount and perlin noise
  let r = map(noise(frameCount * 0.01, initY * 0.1, t), 0, 1, 0, 255);
  let g = map(noise(frameCount * 0.01, initY * 0.1, 1, t), 0, 1, 0, 255);
  let b = map(noise(frameCount * 0.01, initY * 0.1, 2, t), 0, 1, 0, 255);
  fill(r, g, b);
  // let strokeA =
  //   colors[floor(noise(initX * easing, initY * easing) * colors.length)];
  // fill(strokeA);
  rect(initX + boxSize, initY + boxSize, boxSize * 5, boxSize * 6);
  rect(initX + boxSize * 23, initY + boxSize * 12, boxSize * 4, boxSize * 2);
  rect(initX + boxSize * 35, initY + boxSize * 21, boxSize * 12, boxSize * 4);
  rect(initX + boxSize * 42, initY + boxSize * 12, boxSize * 9, boxSize * 2);
  rect(
    initX + boxSize * 2,
    initY + boxSize * (rows - 5),
    boxSize * 10,
    boxSize * 4
  );
  rect(initX + boxSize * 8, initY + boxSize * 16, boxSize * 3, boxSize * 3);
  rect(
    initX + boxSize * (columns - 9),
    initY + boxSize * (rows - 3),
    boxSize * 9,
    boxSize * 3
  );
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
    // I wanted to include an animation that slowly changes the color of the grid over time but was not very sure of how to approach it
    let r = map(noise(this.xPos * 0.1, this.yPos * 0.1, t), 0, 1, 0, 255);
    let g = map(noise(this.xPos * 0.1, this.yPos * 0.1, 1, t), 0, 1, 0, 255);
    let b = map(noise(this.xPos * 0.1, this.yPos * 0.1, 2, t), 0, 1, 0, 255);
    // fill(r, g, b);
    // strokeWeight(1);
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

// UI Interaction

function keyPressed() {
  if (keyCode === 32) {
    loop();
    loopOn = true;
  }
  if (keyCode === 8) {
    noLoop();
    loopOn = false;
  }
}
