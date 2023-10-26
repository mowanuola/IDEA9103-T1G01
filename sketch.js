let colors = ["#FFFFFF", "#D40907", "#1356A2", "#F7D300", "#CCCCCC"];
// let widths = [20,30, 50, 10,70,]
let minSize = 30,
  maxSize = 90;

function setup() {
  createCanvas(600, 600);
  noLoop();
  rectMode(CENTER);
}

function draw() {
  background(238,239,233,255);
  noStroke();
  let x = 0;
  while (x < height) {
    let y = 0;

    while (y < height) {
      let boxWidth = random(minSize, maxSize);
      let boxHeight = random(minSize, maxSize);

      let noiseColor = noise(x * 0.05, y * 0.05) * colors.length;
      fill(colors[floor(noiseColor)]);

      rect(x, y, boxWidth, boxHeight);

      y += boxHeight;
    }

    x += maxSize;
  }
  // for (let x = 0; x < width; x += 60) {
  //   for (let y = 0; y < height; y += 60) {
  //     let selectedColor = random(colors);
  //     fill(selectedColor);
  //     rect(x, y, 60);
  //     noStroke();
  //   }
  // }
}
