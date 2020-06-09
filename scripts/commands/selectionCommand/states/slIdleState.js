/**
 * Idle state for the [Selection Command]{@link SelectionCommand}
 * @extends SlState
 */
class SlIdleState extends SlState {
    /**
     * Create an instance of SlIdleState
     * @param {SelectionCommand} command
     */
    constructor(command){
        super(command);
        this.command.context.chain.cursor("default");
        this.draw(); //needed to clean after Escape
        this.command.context.chain.loadPixels();  //without this line the canvas is not refreshed
    }

    /**
     * Start a new selection operation. The top-left corner of the selection box is set and the StartSelection state
     * is set on the command.
     * @param event
     */
    onMousePressed(event){
        this.command.selectionBBox.x = event.offsetX;
        this.command.selectionBBox.y = event.offsetY;
        this.command.state = this.command.stateFactory.getStartSelectionState(this.command);
    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return "Click on the canvas to create a selection.";
    }
}