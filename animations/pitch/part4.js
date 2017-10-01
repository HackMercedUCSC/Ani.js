
function part4setup() {
  const holder = new Ani.Node({
    position: { y: 2000 }
  });
  scene.addChild(holder);

  const backgroundFade = new Ani.Type.Rect({
    position: { x: -2, y: -2 },
    size: {x: WIDTH + 4, y: HEIGHT + 4},
    fillStyle: '#000',
    alpha: 0
  });
  holder.addChild(backgroundFade);

  const aniContainer = new Ani.Type.Rect({
    position: {x: WIDTH/2 - 200, y: HEIGHT/2 - 120},
    size: {x: 400, y: 240},
    stroke: true,
    fill: false,
    strokeStyle: '#fff4d6',
    lineWidth: 10
  });
  holder.addChild(aniContainer);

  const aniText = new Ani.Type.Text({
    position: {x: aniContainer.size.x/2, y: aniContainer.size.y/2},
    font: FONT,
    fontSize: 80,
    textBaseline: 'middle',
    textAlign: 'center',
    fillStyle: '#fff4d6',
    text: 'Ani.JS'
  });
  aniContainer.addChild(aniText);

  const titles = [];
  ['Khan Academy', 'Wikipedia', 'Code School', 'Medium'].forEach(str => {
    titles.push(new Ani.Type.Text({
      position: {x: WIDTH/2, y: -150},
      font: FONT,
      fontSize: 150,
      textBaseline: 'middle',
      textAlign: 'center',
      fillStyle: '#fff4d6',
      text: str,
      alpha: 0
    }))
  });
  titles.forEach(title => holder.addChild(title));
  const INCOMING_TITLE = {position: {y: 150}, time: 0.5, func: 'outCube', alpha: 1};
  const OUTGOING_TITLE = {position: {y: -150}, time: 0.5, func: 'outCube'};

  let step = -1;
  const paras = []
  scene.on('next', () => {
    if (PART != 4) return;

    step++;
    if (step == 0) {
      holder.animate({
        position: {y: 0},
        time: 1.0,
        func: 'outCube'
      });
      titles[0].animate(INCOMING_TITLE);
    } else if (step == 1) {
      paras.push(createParagraph({x: WIDTH/4, y: HEIGHT/4}, WIDTH/4, HEIGHT/2 - 20*1.3));
      paras.push(createParagraph({x: WIDTH/4, y: HEIGHT/2}, WIDTH/2, HEIGHT*3/4));

      aniContainer.animate({
        position: {x: WIDTH/2 + 20, y: HEIGHT/4},
        time: 1.0,
        func: 'inOutCube'
      });

      paras.forEach(p => holder.addChild(p));

      titles[0].animate(OUTGOING_TITLE);
      titles[1].animate(INCOMING_TITLE);
    } else if (step == 2) {
      while (paras.length) {
        const p = paras.pop();
        p.animate({ // Hide paragraphs
          position: {y: 1500},
          time: 1.0,
          func: 'inCube'
        }).finished(() => holder.removeChild(p));
      }

      aniContainer.animate({
        position: {x: WIDTH/2 - aniContainer.size.x/2, y: HEIGHT/4},
        time: 1.0,
        func: 'inOutCube'
      });

      paras.push(createParagraph({x: WIDTH/4, y: HEIGHT/2}, WIDTH/2, HEIGHT*7/8));
      paras.forEach(p => holder.addChild(p));

      titles[1].animate(OUTGOING_TITLE);
      titles[2].animate(INCOMING_TITLE);
    } else if (step == 3) {
      while (paras.length) {
        const p = paras.pop();
        p.animate({ // Hide paragraphs
          position: {y: 1500},
          time: 1.0,
          func: 'inCube'
        }).finished(() => holder.removeChild(p));
      }

      paras.push(createParagraph({x: WIDTH/4, y: HEIGHT/4}, WIDTH/2, HEIGHT*3/8 - 20*1.3));
      paras.push(createParagraph({x: WIDTH/4, y: HEIGHT*5/8}, WIDTH/2, HEIGHT*7/8));
      paras.forEach(p => holder.addChild(p));

      aniContainer.animate({
        position: {x: WIDTH/2 - aniContainer.size.x/2, y: HEIGHT/2 - aniContainer.size.y/2},
        time: 1.0,
        func: 'inOutCube'
      });

      titles[2].animate(OUTGOING_TITLE);
      titles[3].animate(INCOMING_TITLE);
    } else if (step == 4) {
      while (paras.length) {
        const p = paras.pop();
        p.animate({ // Hide paragraphs
          position: {y: 1500},
          time: 1.0,
          func: 'inCube'
        }).finished(() => holder.removeChild(p));
      }

      titles[3].animate(OUTGOING_TITLE);

      aniContainer.animate({
        position: {y: -200},
        relative: true,
        time: 1.0,
        func: 'inOutCube'
      });

      backgroundFade.animate({
        alpha: 0.95,
        time: 1.0,
        func: 'inOutCube'
      });

      const image = new Ani.Type.Image({
        src: './logo.png',
        position: {x: WIDTH/2 - 146/2, y: 1500}
      });
      holder.addChild(image);
      image.animate({
        position: {y: HEIGHT*3/4 - 308/2},
        time: 1.0,
        func: 'inOutCube'
      });

    }
  });
}

function createParagraph(start, width, maxDepth) {
  const para = new Ani.Node({
    position: start
  });
  let top = 0;
  let count = 0;
  while (start.y + top <= maxDepth) {
    const indent = count == 0 || (count % 2 == 0 && Math.random() < 1/5);
    const rect = new Ani.Type.Rect({
      position: {x: indent ? 150 : 0, y: top},
      size: {x: 0, y: 20},
      alpha: 0,
      radius: 10,
      fillStyle: '#fff4d6'
    });
    top += rect.size.y*1.3;
    para.addChild(rect);

    rect.animate({time: count*0.07}, {
      size: {x: width - (indent ? 150 : 0)},
      alpha: 1,
      time: 0.4,
      func: 'inOutCube'
    });

    count++;
  }
  return para;
}
