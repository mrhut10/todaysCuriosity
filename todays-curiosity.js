class todaysCuriosity {
  constructor(baseImage) {
    this.baseImage = baseImage;

    this.createCanvases();
    this.paintInputImage();
    this.createBrightpixels();
    this.loadDefaultValues();
  }
  
  createCanvases() {
    this.inputCanvas = document.createElement('canvas');
    this.outputCanvas = document.createElement('canvas');
    
    this.inputContext = this.inputCanvas.getContext('2d');
    this.outputContext = this.outputCanvas.getContext('2d');
  }
  
  paintInputImage() {
    this.inputCanvas.width = this.baseImage.width;
    this.inputCanvas.height = this.baseImage.height;
    this.inputContext.drawImage(this.baseImage, 0, 0);
  }
  
  createBrightpixels() {
    let pixels = this.inputContext.getImageData(0, 0, this.inputContext.canvas.width, this.inputContext.canvas.height);
    this.brightPixels = brightenPixels(pixels);
  }
  
  loadDefaultValues() {
    this.xDivisions = 20;
    this.yDivisions = 20;
    this.reductionRatio = 0.6;
    this.xOffset = 0;
    this.yOffset = 0;
  }
    
  _updateCanvasDimensions() {
        this.outputCanvas.width = this.baseImage.width * this.reductionRatio;
        this.outputCanvas.height = this.baseImage.height * this.reductionRatio;
  }
  
  getReducedPixelBlocks() {
    this._updateCanvasDimensions();
    this.paintInputImage();
    this.loopThroughImageBlocks(this.paintReduceBlocks.bind(this));

    return {
      inputCanvas : this.inputCanvas,
      outputCanvas : this.outputCanvas,
    };  
  }

  paintReduceBlocks( indexX, indexY, blockWidth, blockHeight ) {
    const dx = indexX * this.reductionRatio;
    const dy = indexY * this.reductionRatio;
    //highlight on the original image
    this.inputContext.putImageData(this.brightPixels, 0, 0, indexX, indexY, blockWidth, blockHeight)
    //draw new image block of pixels
    this.outputContext.drawImage(this.baseImage, indexX, indexY, blockWidth, blockHeight, dx, dy, blockWidth+2, blockHeight+2);
  }

  getReversedPixelBlocks(){
    this._updateCanvasDimensions();
    this.paintInputImage();
    this.loopThroughImageBlocks(this.paintReverseBlocks.bind(this));
    this.outputCanvas.style.transform="scale(-1,-1)";
    
    return {
      inputCanvas : this.inputCanvas,
      outputCanvas : this.outputCanvas,
    };  
  }

  paintReverseBlocks( indexX, indexY, blockWidth, blockHeight ) {
    const dx = indexX * this.reductionRatio;
    const dy = indexY * this.reductionRatio;
    const reverseIndexX = this.baseImage.width - indexX - blockWidth;
    const reverseIndexY = this.baseImage.height - indexY - blockHeight;
    //highlight on the original image
    this.inputContext.putImageData(this.brightPixels, 0, 0, reverseIndexX, reverseIndexY, blockWidth, blockHeight)
    //draw new image block of pixels
    this.outputContext.drawImage(this.baseImage, reverseIndexX, reverseIndexY, blockWidth, blockHeight, dx, dy, blockWidth+2, blockHeight+2);
  }

  loopThroughImageBlocks(fn) {
    const divisionWidth = this.baseImage.width / this.xDivisions;
    const divisionHeight = this.baseImage.height / this.yDivisions;
    const blockWidth = divisionWidth * this.reductionRatio;
    const blockHeight = divisionHeight * this.reductionRatio;
    const xPixelOffset = divisionWidth * this.xOffset
    const yPixelOffset = divisionHeight * this.yOffset
  
    for (let indexX = xPixelOffset; indexX+1 < this.baseImage.width; indexX += divisionWidth) {
      for (let indexY = yPixelOffset; indexY+1 < this.baseImage.height; indexY += divisionHeight) {
        fn(indexX, indexY, blockWidth, blockHeight);
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


export default todaysCuriosity;