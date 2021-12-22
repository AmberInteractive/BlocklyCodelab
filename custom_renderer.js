
CustomRenderer = function(name) {
  CustomRenderer.superClass_.constructor.call(this, name);
};
Blockly.utils.object.inherits(CustomRenderer,
    Blockly.blockRendering.Renderer);

Blockly.blockRendering.register('customrenderer', CustomRenderer);

CustomConstantsProvider = function() {
  // Set up all of the constants from the base provider.
  CustomConstantsProvider.superClass_.constructor.call(this);

  // Override a few properties.
  /**
   * The width of the notch used for previous and next connections.
   * @type {number}
   * @override
   */
  this.NOTCH_WIDTH = 20;  //Notches adjusted to suit design better

  /**
   * The height of the notch used for previous and next connections.
   * @type {number}
   * @override
   */
  this.NOTCH_HEIGHT = 20;

  /**
   * Rounded corner radius.
   * @type {number}
   * @override
   */
  this.CORNER_RADIUS = 0; //Blocks squared off to compliment rectangular connections
  /**
   * The height of the puzzle tab used for input and output connections.
   * @type {number}
   * @override
   */
  this.TAB_HEIGHT = 20; //Tab height changed to match notches for a consistent feel
};
Blockly.utils.object.inherits(CustomConstantsProvider,
    Blockly.blockRendering.ConstantProvider);

CustomRenderer.prototype.makeConstants_ = function() {
  return new CustomConstantsProvider();
};
/**
 * Return a rectangular notch for use with previous and next connections.
 */
CustomConstantsProvider.prototype.makeRectangularPreviousConn = function() {
  var width = this.NOTCH_WIDTH;
  var height = this.NOTCH_HEIGHT;

  /**
   * Since previous and next connections share the same shape
   * you can define a function to generate the path for both.
   */
  function makeMainPath(dir) {
    return Blockly.utils.svgPaths.line(
        [
          Blockly.utils.svgPaths.point(0, height),
          Blockly.utils.svgPaths.point(dir * width, 0),
          Blockly.utils.svgPaths.point(0, -height)
        ]);
  }
  var pathLeft = makeMainPath(1);
  var pathRight = makeMainPath(-1);

  return {
    width: width,
    height: height,
    pathLeft: pathLeft,
    pathRight: pathRight
  };
};

/**
 * Return a rectangular puzzle tab for use with input and output connections.
 */
CustomConstantsProvider.prototype.makeRectangularInputConn = function() {
  var width = this.TAB_WIDTH;
  var height = this.TAB_HEIGHT;

  /**
   * Since input and output connections share the same shape you can
   * define a function to generate the path for both.
   */
  function makeMainPath(up) {
    return Blockly.utils.svgPaths.line(
        [
          Blockly.utils.svgPaths.point(-width, 0),
          Blockly.utils.svgPaths.point(0, -1 * up * height),
          Blockly.utils.svgPaths.point(width, 0)
        ]);
  }

  var pathUp = makeMainPath(1);
  var pathDown = makeMainPath(-1);

  return {
    width: width,
    height: height,
    pathDown: pathDown,
    pathUp: pathUp
  };
};

/**
 * @override
 */
CustomConstantsProvider.prototype.init = function() {
  CustomConstantsProvider.superClass_.init.call(this);
  // Add calls to create shape objects for the new connection shapes.
  this.RECT_PREV_NEXT = this.makeRectangularPreviousConn();
  this.RECT_INPUT_OUTPUT = this.makeRectangularInputConn();
};

/**
 * @override
 */
CustomConstantsProvider.prototype.shapeFor = function(
    connection) {
  switch (connection.type) {
    case Blockly.INPUT_VALUE:
    case Blockly.OUTPUT_VALUE:
      return this.RECT_INPUT_OUTPUT;
    case Blockly.PREVIOUS_STATEMENT:
    case Blockly.NEXT_STATEMENT:
      return this.RECT_PREV_NEXT;
    default:
      throw Error('Unknown connection type');
  }
};

/* 

Code left at this stage as squared edges were desired final outcome, 
presenting a more modern and grown up user interface 

*/

