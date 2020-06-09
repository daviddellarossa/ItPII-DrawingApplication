/**
 * SlMovePastedSelectionState for the [Selection Command]{@link SelectionCommand}
 * @extends SlState
 */
class SlMovePastedSelectionState extends SlState {
    /**
     * Create a new instance of SlMovePastedSelectionState
     * @param {SelectionCommand} command
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

        for(let selection of this.command.pastedSelections){
            this.command.context.chain.image(this.command.selectedData, selection.x, selection.y);
        }

        this.command.context.chain.push();

        // Draw the selection Bounding Box
        this.command.context.chain.stroke("green");

        this.command.context.chain.rect(
            this.command.selectionBBox.x,
            this.command.selectionBBox.y,
            this.command.selectionBBox.width,
            this.command.selectionBBox.height
        );
        this.command.context.chain.pop();

        //draw the handles on the Bounding Box
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
     * Move the pasted selection.
     * When the mouse is released, the move operation is terminated and the state returns to Paste.
     * @param event
     */
    onMouseDragged(event) {
        this.command.context.chain.cursor("move");
        let deltaX = event.offsetX - this.previousClickPosition.x;
        let deltaY = event.offsetY - this.previousClickPosition.y;

        this.command.selectionBBox.x += deltaX;
        this.command.selectionBBox.y += deltaY;

        this.command.pastedSelections[this.command.pastedSelections.length - 1].x = this.command.selectionBBox.x;
        this.command.pastedSelections[this.command.pastedSelections.length - 1].y = this.command.selectionBBox.y;

        this.previousClickPosition.x = event.offsetX;
        this.previousClickPosition.y = event.offsetY;
    }

    onMouseReleased(event) {
        this.command.context.chain.cursor("default");
        this.command.state = this.command.stateFactory.getPasteState(this.command);
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