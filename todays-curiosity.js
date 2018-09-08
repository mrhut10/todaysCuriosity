class todaysCuriosity {
  constructor(baseImage) {
    this.baseImage = baseImage;

    this.inputCanvas = document.createElement('canvas');
    this.outputCanvas = document.createElement('canvas');
    
    this.inputCanvas.width = baseImage.width;
    this.inputCanvas.height = baseImage.height;

    this.inputContext = this.inputCanvas.getContext('2d');
    this.outputContext = this.outputCanvas.getContext('2d');
  }
  
  setDivisions(xDivisions, yDivisions, reductionRatio) {
    this.xDivisions = xDivisions;
    this.yDivisions = yDivisions;

    this.reductionRatio = reductionRatio;

    this.outputCanvas.width = this.baseImage.width * reductionRatio;
    this.outputCanvas.height = this.baseImage.height * reductionRatio;
  }
  
  reducePixels() {
    this.inputContext.drawImage(this.baseImage, 0, 0);
    let pixels = this.inputContext.getImageData(0, 0, this.inputContext.canvas.width, this.inputContext.canvas.height);
    let brightPixels = brightenPixels(pixels);
    
    this.loopThroughImageDivisions( ( indexX, indexY, sampleWidth, sampleHeight ) => {
      const dx = indexX * this.reductionRatio;
      const dy = indexY * this.reductionRatio;
      //highlight on the original image
      this.inputContext.putImageData(brightPixels, 0, 0, indexX, indexY, sampleWidth, sampleHeight)
      //draw new image block of pixels
      this.outputContext.drawImage(this.baseImage, indexX, indexY, sampleWidth, sampleHeight, dx, dy, sampleWidth+2, sampleHeight+2);
    });

    return {
      inputCanvas : this.inputCanvas,
      outputCanvas : this.outputCanvas,
    };
  }

  loopThroughImageDivisions(fn) {
    const divisionWidth = this.baseImage.width / this.xDivisions;
    const divisionHeight = this.baseImage.height / this.yDivisions;
    const sampleWidth = divisionWidth * this.reductionRatio;
    const sampleHeight = divisionHeight * this.reductionRatio;
  
    for (let indexX = 0; indexX+1 < this.baseImage.width; indexX += divisionWidth) {
      for (let indexY = 0; indexY+1 < this.baseImage.height; indexY += divisionHeight) {
        fn(indexX, indexY, sampleWidth, sampleHeight);
      }
    }
  }
};
  
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
