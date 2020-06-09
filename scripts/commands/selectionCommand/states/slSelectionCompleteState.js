/**
 * SelectionCompleteState for the [Selection Command]{@link SelectionCommand}
 * @extends SlState
 */
class SlSelectionCompleteState extends SlState {

    /**
     * Create a new instance of SlSelectionCompleteState
     * @param {SelectionCommand} command
     */
    constructor(command) {
        super(command);
    }
    /**
     * Draw on canvas
     */
    draw(){
        this.command.context.chain.updatePixels();
        this.command.context.chain.push();
        this.command.context.chain.stroke("red");

        // Draw the selection Bounding Box
        this.command.context.chain.rect(
            this.command.selectionBBox.x,
            this.command.selectionBBox.y,
            this.command.selectionBBox.width,
            this.command.selectionBBox.height
        );
        this.command.context.chain.pop();

        // Draw the handles on the selection Bounding Box
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
     * Handler of the Mouse Button Pressed event
     * A mouse click outside of the selection box is considered as the will of discard the current selection and
     * start a brand new one. This changes state back to StartSelection.
     * @param event
     */
    onMousePressed(event){

        let isInHandles = false;
        for(let handle of this.command.handles){
            isInHandles |= handle.contains({ x: event.offsetX, y: event.offsetY});
        }

        let isInBBox = this.command.selectionBBox.contains({x: event.offsetX, y: event.offsetY});

        if(!isInHandles && !isInBBox){
            this.command.selectionBBox.reset(
                event.offsetX,
                event.offsetY,
                0,
                0
            ) ;
            this.command.state = this.command.stateFactory.getStartSelectionState(this.command);

        }
    }

    /**
     * Handler of the Mouse Dragged event (Mouse moved while a button is pressed)
     * If the Drag event starts on one of the handles, the selection is resized. The proper resize logic is injected
     * in the ResizeSelection state, depending on which handle is being used.
     * If the Drag event starts within the selection box, a move operation starts.
     * @param event
     */
    onMouseDragged(event){
        let point = {x: event.offsetX, y: event.offsetY};
        let newState;

        let handleFound;
        for(let handle of this.command.handles){
            if(handle.contains(point))
            {
                handleFound = handle;
                break;
            }
        }

        if(handleFound)
            newState = this.command.stateFactory.getResizeSelectionState(this.command, handleFound.resizeStrategy);
        else if(this.command.selectionBBox.contains(point)) {
            newState = this.command.stateFactory.getMoveSelectionState(this.command);
            newState.previousClickPosition = point;
        }

        this.command.state = newState;
    }

    /**
     * Handler of the Key Pressed event
     * Escape resets the command
     * CTRL+C copies the selection
     * CTRL+X cuts the selection
     * CTRL+V change state to Paste, which will paste the selection in the current position
     * @param event
     */
    onKeyPressed(event){
        switch(event.keyCode){
            case 27: /** ESCAPE pressed */
                this.command.reset();
                break;
            case 67:    /** Key C pressed - perform Copy */
                if(event.isCtrlDown){
                    this.command.context.chain.updatePixels();
                    this.command.selectedData = this.command.context.chain.get(
                        this.command.selectionBBox.x,
                        this.command.selectionBBox.y,
                        this.command.selectionBBox.width,
                        this.command.selectionBBox.height
                    );
                }
            break;
            case 86:    /** Key V pressed - perform Paste */
                if(event.isCtrlDown){
                    if(!this.command.selectedData) return;  //If nothing is selected, don't move
                    this.command.state = this.command.stateFactory.getPasteState(this.command);
                    this.command.state.onKeyPressed(event);
                }
                break;
            case 88:    /** Key X pressed - perform Cut */
                if(event.isCtrlDown){
                    if(event.isCtrlDown){
                        this.command.context.chain.updatePixels();

                        this.command.selectedData = this.command.context.chain.get(
                            this.command.selectionBBox.x,
                            this.command.selectionBBox.y,
                            this.command.selectionBBox.width,
                            this.command.selectionBBox.height
                        );

                        /** Replace the selection with a rectangle, filled with background colour */
                        this.command.context.chain.push();
                        this.command.context.chain.fill(255);
                        this.command.context.chain.noStroke();

                        this.command.context.chain.rect(
                            this.command.selectionBBox.x,
                            this.command.selectionBBox.y,
                            this.command.selectionBBox.width,
                            this.command.selectionBBox.height
                        );
                        this.command.context.chain.pop();
                    }
                }
            break;
        }
    }

    /**
     * Change the mouse cursor depending on where on the selection it is hovering
     * @param event
     */
    onMouseMoved(event) {
        let point = {x: event.offsetX, y: event.offsetY};
        let handleFound;
        for(let handle of this.command.handles){
            if(handle.contains(point))
            {
                handleFound = handle;
                break;
            }
        }
        //change mouse cursor
        if(handleFound)
            this.command.context.chain.cursor(handleFound.cursor);
        else if(this.command.selectionBBox.contains(point)) {
            this.command.context.chain.cursor("move");
        }else{
            this.command.context.chain.cursor("default");
        }

    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return  "Click and drag on the selection to reposition.<br />" +
                "Click and drag on the handles to resize the selection.<br />" +
                "Press CTRL + C to copy and CTRL + V to paste the selection. <br />" +
                "Press Escape to cancel.<br />" +
                "Press Enter to finalize.";
    }
}

