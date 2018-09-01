const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');

function paintToCanvas() {
  base_image = new Image();
  base_image.src = 'george.jpg';
  base_image.onload = function(){
    ctx.drawImage(base_image, 0, 0);
    let pixels = ctx.getImageData(0, 0, width, height);
    ctx.putImageData(messWithPixels(pixels), 0, 0);
  }
  const width = base_image.width;
  const height = base_image.height;
  canvas.width = width;
  canvas.height = height; 
}

function messWithPixels(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] - 50; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] + 100; // Blue
  }
  console.log('iscalled');
  return pixels;
}

paintToCanvas();

