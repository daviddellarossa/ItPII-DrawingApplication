/**
 * PasteState for the [Selection Command]{@link SelectionCommand}
 * @extends SlState
 */
class SlPasteState extends SlState {
    /**
     * Create a new instance of SlPasteState
     * @param command
     */
    constructor(command){
        super(command);
    }

    /**
     * Draw on canvas
     */
    draw(){
        this.command.context.chain.updatePixels();
        this.command.context.chain.push();
        this.command.context.chain.stroke("green");

        // Draw the selection Bounding Box
        this.command.context.chain.rect(
            this.command.selectionBBox.x,
            this.command.selectionBBox.y,
            this.command.selectionBBox.width,
            this.command.selectionBBox.height
        );

        //draw all the pasted selections
        this.command.context.chain.pop();
        for(let selection of this.command.pastedSelections){
            this.command.context.chain.image(this.command.selectedData, selection.x, selection.y);
        }

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
     * If a click is performed outside of the selection box, it is considered as the will to discard the current
     * selection and to create a brand new one. Thus the state changes to StartSelection.
     * @param event
     */
    onMousePressed(event){
        if(!this.command.selectionBBox.contains( {x: event.offsetX, y: event.offsetY})){
            this.command.reset();
            this.command.state.onMousePressed(event);
        }
    }

    /**
     * @param event
     */
    onMouseMoved(event) {
        let point = {x: event.offsetX, y: event.offsetY};

        if(this.command.selectionBBox.contains(point)){
            this.command.context.chain.cursor("move");
        }
        else{
            this.command.context.chain.cursor("default");
        }
    }

    /**
     * Handler of the Mouse Dragged event (Mouse moved while a button is pressed)
     * @param event
     */
    onMouseDragged(event){
        let point = {x: event.offsetX, y: event.offsetY};
        if(this.command.selectionBBox.contains(point)){
            let newState = this.command.stateFactory.getMovePastedSelectionState(this.command);
            newState.previousClickPosition = point;
            this.command.state = newState;
        }
    }

    /**
     * Handler of the Key Pressed event
     * @param event
     */
    onKeyPressed(event){
        switch(event.keyCode){
            case 13: /** ENTER */
            this.command.state = this.command.stateFactory.getFinalizeState(this.command);
                this.command.state.onEpsilon();
                break;
            case 27: /** ESCAPE pressed */
            this.command.reset();
                break;
            case 86:    /** Key V pressed - perform Paste */
                if(event.isCtrlDown){
                    this.command.pastedSelections.push({x: this.command.selectionBBox.x, y: this.command.selectionBBox.y});
                }
                break;
        }
    }

    /**
     * Return instructions on how to use the tool
     * @return {string}
     */
    get tip(){
        return  "Click and drag on the selection to reposition.<br />" +
            "Press CTRL + V to paste another copy of the selection. <br />" +
            "Press Escape to cancel.<br />" +
            "Press Enter to finalize.";
    }
}
