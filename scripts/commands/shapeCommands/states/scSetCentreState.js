/**
 * SetCentre CommandState for the [Shape Command]{@link ShapeCommand}
 * In this state the Polygon centre is set
 * @extends ScState
 */
class ScSetCentreState extends ScState {

    /**
     * Create an instance of ScSetCentreState
     * @param {ShapeCommand} command
     */
    constructor(command){
        super(command);
    }
    /**
     * Set the centre of the polygon
     * @param event
     */
    onMousePressed(event){
        this.command.centre = this.command.context.chain.createVector(event.offsetX, event.offsetY);
    }
    /**
     * If mouse is released in this state, the operation is aborted, as there is not enough information
     * to draw the polygon
     * @param event
     */
    onMouseReleased(event){
        this.command.reset();
    }
    /**
     * Handler of the Mouse Dragged event (Mouse moved while a button is pressed)
     * Dragging when in SetCentreState means setting the radius of the polygon.
     * This is done changing the state of the command to [SetSizeState]{@link ScSetSizeState}
     * @param event
     */
    onMouseDragged(event){
        this.command.state = this.command.stateFactory.getSetSizeState(this.command, new BottomRightResizeStrategy());
        this.command.state.onMouseDragged(event);
    }
    /**
     * Handler for the KeyPressed event
     * Pressing the Escape key cancels the current drawing and reset to Idle state
     * @param event
     */
    onKeyPressed(event){
        if(event.keyCode === 27 /** ESCAPE */ ){
            this.command.reset();
        }
    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return "Drag the mouse over the canvas to create a selection.<br />" +
            "Releasing the mouse without dragging would cancel the selection.";
    }
}