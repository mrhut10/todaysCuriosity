function loadImage() {
  base_image = new Image();
  base_image.src = 'george.jpg';
  base_image.onload = function(){
    const inputCtx = getCanvasCtxFromSelector('.input-canvas');
    const outputCtx = getCanvasCtxFromSelector('.output-canvas');

    paintImageToCanvas(base_image, inputCtx);
    // paintCoolAvatarToCanvas(base_image, outputCtx, inputCtx);
    paintCoolShuffledAvatarToCanvas(base_image, outputCtx, inputCtx);
  }
}

function paintCoolShuffledAvatarToCanvas(imageData, context, orgCtx) {
  const divsX = 12;
  const divsY = 10;
  const dutyCycle = 100 / 100;

  context.canvas.width = imageData.width * dutyCycle;
  context.canvas.height = imageData.height * dutyCycle;
  let brightPixels = orgCtx.getImageData(0, 0, orgCtx.canvas.width, orgCtx.canvas.height);
  brightPixels = brightenPixels(brightPixels);

  const divWidth = imageData.width / divsX;
  const divHeight = imageData.height / divsY;
  for (let indexX = 0; indexX+1 < imageData.width; indexX += divWidth) {
    for (let indexY = 0; indexY+1 < imageData.height; indexY += divHeight) {
      const dx = indexX * dutyCycle;
      const dy = indexY * dutyCycle;
      const reverseDx = imageData.width * dutyCycle - dx
      const reverseDy = imageData.height * dutyCycle - dy 
      const reverseIndexX = imageData.width - indexX - divWidth;
      const reverseIndexY = imageData.height - indexY - divHeight;
      //draw new image block of pixels
      context.drawImage(imageData, reverseIndexX, reverseIndexY, divWidth*dutyCycle, divHeight*dutyCycle, dx, dy, divWidth*dutyCycle+2, divHeight*dutyCycle+2);
      //highlight on the original image
      orgCtx.putImageData(brightPixels, 0, 0, indexX, indexY, divWidth*dutyCycle, divHeight*dutyCycle)
    }
  }
}

function paintCoolAvatarToCanvas(imageData, context, orgCtx) {
  const divsX = 12;
  const divsY = 10;
  const dutyCycle = 60 / 100;

  context.canvas.width = imageData.width * dutyCycle;
  context.canvas.height = imageData.height * dutyCycle;
  let brightPixels = orgCtx.getImageData(0, 0, orgCtx.canvas.width, orgCtx.canvas.height);
  brightPixels = brightenPixels(brightPixels);

  const divWidth = imageData.width / divsX;
  const divHeight = imageData.height / divsY;
  for (let indexX = 0; indexX+1 < imageData.width; indexX += divWidth) {
    for (let indexY = 0; indexY+1 < imageData.height; indexY += divHeight) {
      const dx = indexX * dutyCycle;
      const dy = indexY * dutyCycle;
      //draw new image block of pixels
      context.drawImage(imageData, indexX, indexY, divWidth*dutyCycle, divHeight*dutyCycle, dx, dy, divWidth*dutyCycle+2, divHeight*dutyCycle+2);
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

function brightenPixels({width, height, data}) {
  return new ImageData(
    data.map( (pixel,index) => index % 4 !== 3 ? pixel + 20 : pixel ),
    width,
    height
  );
}

loadImage();
