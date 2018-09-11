function loadImage() {
  base_image = new Image();
  base_image.src = 'george.jpg';
  base_image.onload = function(){
    const curiosity = new todaysCuriosity(base_image);
    curiosity.setDivisions(10, 10);
    curiosity.setReductionRatio(0.5)
    curiosity.setOffset(0.2, 0.2);
    // const {inputCanvas, outputCanvas} = curiosity.getReducedPixelBlocks();
    const {inputCanvas, outputCanvas} = curiosity.getReversedPixelBlocks();

    const inputDiv = document.getElementById('input-display');
    console.log(inputDiv);
    inputDiv.appendChild(inputCanvas);
    const outputDiv = document.getElementById('output-display');
    outputDiv.appendChild(outputCanvas);

    listenerStuff(curiosity);
  }
}

loadImage();

function listenerStuff(curiosity) {
  const update = (event) => {
    curiosity.setDivisions(xDivisionsSlider.value, yDivisionsSlider.value)
    curiosity.setReductionRatio(ratioSlider.value/100);
    curiosity.setOffset(xOffsetSlider.value/100, yOffsetSlider.value/100);

    sliders.forEach((slider, index) => {
      sliderOutputs[index].value = slider.value;
    });

    const {inputCanvas, outputCanvas} = curiosity.getReversedPixelBlocks();
    
    
    const inputDiv = document.getElementById('input-display');
    inputDiv.appendChild(inputCanvas);
    const outputDiv = document.getElementById('output-display');
    outputDiv.appendChild(outputCanvas);
  };
  
  const xDivisionsSlider = document.getElementById('x-divisions');
  const yDivisionsSlider = document.getElementById('y-divisions');
  const xOffsetSlider = document.getElementById('x-offset');
  const yOffsetSlider = document.getElementById('y-offset');

  const ratioSlider = document.getElementById('ratio');
  
  const sliders = document.querySelectorAll('.slider');
  const sliderOutputs = document.querySelectorAll('.slider-output');
  sliders.forEach(input => input.addEventListener('change', update));

}
