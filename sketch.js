let colors = ["#cc3300", "#cc6600", "#cc9966", "#669999"];
let columns = 0;
let boxWidth = 20;
let prevColor, selectedColor;
let x;
let y;

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

  for (x = boxWidth; x < width; x += boxWidth) {
    for (y = boxWidth; y < height; y += boxWidth) {
      let noiseColor = noise(x * 0.05, y * 0.05) * colors.length;
      fill(colors[floor(noiseColor)]);
      // selectedColor = random(colors);
      // if (prevColor && (x + y) % 3 === 0) {
      //   fill(prevColor);
      // } else {
      //   fill(selectedColor);
      //   prevColor = selectedColor;
      // }
      rect(x, y, boxWidth);
      for (let i = 0; i < columns; i += 10) {
        console.log(constrain(x, x, x + boxWidth));
        fill(238, 239, 233, 255);
        rect(
          constrain(x, x + boxWidth, width),
          constrain(y, y + boxWidth, width),
          40
        );
      }
    }

    columns++;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}