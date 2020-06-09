/**
 * StartSelectionState for the [Selection Command]{@link SelectionCommand}
 * @extends SlState
 */
class SlStartSelectionState extends SlState {
    /**
     * Create an instance of SlStartSelectionState
     * @param {SelectionCommand} command
     */
    constructor(command) {
        super(command);
    }

    /**
     * Handler of the Mouse Button Release event
     * @param event
     */
    onMouseReleased(event){
        this.command.reset();
    }
    /**
     * Handler of the Mouse Dragged event (Mouse moved while a button is pressed)
     * When this happens, change state to ResizeSelection, setting the ResizeStrategy to BottomRight (default)
     * @param event
     */
    onMouseDragged(event){
        this.command.state = this.command.stateFactory.getResizeSelectionState(this.command, new BottomRightResizeStrategy());
        this.command.state.onMouseDragged(event);
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