
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
  context.canvas.width = imageData.width;
  context.canvas.height = imageData.height;
  context.putImageData(imageData, 0, 0);
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
