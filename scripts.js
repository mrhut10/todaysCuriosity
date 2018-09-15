import loadImage from "blueimp-load-image";
import todaysCuriosity from './todays-curiosity';
//const todaysCuriosity = require('./todays-curiosity');

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // alert('file api works')
} else {
  alert('Oh no, looks like your browser might be a bit old for this app to work. Maybe try the lates Chrome or Firefox. and call ghast busters');
}

const curiosity = new todaysCuriosity(new Image(20,20));

document.getElementById('file-input').onchange = function (e) {
  loadImage(
      e.target.files[0],
      function (img) {
        curiosity.baseImage = img;
        curiosity.paintInputImage();
        curiosity.createBrightpixels();
        // const {inputCanvas, outputCanvas} = curiosity.getReducedPixelBlocks();
        const {inputCanvas, outputCanvas} = curiosity.getReversedPixelBlocks();
    
        const inputDiv = document.getElementById('input-display');
        inputDiv.appendChild(inputCanvas);
        const outputDiv = document.getElementById('output-display');
        outputDiv.appendChild(outputCanvas);
        
        listenerStuff(curiosity);
      },
      {maxWidth: 2000} // Options
  );
};




// mainScript();

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

