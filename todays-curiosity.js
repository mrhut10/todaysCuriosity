class todaysCuriosity {
  constructor(baseImage) {
    this.baseImage = baseImage;

    this.inputCanvas = document.createElement('canvas');
    this.outputCanvas = document.createElement('canvas');
    
    this.inputCanvas.width = baseImage.width;
    this.inputCanvas.height = baseImage.height;

    this.inputContext = this.inputCanvas.getContext('2d');
    this.outputContext = this.outputCanvas.getContext('2d');

    this.inputContext.drawImage(this.baseImage, 0, 0);
  }
  
  setDivisions(xDivisions, yDivisions, reductionRatio) {
    this.xDivisions = xDivisions;
    this.yDivisions = yDivisions;

    this.reductionRatio = reductionRatio;

    this.outputCanvas.width = this.baseImage.width * reductionRatio;
    this.outputCanvas.height = this.baseImage.height * reductionRatio;
  }
  
  reducePixels() {
    let pixels = this.inputContext.getImageData(0, 0, this.inputContext.canvas.width, this.inputContext.canvas.height);
    this.brightPixels = brightenPixels(pixels);
    
    this.loopThroughImageDivisions(this.paintReduceBlocks.bind(this));

    return {
      inputCanvas : this.inputCanvas,
      outputCanvas : this.outputCanvas,
    };  
  }

  paintReduceBlocks( indexX, indexY, sampleWidth, sampleHeight ) {
    const dx = indexX * this.reductionRatio;
    const dy = indexY * this.reductionRatio;
    //highlight on the original image
    this.inputContext.putImageData(this.brightPixels, 0, 0, indexX, indexY, sampleWidth, sampleHeight)
    //draw new image block of pixels
    this.outputContext.drawImage(this.baseImage, indexX, indexY, sampleWidth, sampleHeight, dx, dy, sampleWidth+2, sampleHeight+2);
  }

  reversePixels(){
    this.loopThroughImageDivisions(this.paintReverseBlocks.bind(this));
    
    return {
      inputCanvas : this.inputCanvas,
      outputCanvas : this.outputCanvas,
    };  
  }

  paintReverseBlocks( indexX, indexY, sampleWidth, sampleHeight ) {
    const dx = indexX * this.reductionRatio;
    const dy = indexY * this.reductionRatio;
    const reverseIndexX = this.baseImage.width - indexX - sampleWidth;
    const reverseIndexY = this.baseImage.height - indexY - sampleHeight;
    //draw new image block of pixels
    this.outputContext.drawImage(this.baseImage, reverseIndexX, reverseIndexY, sampleWidth, sampleHeight, dx, dy, sampleWidth+2, sampleHeight+2);
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


function brightenPixels({width, height, data}) {
  return new ImageData(
    data.map( (pixel,index) => index % 4 !== 3 ? pixel + 20 : pixel ),
    width,
    height
  );
}
