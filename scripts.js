import loadImage from "blueimp-load-image";
import todaysCuriosity from './todays-curiosity';

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // alert('file api works')
} else {
  alert('Oh no, looks like your browser might be a bit old for this app to work. Maybe try the lates Chrome or Firefox. and call ghast busters');
}

document.getElementById('file-input').onchange = function (e) {
  loadImage(
      e.target.files[0],
      function (img) {
        const curiosity = new todaysCuriosity(img);
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

function listenerStuff(curiosity) {
  const update = (event) => {
    const percentageKeys = ['reductionRatio', 'xOffset', 'yOffset'];
    const targetKey = event.target.dataset.key;
    const sliderOutput = document.getElementById(`${event.target.id}-output`);
    sliderOutput.value = event.target.value;

    if (percentageKeys.includes( targetKey ) ) {
      curiosity[targetKey] = event.target.value / 100;  
    } else {
      curiosity[targetKey] = event.target.value;  
    }
  
    const {inputCanvas, outputCanvas} = curiosity.getReversedPixelBlocks();

    inputDiv.appendChild(inputCanvas);
    outputDiv.appendChild(outputCanvas);
  };
  const inputDiv = document.getElementById('input-display');
  const outputDiv = document.getElementById('output-display');
  
  const sliders = document.querySelectorAll('.slider');
  sliders.forEach(input => input.addEventListener('change', update));
}

