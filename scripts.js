function loadImage() {
  base_image = new Image();
  base_image.src = 'george.jpg';
  base_image.onload = function(){
    const curiosity = new todaysCuriosity();
    curiosity.setDivisions(10, 10, 0.5);
    const {inputCanvas, outputCanvas} = curiosity.reducePixels(base_image);
    
    document.body.appendChild(inputCanvas);
    document.body.appendChild(outputCanvas);
  }
}

loadImage();
