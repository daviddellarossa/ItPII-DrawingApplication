/**
 * Base class for all the Freehand commands
 * This class implements a freehand pen and draws a continuous line on the canvas.
 * Pressing the left mouse button in one point begins the drawing, dragging the mouse around adds new points to
 * the line, releasing the mouse button ends the line off.
 * @extends ToolCommand
 */
class FreehandCommand extends ToolCommand{
    /**
     * {@link ToolCommand.state}
     * @returns {FcState} - Current state of the Command
     */
    get state() { return this._state; }

    /**
     *  {@link ToolCommand.state}
     * @param {FcState} value - The current state to set for the command
     */
    set state(value){
        if(value instanceof FcState){
            this._state = value;
            console.log("Transition to state " + value.toString());
        } else {
            throw new Error("value is expected to be an instance of FcState");
        }
        if(this.newTipAvailableObserver)
            this.newTipAvailableObserver(value.tip);
    }
    /** {@link ToolCommand.stateFactory() */
    get stateFactory() { return this._stateFactory; }

    /**
     * Return the array containing the points that made the line drawn so far
     * @returns {[{x: number, y: number}]}
     */
    get points(){ return this._points; }

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
     * Create a new instance of FreehandCommand
     * Set the initial state to IdleState
     * @param {FilterManager} context - FilterManager for the command's context
     * @param {FcStateFactory} stateFactory - CommandState factory for the FreehandCommand
     */
    constructor(context, stateFactory){
        super(context);

        if(stateFactory instanceof FcStateFactory){
            /**
             * StateFactory for FreehandCommand
             * @type {FcStateFactory}
             * @private
             */
            this._stateFactory = stateFactory;
        } else {
            throw new Error("value is expected to be an instance of FcStateFactory");
        }
        /**
         *
         * @type {[{x: number, y: number}]}
         * @private
         */
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

