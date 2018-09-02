
function loadImage() {
  base_image = new Image();
  base_image.src = 'george.jpg';
  base_image.onload = function(){
    const inputCtx = getCanvasCtxFromSelector('.input-canvas');
    const outputCtx = getCanvasCtxFromSelector('.output-canvas');
    
    paintImageToCanvas(base_image, inputCtx);
    const coolAvatar = makeCoolAvatar(inputCtx);
    paintCoolAvatarToCanvas(coolAvatar, outputCtx);
  }
}

function paintCoolAvatarToCanvas(imageData, context) {
  const width = imageData.width;
  const height = imageData.height;
  const dutyCycle = 60 / 100;
  const divsX = 12;
  const divsY = 10;
  const divWidth = width / divsX;
  const divHeight = height / divsY;
  const offset = divWidth * 1 / dutyCycle / 2;
  const dirtyWidth = divWidth * dutyCycle + 5;
  const dirtyHeight = divHeight * dutyCycle + 5;
  console.log(offset);
  context.canvas.width = width * dutyCycle;
  context.canvas.height = height * dutyCycle;
  const logger = [];
  for (let indexX = 0; indexX+1 < width; indexX += divWidth) {
    for (let indexY = 0; indexY+1 < height; indexY += divHeight) {
      const dirtyX = indexX;
      const dirtyY = indexY;
      const dx = indexX * dutyCycle;
      const dy = indexY * dutyCycle ;
      sanePutImageData(context, imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
    }
  }
  console.table(logger);
}

function sanePutImageData(context, imageData, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
  const sane_dx = dx - dirtyX;
  const sane_dy = dy - dirtyY;
  context.putImageData(imageData, sane_dx, sane_dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
}

function makeCoolAvatar(context) {
  const width = context.canvas.width;
  const height = context.canvas.height;
  const coolAvatarData = context.getImageData(0, 0, width, height);

  return messWithPixels(coolAvatarData); // image data of cool avatar
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

function messWithPixels(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] - 50; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] + 100; // Blue
  }
  
  return pixels;
}

loadImage();
