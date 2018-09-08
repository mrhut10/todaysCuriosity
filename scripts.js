function loadImage() {
  base_image = new Image();
  base_image.src = 'george.jpg';
  base_image.onload = function(){
    const {inputCanvas, outputCanvas} = reducePixels(base_image, 10, 10, 0.5);
    document.body.appendChild(inputCanvas);
    document.body.appendChild(outputCanvas);
  }
}

loadImage();