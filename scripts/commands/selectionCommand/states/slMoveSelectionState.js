/**
 * MoveSelectionState for the [Selection Command]{@link SelectionCommand}
 * @extends SlState
 */
class SlMoveSelectionState extends SlState {
    /**
     * Create an instance of SlMoveSelectionState
     * @param command
     */
    constructor(command) {
        super(command);
        /**
         * Previous mouse position
         * @type {{x: number, y: number}}
         */
        this.previousClickPosition =  {x: 0, y: 0};
    }

    /**
     * Draw on canvas
     */
    draw(){
        this.command.context.chain.updatePixels();
        this.command.context.chain.push();

        //Draw the Bounding Box
        this.command.context.chain.stroke("red");
        this.command.context.chain.rect(
            this.command.selectionBBox.x,
            this.command.selectionBBox.y,
            this.command.selectionBBox.width,
            this.command.selectionBBox.height
        );
        this.command.context.chain.pop();

        //Draw the handles on the Bounding Box
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
     * Move the selection box
     * @param event
     */
    onMouseDragged(event) {
        let deltaX = event.offsetX - this.previousClickPosition.x;
        let deltaY = event.offsetY - this.previousClickPosition.y;

        this.command.selectionBBox.x += deltaX;
        this.command.selectionBBox.y += deltaY;

        this.previousClickPosition.x = event.offsetX;
        this.previousClickPosition.y = event.offsetY;
    }

    /**
     * When the mouse is released, the move operation is terminated and the state returns to SelectionComplete
     * @param event
     */
    onMouseReleased(event) {
        this.command.state = this.command.stateFactory.getSelectionCompleteState(this.command);
    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return "Drag the mouse around to reposition.<br />" +
            "Release the mouse when the selection is done.";
    }
}