/**
 * This class implements a freehand pen and draws a continuous line on the canvas.
 * The colour used is the selected one from the {@link ColourPalette}
 * @extends FreehandCommand
 */
class PenCommand extends FreehandCommand{
    /**
     * Create a new instance of PenCommand
     * Initialize the base class with a new instance of {@link PenStateFactory}
     * @param {FilterManager} context - FilterManager for the command's context
     */
    constructor(context){
        super(context, new PenStateFactory())

    }
}
