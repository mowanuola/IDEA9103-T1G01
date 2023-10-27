let colors = ["#FFFFFF", "#cc3300", "#cc6600", "#cc9966", "#669999", "#003333"];
let numberOfBoxes = 16;

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

  for (let x = 0; x < width; x += 60) {
    for (let y = 0; y < height; y += 60) {
      let selectedColor = random(colors);
      // let boxWidth = widths[i];
      fill(selectedColor);
      rect(x, y, 60);
      noStroke();
    }
  }
}
