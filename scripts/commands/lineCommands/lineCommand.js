/**
 * Base class for all the Line commands, tools to draw poly-lines on the canvas.
 * The first click on the canvas creates the starting point of the polyline.
 * Every following click adds a new point to the polyline.
 * Double clicking closely enough to the starting point closes the polyline into a polygon, otherwise, it just
 * ends the polyline.
 * The Enter key always ends the polyline, whereas the Escape key always cancels the polyline.
 * @extends ToolCommand
 */
class LineCommand extends ToolCommand{
    /**
     * Return the threshold value used to close the polyline when the double-click is done close to the staring point
     * @returns {number} - Maximum distance in pixels of the final point from the initial point, to make the line closed
     */
    get closeThreshold() { return 10; }

    /**
     * Set the thickness of the trait
     * @param {number} value
     */
    set thickness(value){ this._thickness = value; }

    /**
     * Get the thickness of the trait
     * @return {number}
     */
    get thickness(){ return this._thickness; }

    /**
     * {@link ToolCommand.state}
     * @returns {LcState} - Current state of the Command
     */
    get state() { return this._state; }

    /**
     *  {@link ToolCommand.state}
     * @param {LcState} value - The current state to set for the command
     */
    set state(value){
        if(value instanceof LcState){
            this._state = value;
            console.log("Transition to state " + value.toString());
        } else {
            throw new Error("value is expected to be an instance of LcState");
        }
        if(this.newTipAvailableObserver)
            this.newTipAvailableObserver(value.tip);
    }

    /**
     * Return the array containing the points that made the line drawn so far
     * @returns {[]|*[]}
     */
    get points(){ return this._points; }

    /**
     * Create an instance of LineCommand
     * Set the initial state to IdleState
     * @param {FilterManager} context - FilterManager for the command's context
     * @param {LcStateFactory} stateFactory - CommandState factory for the LineCommand
     */
    constructor(context, stateFactory){
        super(context);

        if(stateFactory instanceof LcStateFactory){
            this._stateFactory = stateFactory;
        } else {
            throw new Error("value is expected to be an instance of LcStateFactory");
        }

        this._points = [];
        this.state = this.stateFactory.getIdleState(this);
    }

    /**
     * {@link ToolCommand.reset}
     */
    reset(){
        this.state = this.stateFactory.getIdleState(this);
    }
}

