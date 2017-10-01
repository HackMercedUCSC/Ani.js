
let scene;
let canvas;

let PART = 0;
const FONT = 'MADE GoodTime Grotesk';
let WIDTH = 0;
let HEIGHT = 0;

function extend(obj, withObj) {
  Object.keys(withObj).forEach(key => {
    if (obj[key] === undefined) obj[key] = withObj[key];
  });
  return obj;
}

function ready() {
  canvas = document.getElementById('canvas');
  scene = new Ani.Node();
  Ani.init(scene, canvas.getContext('2d'), window.innerWidth, window.innerHeight)

  WIDTH = canvas.width/2;
  HEIGHT = canvas.height/2;

  const background = new Ani.Type.Rect({ // Pos default 0,0
    size: {x: canvas.width, y: canvas.height},
    fillStyle: '#f4cc29'
  });

  scene.addChild(background);

  const textContainer = new Ani.Node();
  scene.addChild(textContainer);
  texter(textContainer);

  textContainer.origin = new Ani.Victor(WIDTH/4, HEIGHT/2 - 50)
  textContainer.scale = new Ani.Victor(13, 13);
  scene.on('next', () => {
    if (PART != 0) return;
    textContainer.animate({ scale: {x: 1, y: 1}, time: 0.5, func: 'inOutQuart'});
    PART = 1;
  });

  part2setup();
  part3setup();
  part4setup();
}

const textSettings = {
  font: FONT,
  fontSize: 50,
  fillStyle: '#fff4d6',
  textAlign: 'left'
};

function texter(textContainer) {
  const title = new Ani.Type.Text(extend({
    text: 'Ani.JS',
    fontSize: 200,
    textAlign: 'center',
    position: {x: canvas.width/2/2, y: canvas.height/2/2}
  }, textSettings));

  textContainer.addChild(title);

  const words =
    'An animation library and tool created in JavaScript. \n \n -Educational \n -Intuitive \n -Powerful'.split(' ');

  let wordIndex = -1;
  let left = 0;
  let line = 1;
  let skips = 0;
  const next = () => {
    if (PART != 1) return;
    wordIndex++;
    if (words[wordIndex] == '\n') {
      line++;
      left = 0;
      if (line > 3) skips++;
      next();
      return;
    }
    if (wordIndex == words.length) {
      wordIndex++;
      textContainer.animate({
        position: { y: -1000 },
        relative: true,
        time: 0.5,
        func: 'inCube'
      }).finished(() => scene.removeChild(textContainer));
      PART = 2;
      return;
    }
    left += popupWord(textContainer, words[wordIndex]+' ', canvas.width/2/2 - title.measure().width/2 + left, line*55 + canvas.height/2/2).measure().width;
    if (left >= title.measure().width - 100) {
      left = 0;
      line++;
      if (line > 3) skips++;
    }

    if (skips > 0) {
      textContainer.animate({
        position: { y: -50*skips },
        relative: true,
        time: 0.5,
        func: 'inOutCube'
      });
      skips = 0;
    }
  }

  scene.on('next', next);
}

function popupWord(textContainer, word, x, y) {

  const position = {x: x, y: y}
  const wordText = new Ani.Type.Text(extend({
    text: word,
    position: position,
    clipping: [
      {x: x - 50, y: y - 40},
      {x: x - 50, y: y - 40},
      {x: x + 500, y: y - 40},
      {x: x + 500, y: y - 40}
    ]
  }, textSettings));

  wordText.animate({
    clipping: [
      {index: 1, y: y + 15},
      {index: 2, y: y + 15}
    ],
    time: 0.5,
    func: 'outCube'
  });

  textContainer.addChild(wordText);
  return wordText;
}
