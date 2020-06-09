/**
 * This command draws a generic shape on the canvas.
 * The type of shape drawn is managed by the subclasses.
 *
 * @extends ToolCommand
 */
class ShapeCommand extends ToolCommand{
    /**
     * {@link ToolCommand.state}
     * @returns {ScState} - Current state of the Command
     */
    get state() { return this._state; }

    /**
     *  {@link ToolCommand.state}
     * @param {ScState} value - The current state to set for the command
     */
    set state(value){
        if(value instanceof ScState){
            this._state = value;
            console.log("Transition to state " + value.toString());
        } else {
            throw new Error("value is expected to be an instance of ScState");
        }
        if(this.newTipAvailableObserver)
            this.newTipAvailableObserver(value.tip);
    }

    /**
     * Create an instance of ShapeCommand
     * Set the initial state to IdleState
     * @param {FilterManager} context - FilterManager for the command's context
     * @param {ScStateFactory} stateFactory - CommandState factory for the LineCommand
     */
    constructor(context, stateFactory){
        super(context);
        this.state = new ScIdleState(this);
    }
}