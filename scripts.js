import 'babel-polyfill';
import loadImage from "blueimp-load-image";
import todaysCuriosity from './todays-curiosity';
import george from './george.jpg';
import getContributorsHTML from './footer';

// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // alert('file api works')
} else {
  alert('Oh no, looks like your browser might be a bit old for this app to work. Maybe try the latest Chrome or Firefox.');
}

let curiosity;

const defaultImage = new Image();
defaultImage.src = george;
defaultImage.onload = () => {
  curiosity = new todaysCuriosity(defaultImage);
  imageSetup(defaultImage);
};

document.getElementById('file-input').onchange = function (e) {
  loadImage(
    e.target.files[0],
    imageSetup,
    {maxWidth: 2000} // Options
  );
};

document.getElementById('get-url').onclick = async function (e) {
  e.preventDefault();
  const fileUrl = document.getElementById('file-url').value;
  document.getElementById('file-url-error').style.display = "block";
  let blob;
  try {
    const response = await fetch(fileUrl);
    blob = await response.blob();
  } catch (error) {
    console.log(error);
  }

  document.getElementById('file-url-error').style.display = "none";
  if(blob.type.substr(0, 5) !== 'image') {
    document.getElementById('file-url-error').style.display = "block";
    return;
  }

  loadImage(
    blob,
    imageSetup,
    {maxWidth: 2000} // Options
  );
}

// Initial sliders output value
document.querySelectorAll('.slider').forEach(slider => document.getElementById(`${slider.id}-output`).value = slider.value)

function imageSetup (img) {
  curiosity.baseImage = img;
  curiosity.paintInputImage();
  curiosity.createBrightpixels();

  const {inputCanvas, outputCanvas} = document.getElementById('switch').checked ? curiosity.getReducedPixelBlocks() : curiosity.getReversedPixelBlocks();

  const inputDiv = document.getElementById('input-display');
  inputDiv.appendChild(inputCanvas);
  const outputDiv = document.getElementById('output-display');
  outputDiv.appendChild(outputCanvas);
  
  SetupUpdateEvents(curiosity);
};

function SetupUpdateEvents(curiosity) {
  const updateAfterSliderChange = (event) => {
    const sliderOutputToBeUpdated = document.getElementById(`${event.target.id}-output`);
    sliderOutputToBeUpdated.value = event.target.value; 
    

    const curiosityKeyToUpdate = event.target.dataset.key;
    const percentageKeys = ['reductionRatio', 'xOffset', 'yOffset'];

    if (percentageKeys.includes(curiosityKeyToUpdate)) {
      curiosity[curiosityKeyToUpdate] = event.target.value / 100;  
    } else {
      curiosity[curiosityKeyToUpdate] = event.target.value;  
    }

    document.getElementById('switch').checked ? curiosity.getReducedPixelBlocks() : curiosity.getReversedPixelBlocks();
  };

  const updateAfterButtonPress = (event) => {
    // Get input value
    let el = event.target.parentNode.children[2];
    if (event.target.value === '+') {
      // min max
      if (Number(el.value) < Number(el.max) && Number(el.value) >= Number(el.min)) {
        event.target.parentNode.children[2].value++
      }
    } else {
      // min max
      if (Number(el.value) <= Number(el.max) && Number(el.value) > Number(el.min)) {
        event.target.parentNode.children[2].value--
      }
    }

    // Pixel functionallity
    const curiosityKeyToUpdate = el.dataset.key;
    const percentageKeys = ['reductionRatio', 'xOffset', 'yOffset'];

    if (percentageKeys.includes(curiosityKeyToUpdate)) {
      curiosity[curiosityKeyToUpdate] = el.value / 100;  
    } else {
      curiosity[curiosityKeyToUpdate] = el.value;  
    }

    document.getElementById('switch').checked ? curiosity.getReducedPixelBlocks() : curiosity.getReversedPixelBlocks();
  }

  const updateAfterSwitchChange = () => {
    document.getElementById('switch').checked ? curiosity.getReducedPixelBlocks() : curiosity.getReversedPixelBlocks();
    const stateText = document.querySelector(".state");
    document.getElementById('switch').checked ? stateText.textContent = 'Reduced' : stateText.textContent = 'Reversed';
  }
  
  const sliders = document.querySelectorAll('.slider');
  const counters = document.querySelectorAll('input[type="button"]');
  
  if (window.innerWidth > 900) {
    // If desktop
    sliders.forEach(slider => slider.addEventListener('input', updateAfterSliderChange));
  } else {
    // If mobile (width < 900)
    counters.forEach(el => el.addEventListener('click', updateAfterButtonPress));
  }
  
  const toggleSwitch = document.getElementById('switch');
  toggleSwitch.addEventListener('input', updateAfterSwitchChange);
}

getContributorsHTML().then(
  contributorsHtml => document.querySelector("#footer").innerHTML = contributorsHtml
);