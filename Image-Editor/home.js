const canvas = document.querySelector('canvas');
if (canvas.width != '500px' || canvas.height != '500px') {
  canvas.width = 450;
  canvas.height = 300;
}
const ctx = canvas.getContext('2d');

const fetchDog = async () =>{
  const response = await fetch('https://picsum.photos/200', {
    method: 'GET',
    options: { mode: 'cors' }
  });
  return response;
}

const generateCanvas = async () => {
  const fetch = time => new Promise(resolve => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Loading...', canvas.width / 2, canvas.height / 2);
    setTimeout(resolve, time);
  });


  fetch(500).then(async () => {
    const data = await fetchDog();
    const image = new Image();
    image.src = data.url;
    image.crossOrigin = "Anonymous";
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.save();
    }
  })
}

const inverColors = () => {
  setTimeout (() =>{ const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i];
    data[i + 1] = 255 - data[i + 1];
    data[i + 2] = 255 - data[i + 2];
  }
  ctx.putImageData(imageData, 0, 0);
},1500)
}

const flipImage = (flipHorizontally, flipVertically) => { 
  setTimeout (() =>{ const image = new Image();
  image.src = canvas.toDataURL();
  image.onload = () => {
    ctx.save();
    ctx.scale(flipHorizontally ? -1 : 1, flipVertically ? -1 : 1);
    ctx.drawImage(
      image,
      flipHorizontally ? -1 * canvas.width : 0,
      flipVertically ? -1 * canvas.height : 0,
      canvas.width,
      canvas.height
      );
      ctx.restore();
    }
  },1000)
}

const greyScale = () => {
  const now=Date.now();
  setTimeout (() =>{ const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
  ctx.putImageData(imageData, 0, 0);
},1000)
const end=Date.now();
console.log(end-now);
}


const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
const flipButtonVertically = document.getElementsByClassName('flip-vertically')[0];
flipButtonVertically.addEventListener('click', () => {
  flipImage(false, true);
});

const flipButtonHorizontally = document.getElementsByClassName('flip-horizontally')[0];
flipButtonHorizontally.addEventListener('click', () => {
  flipImage(true, false);
});

const generateButton = document.getElementsByClassName('generate')[0];
generateButton.addEventListener('click', () => {
  generateCanvas();
});

const greyScaleButton = document.getElementsByClassName('grey-scale')[0];
greyScaleButton.addEventListener('click', () => {
  greyScale();
});

const invertColorsButton = document.getElementsByClassName('invert-colors')[0];
invertColorsButton.addEventListener('click', () => {
  inverColors();
});

const clearButton = document.getElementsByClassName('clear')[0];
clearButton.addEventListener('click', () => {
  clear();
});