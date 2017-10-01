
function part3setup() {
  const screenHolder = new Ani.Node({
    position: { y: 2000 }
  });
  const sectionHolder = new Ani.Node({
    position: { y: 2000 }
  });
  const circleHolder = new Ani.Node();

  scene.addChild(screenHolder);
  scene.addChild(sectionHolder);

  sectionHolder.addChild(circleHolder);

  const screen = new Ani.Type.Rect({
    position: { x: 100, y: 100 },
    size: { x: canvas.width/2 - 200, y: canvas.height/2 - 300 },
    lineWidth: 10,
    stroke: true,
    fill: false,
    strokeStyle: '#fff4d6'
  });
  screenHolder.addChild(screen);

  const videoEditorText = new Ani.Type.Text({
    position: { x: screen.position.x + screen.size.x/2, y: screen.position.y + screen.size.y/2 },
    font: FONT,
    fontSize: 100,
    text: 'Video Editors?',
    textBaseline: 'middle',
    textAlign: 'center',
    fillStyle: '#fff4d6'
  });
  screen.addChild(videoEditorText);

  const slider = new Ani.Type.Rect({
    position: { x: 100, y: canvas.height/2 - 150 },
    size: { x: canvas.width/2 - 200, y: 8 },
    fillStyle: '#fff4d6'
  });
  screenHolder.addChild(slider);

  const ticker = new Ani.Type.Rect({
    position: { x: 200, y: -16 },
    size: { x: 8, y: 32 },
    fillStyle: '#fff4d6'
  });
  slider.addChild(ticker);

  const sections = [];
  for (let i = 0; i < 3; i++) {
    const section = new Ani.Type.Rect({
      position: { x: WIDTH/3*i, y: 0 },
      size: { x: WIDTH/3, y: HEIGHT },
      fillStyle: '#000',
      alpha: 0.5
    });
    sectionHolder.addChild(section);

    const circle = new Ani.Type.Circle({
      position: { x: WIDTH/3*i + WIDTH/6, y: HEIGHT/3 },
      radius: 50,
      fill: false,
      stroke: true,
      strokeStyle: '#fff4d6',
      lineWidth: 20,
      endAngle: 0,
      alpha: 0
    });
    circleHolder.addChild(circle);

    const circleText = new Ani.Type.Text({
      position: { x: 0, y: 0 },
      scale: {x: 0, y: 0},
      font: FONT,
      fontSize: 50,
      text: i+1,
      textBaseline: 'middle',
      textAlign: 'center',
      fillStyle: '#fff4d6'
    });
    circle.addChild(circleText);

    const descriptionText = new Ani.Type.Text({
      position: { x: 0, y: 250 },
      scale: {x: 0, y: 0},
      font: FONT,
      fontSize: 70,
      text: ['Interactivity', 'Dynamic', 'Expandability'][i],
      textBaseline: 'middle',
      textAlign: 'center',
      fillStyle: '#fff4d6'
    });
    circle.addChild(descriptionText);


    sections.push(section);
  }
  const SHOW_SECTION = {alpha: 0.01, time: 1.0, func: 'inOutCube'};
  const HIDE_SECTION = {alpha: 0.5, time: 1.0, func: 'inOutCube'};
  const ANIMATE_CIRCLE = {endAngle: Math.PI*2, time: 1.0, func: 'inOutCube', alpha: 1.0};
  const ANIMATE_CIRCLE_TEXT = {scale: {x: 1, y: 1 }, time: 0.7, func: 'outElastic'};

  let step = -1;
  scene.on('next', () => {
    if (PART != 3) return;

    step++;

    if (step == 0) {
      screenHolder.animate({
        position: { y: 0 },
        time: 1.0,
        func: 'outCube'
      });
    } else if (step == 1) {
      ticker.animate({
        position: {x:600},
        relative: true,
        time: 1.0,
        func: 'inOutCube'
      });
      ticker.animate({time: 1.5}, {
        position: {x:-350},
        relative: true,
        time: 1.0,
        func: 'inOutCube'
      });
      ticker.animate({time: 3.0}, {
        position: {x:150},
        relative: true,
        time: 1.5,
        func: 'inOutCube'
      });
    } else if (step == 2) {
      screenHolder.animate({
        position: {y:-1500},
        time: 0.5,
        func: 'inCube'
      });
      sectionHolder.animate({
        position: {y: 0},
        time: 1.0,
        func: 'outCube'
      });
    } else if (step >= 3 && step <= 5) {
      const cur = step - 3;
      const prev = cur - 1;
      if (prev >= 0) sections[prev].animate(HIDE_SECTION)
      sections[cur].animate(SHOW_SECTION);
      circleHolder.children[cur].animate(ANIMATE_CIRCLE);
      circleHolder.children[cur].children[0].animate(ANIMATE_CIRCLE_TEXT);
      circleHolder.children[cur].children[1].animate({time: 0.5}, ANIMATE_CIRCLE_TEXT);
    } else if (step == 6) {
      sectionHolder.animate({
        position: {y:-1500},
        time: 0.5,
        func: 'inCube'
      });
      PART++;
    }
  });
}
