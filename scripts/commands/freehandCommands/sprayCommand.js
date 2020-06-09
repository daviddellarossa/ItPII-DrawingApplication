/**
 * This class implements a freehand spray and draws a continuous line on the canvas.
 * The line is made of a number of random points spread around the current mouse position.
 * The colour used is the selected one from the {@link ColourPalette}
 * @extends FreehandCommand
 */
class SprayCommand extends FreehandCommand{
    /**
     *
     * @return {number}
     */
    get numOfPoints(){ return this._numOfPoints; }

    /**
     *
     * @param {number} value
     */
    set numOfPoints(value) { this._numOfPoints = value; }

    /**
     *
     * @return {number}
     */
    get spread(){ return this._spread; }

    /**
     *
     * @param {number} value
     */
    set spread(value) { this._spread = value; }


    /**
     * Create a new instance of SprayCommand
     * Initialize the base class with a new instance of {@link SprayStateFactory}
     * @param {FilterManager} context - FilterManager for the command's context
     */
    constructor(context){
        super(context, new SprayStateFactory());

        this._numOfPoints = 13;
        this._spread = 10;
    }
}
