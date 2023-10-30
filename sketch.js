let colors = ["#cc3300", "#cc6600", "#cc9966", "#669999", "#003333"];
let numberOfBoxes = 16;
let rows = 0;
let boxWidth = 10;

let shapes = [];

function setup() {
  createCanvas(600, 600);
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
    for (let y = boxWidth; y < height; y += boxWidth) {
      let selectedColor = random(colors);
      // let boxWidth = widths[i];
      fill(selectedColor);
      rect(x, y, boxWidth);
    }
    rows++;
    // while (width % rows == 0) {
    //   fill(238, 239, 233);
    //   rect(rows / boxWidth, 195, 40, 200);
    // }
  }

  console.log(width % rows);
  // fill(255);
  // rect(85, 205, 200, 300);
}
