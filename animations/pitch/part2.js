
function part2setup() {
  const holder = new Ani.Node();
  scene.addChild(holder);
  let step = -2;
  const words = 'Uses a simple API.'.split(' ');
  let x = canvas.width/2/2 - 200;
  scene.on('next', () => {
    if (PART != 2) return;
    step++;

    if (step <= 3 && step >= 0) {
      x += popupWord(holder, words[step]+' ', x, canvas.height/2/2/4).measure().width;
    } else if (step == 4) {
      createTextIcon(holder);
    } else if (step == 5) {
      createImageIcon(holder);
    } else if (step == 6) {
      createPolygon(holder);
    } else if (step == 7) {
      holder.animate({
        position: { y: -1000 },
        relative: true,
        time: 0.5,
        func: 'inCube'
      });
      PART++;
    }
  });
}

function createTextIcon(holder) {
  const pos = {
    x: canvas.width/2/2/2,
    y: canvas.height/3
  };
  const {x,y} = pos;
  const icon = new Ani.Type.Text({
    text: 'T',
    position: pos,
    textBaseline: 'middle',
    fontSize: 300,
    font: 'Times New Roman',
    stroke: true,
    fill: false,
    strokeStyle: '#fff4d6',
    lineWidth: 3,

    clipping: [
      {x:-100+x, y:-110+y},
      {x:-100+x, y:-110+y},
      {x:100+x, y:-110+y},
      {x:100+x, y:-110+y}
    ]
  });
  const underline = new Ani.Type.Rect({
    size: { x: 0, y: 3 },
    position: { x: 0, y: 110 },
    fillStyle: '#fff4d6',
  });
  icon.addChild(underline);
  holder.addChild(icon);

  underline.animate({time: 0.3}, {
    position: {x: -100},
    size: {x: 200},
    time: 0.5,
    func: 'inOutCube'
  });

  icon.animate({
    clipping: [
      {y:115+y, index: 1},
      {y:115+y, index: 2}
    ],
    time: 0.4,
    func: 'inOutCube'
  });
}

function createImageIcon(holder) {
  const frame = new Ani.Type.Rect({
    size: { x: 300, y: 200 },
    position: { x: canvas.width/2/2 - 150, y: canvas.height/3 - 100 },
    fill: false,
    stroke: true,
    strokeStyle: '#fff4d6',
    lineWidth: 10
  });
  holder.addChild(frame);

  const clippingPoints = [
    {x: 15, y: 185},
    {x: 285, y: 185},
    {x: 285, y: 15},
    {x: 15, y: 15},
  ];

  const clip = new Ani.Node({
    clipping: clippingPoints
  });
  frame.addChild(clip);

  const mountainPoints = [
    {x: 0, y: 0},
    {x: 180, y: 230},
    {x: -130, y: 230}
  ];

  const mountain1 = new Ani.Type.Polygon({
    points: mountainPoints,
    position: {x: 80, y: 300},
    fillStyle: '#fff4d6',
  });
  const mountain2 = new Ani.Type.Polygon({
    points: mountainPoints,
    position: {x: 200, y: 300},
    fillStyle: '#fff4d6',
  });
  const sun = new Ani.Type.Circle({
    position: {x: 50, y: 230},
    radius: 30,
    fillStyle: '#fff4d6',
  });

  clip.addChild(mountain1);
  clip.addChild(mountain2);
  clip.addChild(sun);

  mountain1.animate({
    position: {y: 60},
    time: 1.0,
    func: 'outCube'
  });
  mountain2.animate({time: 0.3}, {
    position: {y: 90},
    time: 1.0,
    func: 'outCube'
  });
  sun.animate({time: 0.3}, {
    position: {x: 230, y: 50},
    passThrough: {x: 120, y: 100 },
    time: 2.0,
    func: 'outQuad'
  });
}

function createPolygon(holder) {
  const pointer = new Ani.Node({
    position: { x: canvas.width/2/1.3, y: canvas.height/2/2 }
  });
  const pointsToHit = [
    {x: -100, y: 40},
    {x: 100, y: -50},
    {x: 90, y: 30},
    {x: -80, y: 70},
    {x: 60, y: 160},
    {x: -200, y: -30}
  ];
  const rects = [];
  for (let i = 0; i < 4; i++) {
    const rect = new Ani.Type.Rect({
      position: {x: -28, y: -2},
      size: {x: 20, y: 4},
      origin: {x: 28, y: 2},
      rotation: Math.PI/2*i,
      fillStyle: '#fff4d6'
    });
    rects.push(rect);
    pointer.addChild(rect);
  }
  holder.addChild(pointer);

  const RECT_CHANGES = [
    {x: 10, y: 0},
    {y: 10, x: 0},
    {x: -10, y: 0},
    {y: -10, x: 0}
  ]

  const drawingPolygon = new Ani.Type.Polygon({
    points: [],
    stroke: true,
    lineWidth: 10,
    strokeStyle: '#fff4d6',
    fillStyle: '#f9d43e'
  });
  holder.addChild(drawingPolygon);

  const clickPointer = () => {
    rects.forEach((rect, index) => {
      rect.animate({
        passThrough: { x: rect.position.x + RECT_CHANGES[index].x, y: rect.position.y + RECT_CHANGES[index].y },
        time: 0.2,
        func: 'inOutCube'
      });
    });
  }

  let lastAnimation = null;
  for (let i = 0; i < pointsToHit.length; i++) {
    const point = pointsToHit[i];
    lastAnimation = pointer.animate({time: 0.6*i}, {
      position: point,
      relative: true,
      time: 0.4,
      func: 'inOutCube'
    }).finished(() => {
      clickPointer();
      setTimeout(() => {
        let newPoints = drawingPolygon.points.slice(0, drawingPolygon.points.length/2)
        newPoints.push(pointer.position.clone());
        drawingPolygon.points = newPoints.concat(newPoints.slice(0).reverse());
      }, 100);
    });
  }

  pointer.animate({time: 0.6*pointsToHit.length}, {
    position: pointer.position.clone().add(new Ani.Victor(pointsToHit[0].x, pointsToHit[0].y)),
    time: 0.4,
    func: 'inOutCube'
  }).finished(() => {
    clickPointer();
    setTimeout(() => {
      drawingPolygon.points = drawingPolygon.points.slice(0, drawingPolygon.points.length/2);
      pointer.animate({time: 0.2}, {
        position: {x: -120, y: -60},
        alpha: -0.99,
        relative: true,
        time: 0.4,
        func: 'inOutCube',
      }).finished(() => {
        holder.removeChild(pointer);
      });
    }, 100);
  })
}
