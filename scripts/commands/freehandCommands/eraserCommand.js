/**
 * This class implements a freehand pen and draws a continuous line on the canvas.
 * The colour used is white, as this is the colour of the background.
 * In case of evolution of the ColourPalette, and implementation of a variable background colour, this needs
 * to be set to the colourPalette's background colour.
 * @extends FreehandCommand
 */
class EraserCommand extends FreehandCommand{
    /**
     * Create a new instance of EraserCommand
     * Initialize the base class with a new instance of {@link EraserStateFactory}
     * @param {FilterManager} context - FilterManager for the command's context
     */
    constructor(context){
        super(context, new EraserStateFactory())
    }
}
