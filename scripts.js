function loadImage() {
  base_image = new Image();
  base_image.src = 'george.jpg';
  base_image.onload = function(){
    const inputCtx = getCanvasCtxFromSelector('.input-canvas');
    const outputCtx = getCanvasCtxFromSelector('.output-canvas');

    paintImageToCanvas(base_image, inputCtx);
    paintCoolAvatarToCanvas(base_image, outputCtx);
  }
}

function paintCoolAvatarToCanvas(imageData, context) {
  const divsX = 12;
  const divsY = 10;
  const dutyCycle = 60 / 100;

  context.canvas.width = imageData.width * dutyCycle;
  context.canvas.height = imageData.height * dutyCycle;

  const divWidth = imageData.width / divsX;
  const divHeight = imageData.height / divsY;
  for (let indexX = 0; indexX+1 < imageData.width; indexX += divWidth) {
    for (let indexY = 0; indexY+1 < imageData.height; indexY += divHeight) {
      const dx = indexX * dutyCycle;
      const dy = indexY * dutyCycle;
      context.drawImage(imageData, indexX, indexY, divWidth, divHeight, dx, dy, divWidth, divHeight);
    }
  }
}

function sanePutImageData(context, imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
  const sane_dx = dx - dirtyX;
  const sane_dy = dy - dirtyY;
  context.putImageData(imageData, sane_dx, sane_dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
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

loadImage();
