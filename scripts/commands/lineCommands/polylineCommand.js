/**
 * This class implements a drawing tool that draws a continuous polyline on the canvas.
 * Each segment of the polyline is straight
 * The colour used is the currently selected colour from the {@link ColourPalette}
 * @extends LineCommand
 */
class PolylineCommand extends LineCommand{
    /**
     * Create an instance of PolylineCommand
     * Initialize the base class with a new instance of {@link PolylineStateFactory}
     * @param {FilterManager} context - FilterManager for the command's context
     */
    constructor(context){
        super(context, new PolylineStateFactory())
    }
}

