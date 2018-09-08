function loadImage() {
  base_image = new Image();
  base_image.src = 'george.jpg';
  base_image.onload = function(){
    const {inputCanvas, outputCanvas} = reducePixels(base_image, 10, 10, 0.5);
    document.body.appendChild(inputCanvas);
    document.body.appendChild(outputCanvas);
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

function reducePixels(baseImage, xDivisions, yDivisions, reductionRatio) {
  const inputCanvas = document.createElement('canvas');
  const outputCanvas = document.createElement('canvas');
  const inputContext = inputCanvas.getContext('2d');
  const outputContext = outputCanvas.getContext('2d');
  
  inputContext.canvas.width = baseImage.width;
  inputContext.canvas.height = baseImage.height;
  outputContext.canvas.width = baseImage.width * reductionRatio;
  outputContext.canvas.height = baseImage.height * reductionRatio;
  
  inputContext.drawImage(baseImage, 0, 0);
  let pixels = inputContext.getImageData(0, 0, inputContext.canvas.width, inputContext.canvas.height);
  brightPixels = brightenPixels(pixels);

  const divisionWidth = baseImage.width / xDivisions;
  const divisionHeight = baseImage.height / yDivisions;
  const sampleWidth = divisionWidth * reductionRatio;
  const sampleHeight = divisionHeight * reductionRatio;

  for (let indexX = 0; indexX+1 < baseImage.width; indexX += divisionWidth) {
    for (let indexY = 0; indexY+1 < baseImage.height; indexY += divisionHeight) {
      const dx = indexX * reductionRatio;
      const dy = indexY * reductionRatio;
      //highlight on the original image
      inputContext.putImageData(brightPixels, 0, 0, indexX, indexY, sampleWidth, sampleHeight)
      //draw new image block of pixels
      outputContext.drawImage(baseImage, indexX, indexY, sampleWidth, sampleHeight, dx, dy, sampleWidth+2, sampleHeight+2);
    }
  }

  return {inputCanvas, outputCanvas};
}

function paintImageToCanvas(theImage, context){  
  const width = theImage.width;
  const height = theImage.height;
  context.canvas.width = width;
  context.canvas.height = height;
  
  context.drawImage(theImage, 0, 0);
}

function brightenPixels({width, height, data}) {
  return new ImageData(
    data.map( (pixel,index) => index % 4 !== 3 ? pixel + 20 : pixel ),
    width,
    height
  );
}

loadImage();
