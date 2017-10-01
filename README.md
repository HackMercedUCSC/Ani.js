
# Ani.js

Ani.js is an animation library written in JavaScript built to make simply animations quick and easy.

## Usage

Install via git using npm. Then, either require the module or compile it using babel!

## Ani.Victor

Pointer to victor.js

## Ani.Node(opt)

A basic node which does not draw anything by default.

### node.position

Victor containing x and y

### node.parent

Parent node (may be null)

### node.children

Array of this node's children

### node.scale

Victor containing x and y for the scale in the respective directions (scaled about origin).

### node.rotation

Rotation in radians (about origin).

### node.origin

Victor containing x and y for the node to be rotated/scaled about.

### node.clipping

Array of points (objects containing x/y) to clip the node's drawing content to. Only content inside this polygon is drawn.

### node.alpha

Value from 0 to 1, 0 being invisible, 1 being visible.

### node.filters

Object containing filters the node can run. Filters can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter) and are accessed by setting keys on the filters object (for example `node.filters.blur = 3` or `node.filters.contrast = 70`). If a value is -1, it will inherit the filter from its parent. `node.filters.dropShadow` has a special case:

#### node.filters.dropShadow

```js
{
  offset: Victor object,
  blurRadius: int in pixels,
  color: Basic css color (such as rgb() string, hexidecimal, or words such as 'white'),
  inherit: Boolean on whether or not to inherit this value from the parent (defualt true)
}
```

### node.animate(condition1, condition2, ..., animationRequest)

The animate method (basically the most important method in the entire library) takes zero or more conditions, then an animationRequest (OR array of animationRequests).

Conditions wait until the previous condition has been passed. Once the last condition passes, the animation is run. Only one key/value in a condition object must pass to continue to the next condition.

Condition:

```js
{
  time: Number of secons to wait
  event: String, event to wait for
  target: Object the event will occur on
  test: Method which is called every update, waits for it to return true
}
```

### animationRequest

All integers of any deepness in a node can be modified (except for the described properties below). Given an array of objects, the objects may contain an `index` key/value to represent a different index in the node's array.

### node.addChild(child)

Adds the `child` node as a child (must not already be a child and must not have a parent).

### node.removeChild(child)

Removes the `child` from the node's children.

### node.setPosition(pos)

Simple method to set the position which will convert `pos` to a Victor if given a different object with x/y key/values.

### node.update(delta)

Called every update with `delta` being the time since the last update. Only useful when extending Node.

### node.draw()

Called every update before this node's children are updated. Only useful when extending Node.

#### Examples

```js
{
  position: { x: 50 }, // Animate to x: 50 (y will remain the same)
  time: 2.0 // Over 2 seconds
}
```

Animating objects in arrays:

```js
{
  relative: true,
  points: [
    { x: 30, index: 2 } // Animate the x of 2nd element in the node's points array 30 to the right (because relative is true)
  ]
}
```

#### animationRequest.time

Number of seconds for animation to complete

#### animationRequest.func

Easing function to use (such as `linear`, `inBounce`, or `inOutCube`). A full list can be found in `/src/lib/easings.js`.

#### animationRequest.relative

Whether all modified values should be relatively modified as oppose to going to the absolute value.

#### animationRequest.passThrough

A position which the node will animate through when running the animation.

## Animation

Emits `finished` with the animationRequest as a parameter when complete and `animationFinished` on the node with parameters (animationRequest, animationObject).

### animation.time

Amount of time passed in animation.

### animation.timeLength

Total time the animation takes to occur.

### animation.finished(cb)

Quick way of doing `animation.once('finished', cb)`. Returns the animation.

## Shape(opt) extends Ani.Node

Values are all set before drawing and reset when finished

### shape.fill

Boolean on whether or not to fill shape, by default `true`.

### shape.stroke

Boolean on whether or not to stroke shape, by default `false`.

### Shape properties

The remaining values are properties on shape that are modified exactly the same as they are on the canvas's context: `strokeStyle, fillStyle, lineWidth, lineCap, lineJoin`.

## Ani.Rect(opt) extends Ani.Shape

### rect.size

Victor to represent the width and height of the rectangle (from the top left corner)

### rect.radius

Radius in pixels to curve corners. By default `0`.

## Ani.Circle(opt) extends Ani.Shape

### circle.radius

Radius in pixels of circle.

### circle.startAngle

Start angle of circle in radians (in case only an arc is necessary).

### circle.endAngle

End angle of circle in radians.

## Ani.Polygon(opt) extends Ani.Shape

### polygon.points

Array of victors containing the points of the polygon relative to the node's center.

### polygon.curves

Optional points to use as control points for quadratic beziers between the current point and the next point. Can also include `index` key to points to a specific starting index in `polygon.points`.

## Ani.Text(opt) extends Ani.Shape

### text.text

### text.font

### text.fontSize

Integer, in pixels.

### text.textAlign

See canvas's [textAlign](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign).

### text.textBaseline

See canvas's [textBaseline](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline).

### text.measure()

Returns [TextMetrics](https://developer.mozilla.org/en-US/docs/Web/API/TextMetrics) to get info like width and height of text without drawing it.

## Ani.Image(opt) extends Ani.Node

### img.image

The JavaScript Image object.

### img.image.src

The source of the image, passed into Ani.Image's options as simply `src`.

### img.size

Victor for the width/height of image (by default the actual image size)

### img.offset

Victor of which x,y to start drawing the image from relative to itself (by default 0,0)

### img.crop

Victor for the width/height of the image to drop, by default `null` (no cropping).

### img.ready

Whether or not the image has loaded yet and can be drawn.
