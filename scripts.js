const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');

function loadImage() {
  base_image = new Image();
  base_image.src = 'george.jpg';
  base_image.onload = function(){
    // paint to original canvas
    const newCtx = paintImageToCanvas(ctx, base_image);
    // get pixels
    // let pixels = getPixels(canvasCtx=newCtx,x=0,y=0);
    let pixels = getPixels(newCtx);
    // change pixels
    pixels = messWithPixels(pixels);
    // paint to output canvas
    paintImageToOutputCanvas(pixels, newCtx);
  }
  
  function paintImageToOutputCanvas(pixels, ctx) {
    const canvasOutput = document.createElement('canvas');
    canvasOutput.id = "testCanvas";
    document.body.appendChild(canvasOutput);
    const outputCtx = canvasOutput.getContext('2d');
    outputCtx.putImageData(pixels, 0, 0);
    console.log(ctx);

    canvasOutput.width = ctx.width;
    canvasOutput.height = ctx.height; 
  }
  
  function paintImageToCanvas(canvasCtx, image){
    canvasCtx.drawImage(image, 0, 0);
    return canvasCtx;
  }
  
  // function getPixels(canvasCtx, x=0,y=0,x1=-1,y2=-1) {
  function getPixels(canvasCtx, x=0,y=0,x1=-1,y2=-1) {
    // console.log(canvasCtx);
    let pixels = canvasCtx.getImageData(0, 0, canvasCtx.canvas.width, height);
    return pixels;
  }


  const width = base_image.width;
  const height = base_image.height;
  canvas.width = width;
  canvas.height = height; 
}



function messWithPixels(pixels) {
  // pixels.data is a 8bit but can still use map reduce
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] - 50; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] + 100; // Blue
    // pixels.data[i + 3] = pixels.data[i + 3]; // alpha
  }
  return pixels;
}

loadImage();
