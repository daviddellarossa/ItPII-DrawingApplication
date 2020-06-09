/**
 * ResizeSelectionState for the [Selection Command]{@link SelectionCommand}
 * @extends SlState
 */
class SlResizeSelectionState extends SlState {
    /**
     * Create an instance of SlResizeSelectionState
     * @param {SelectionCommand} command
     * @param {ResizeStrategy} resizeStrategy
     */
    constructor(command, resizeStrategy) {
        super(command);
        if(resizeStrategy === null)
            resizeStrategy = new BottomRightResizeStrategy();
        /**
         * Contains the Strategy delegated to execute the resize logic. This depends on where the user started the
         * drag operation in the previous state.
         * @type {ResizeStrategy}
         */
        this.resizeStrategy = resizeStrategy;
    }

    /**
     * Draw on canvas
     */
    draw(){
        this.command.context.chain.updatePixels();
        this.command.context.chain.push();

        // Draw the selection Bounding Box
        this.command.context.chain.stroke("red");
        this.command.context.chain.rect(
            this.command.selectionBBox.x,
            this.command.selectionBBox.y,
            this.command.selectionBBox.width,
            this.command.selectionBBox.height
        );
        this.command.context.chain.pop();

        this.command.context.chain.push();

        // Draw the handles on the Bounding Box
        this.command.context.chain.push();
        this.command.context.chain.stroke("black");
        this.command.context.chain.strokeWeight(1);
        this.command.context.chain.fill(255, 255, 255, 200);

        for(let handle of this.command.handles){
            handle.draw();
        }

        this.command.context.chain.pop();
    }
    /**
     * Handler of the Mouse Dragged event (Mouse moved while a button is pressed)
     * While this event is raised, the resizing is ongoing and the actual resize operation is delegated to the
     * resizeStrategy object.
     * @param event
     * @todo - Draw the BBox on canvas
     */
    onMouseDragged(event){
        this.resizeStrategy.resize(this.command.selectionBBox, event);
    }

    /**
     * Handler of the Mouse Button Release event
     * The Resize is terminated and the state is changed back to SelectionComplete.
     * @param event
     */
    onMouseReleased(event){
        this.command.state = this.command.stateFactory.getSelectionCompleteState(this.command);
    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return "Drag the mouse over the canvas to resize the selection.<br />" +
            "Release the mouse when the selection is done.";
    }
}