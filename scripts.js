function loadImage() {
  base_image = new Image();
  base_image.src = 'george.jpg';
  base_image.onload = function(){
    const inputCtx = getCanvasCtxFromSelector('.input-canvas');
    const outputCtx = getCanvasCtxFromSelector('.output-canvas');

    paintImageToCanvas(base_image, inputCtx);
    paintCoolAvatarToCanvas(base_image, outputCtx, inputCtx);
  }
}

function paintCoolAvatarToCanvas(imageData, context, orgCtx) {
  const divsX = 12;
  const divsY = 10;
  const dutyCycle = 60 / 100;

  context.canvas.width = imageData.width * dutyCycle;
  context.canvas.height = imageData.height * dutyCycle;
  const brightPixels = brightenPixels(orgCtx.getImageData(0, 0, orgCtx.canvas.width, orgCtx.canvas.height));

  const divWidth = imageData.width / divsX;
  const divHeight = imageData.height / divsY;
  for (let indexX = 0; indexX+1 < imageData.width; indexX += divWidth) {
    for (let indexY = 0; indexY+1 < imageData.height; indexY += divHeight) {
      const dx = indexX * dutyCycle;
      const dy = indexY * dutyCycle;
      //draw new image block of pixels
      context.drawImage(imageData, indexX, indexY, divWidth, divHeight, dx, dy, divWidth, divHeight);
      //highlight on the original image
      orgCtx.putImageData(brightPixels, 0, 0, indexX, indexY, divWidth*dutyCycle, divHeight*dutyCycle)
    }
  }
}

function paintImageToCanvas(theImage, context){
  
  const width = theImage.width;
  const height = theImage.height;
  context.canvas.width = width;
  context.canvas.height = height;
  
  context.drawImage(theImage, 0, 0);
}

function getCanvasCtxFromSelector(selector) {
  const inputCanvas = document.querySelector(selector);
  return inputCanvas.getContext('2d');
}

function brightenPixels(pixels) {
  // pixels.data is a 8bit but can still use map reduce
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 25; // RED
    pixels.data[i + 1] = pixels.data[i + 1] + 25; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] + 25; // Blue
    // pixels.data[i + 3] = pixels.data[i + 3]; // alpha
  }
  return pixels;
}

loadImage();
