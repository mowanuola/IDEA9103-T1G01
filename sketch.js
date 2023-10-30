let colors = ["#cc3300", "#cc6600", "#cc9966", "#669999"];
let numberOfBoxes = 16;
let rows = 0;
let boxWidth = 20;
let prevColor, selectedColor;

let widths = [60, 40, 90, 130, 70];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  noLoop();
  rectMode(CENTER);
}

function draw() {
  background(238, 239, 233, 255);
  // let x = 0;
  // while (x < height) {
  //   let y = 0;

  //   while (y < height) {
  //     let boxWidth = random(minSize, maxSize);
  //     let boxHeight = random(minSize, maxSize);

  //     let noiseColor = noise(x * 0.05, y * 0.05) * colors.length;
  //     fill(colors[floor(noiseColor)]);

  //     rect(x, y, boxWidth, boxHeight);

  //     y += boxHeight;
  //   }

  //   x += maxSize;
  // }

  for (let x = boxWidth; x < width; x += boxWidth) {
    console.log(rectX, rectY);
    for (let y = boxWidth; y < height; y += boxWidth) {
      rectX = random(0, width).toFixed();
      rectY = random(0, height).toFixed();
      selectedColor = random(colors);
      if (prevColor && (x + y) % 3 === 0) {
        fill(prevColor);
      } else {
        fill(selectedColor);
        prevColor = selectedColor;
      }

      rect(x, y, boxWidth);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
