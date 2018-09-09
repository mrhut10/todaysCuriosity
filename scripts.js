function loadImage() {
  base_image = new Image();
  base_image.src = 'george.jpg';
  base_image.onload = function(){
    const curiosity = new todaysCuriosity(base_image);
    curiosity.setDivisions(10, 10);
    curiosity.setReductionRatio(0.5)
    curiosity.setOffset(0.2, 0.2);
    // const {inputCanvas, outputCanvas} = curiosity.reducePixels();
    const {inputCanvas, outputCanvas} = curiosity.reversePixels();

    document.body.appendChild(inputCanvas);
    document.body.appendChild(outputCanvas);
  }
}

loadImage();
